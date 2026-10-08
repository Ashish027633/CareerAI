package com.careerai.service;

import com.careerai.common.util.SecurityUtils;
import com.careerai.domain.entity.Resume;
import com.careerai.domain.entity.ResumeAnalysis;
import com.careerai.domain.entity.StudentProfile;
import com.careerai.domain.entity.User;
import com.careerai.domain.repository.ResumeAnalysisRepository;
import com.careerai.domain.repository.ResumeRepository;
import com.careerai.domain.repository.StudentProfileRepository;
import com.careerai.domain.repository.UserRepository;
import com.careerai.dto.ResumeAnalysisDto;
import com.careerai.dto.ResumeDto;
import com.careerai.exception.ResourceNotFoundException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final ResumeAnalysisRepository resumeAnalysisRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final UserRepository userRepository;
    private final AiServiceClient aiServiceClient;
    private final ObjectMapper objectMapper;

    @Transactional
    public ResumeDto uploadResume(MultipartFile file) {
        if (file.isEmpty() || !file.getContentType().equals("application/pdf")) {
            throw new IllegalArgumentException("Only non-empty PDF files are supported");
        }

        User user = getCurrentUser();
        StudentProfile student = studentProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));

        try {
            Resume resume = new Resume();
            resume.setStudent(student);
            resume.setFileName(file.getOriginalFilename());
            resume.setFileSizeBytes(file.getSize());
            resume.setContentType(file.getContentType());
            resume.setFileData(file.getBytes());
            resume.setIsActive(true);

            // Inactive all previous resumes
            List<Resume> previous = resumeRepository.findByStudentId(student.getId());
            previous.forEach(r -> r.setIsActive(false));
            resumeRepository.saveAll(previous);

            resumeRepository.save(resume);
            return mapToDto(resume);
        } catch (IOException e) {
            throw new RuntimeException("Failed to store resume data", e);
        }
    }

    public ResumeDto getMyResume() {
        User user = getCurrentUser();
        StudentProfile student = studentProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));

        return resumeRepository.findByStudentId(student.getId()).stream()
                .filter(Resume::getIsActive)
                .findFirst()
                .map(this::mapToDto)
                .orElseThrow(() -> new ResourceNotFoundException("No active resume found"));
    }

    @Transactional
    public ResumeAnalysisDto analyzeResume() {
        User user = getCurrentUser();
        StudentProfile student = studentProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));

        Resume activeResume = resumeRepository.findByStudentId(student.getId()).stream()
                .filter(Resume::getIsActive)
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("No active resume found. Please upload a resume first."));

        // Call Python AI Service
        Map<String, Object> aiResponse = aiServiceClient.analyzeResume(activeResume.getFileData(), activeResume.getFileName());

        try {
            String jsonPayload = objectMapper.writeValueAsString(aiResponse);

            ResumeAnalysis analysis = resumeAnalysisRepository.findByResumeId(activeResume.getId())
                    .orElseGet(() -> {
                        ResumeAnalysis newAnalysis = new ResumeAnalysis();
                        newAnalysis.setResume(activeResume);
                        return newAnalysis;
                    });

            Integer overallScore = ((Number) aiResponse.getOrDefault("overallScore", 0)).intValue();
            Map<String, Integer> categoryScores = (Map<String, Integer>) aiResponse.get("categoryScores");

            analysis.setOverallScore(overallScore);
            if (categoryScores != null) {
                analysis.setSkillsScore(categoryScores.getOrDefault("skills", 0));
                analysis.setProjectsScore(categoryScores.getOrDefault("projects", 0));
                analysis.setEducationScore(categoryScores.getOrDefault("education", 0));
                analysis.setExperienceScore(categoryScores.getOrDefault("experience", 0));
                analysis.setCertificationsScore(categoryScores.getOrDefault("certifications", 0));
                analysis.setStructureScore(categoryScores.getOrDefault("structure", 0));
                analysis.setCompletenessScore(categoryScores.getOrDefault("completeness", 0));
            }
            analysis.setCompletenessPercentage(((Number) aiResponse.getOrDefault("completenessPercentage", 0)).intValue());
            analysis.setPageCount(((Number) aiResponse.getOrDefault("pageCount", 1)).intValue());
            analysis.setRawAnalysisJson(jsonPayload);

            ResumeAnalysis saved = resumeAnalysisRepository.save(analysis);
            return mapToAnalysisDto(saved);

        } catch (JsonProcessingException e) {
            log.error("Failed to serialize AI analysis payload", e);
            throw new IllegalStateException("Failed to process resume analysis result.");
        }
    }

    @Transactional(readOnly = true)
    public ResumeAnalysisDto getLatestAnalysis() {
        User user = getCurrentUser();
        StudentProfile student = studentProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));

        Resume activeResume = resumeRepository.findByStudentId(student.getId()).stream()
                .filter(Resume::getIsActive)
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("No active resume found"));

        ResumeAnalysis analysis = resumeAnalysisRepository.findByResumeId(activeResume.getId())
                .orElseThrow(() -> new ResourceNotFoundException("No analysis available for the current resume."));

        return mapToAnalysisDto(analysis);
    }

    private User getCurrentUser() {
        String email = SecurityUtils.getCurrentUserEmail();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private ResumeDto mapToDto(Resume resume) {
        ResumeDto dto = new ResumeDto();
        dto.setId(resume.getId());
        dto.setFileName(resume.getFileName());
        dto.setFileSizeBytes(resume.getFileSizeBytes());
        dto.setContentType(resume.getContentType());
        dto.setIsActive(resume.getIsActive());
        dto.setUploadedAt(resume.getUploadedAt());
        return dto;
    }

    private ResumeAnalysisDto mapToAnalysisDto(ResumeAnalysis entity) {
        try {
            ResumeAnalysisDto dto = objectMapper.readValue(entity.getRawAnalysisJson(), ResumeAnalysisDto.class);
            dto.setId(entity.getId());
            dto.setResumeId(entity.getResume().getId());
            dto.setAnalyzedAt(entity.getAnalyzedAt());
            return dto;
        } catch (JsonProcessingException e) {
            log.error("Failed to deserialize saved ResumeAnalysis JSON for id: {}", entity.getId(), e);
            throw new IllegalStateException("Corrupted resume analysis data in database.");
        }
    }
}

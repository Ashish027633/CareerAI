package com.careerai.service;

import com.careerai.common.util.SecurityUtils;
import com.careerai.domain.entity.Resume;
import com.careerai.domain.entity.StudentProfile;
import com.careerai.domain.entity.User;
import com.careerai.domain.repository.ResumeRepository;
import com.careerai.domain.repository.StudentProfileRepository;
import com.careerai.domain.repository.UserRepository;
import com.careerai.dto.ResumeDto;
import com.careerai.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final UserRepository userRepository;

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
}

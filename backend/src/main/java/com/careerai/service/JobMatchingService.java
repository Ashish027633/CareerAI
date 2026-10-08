package com.careerai.service;

import com.careerai.common.util.SecurityUtils;
import com.careerai.domain.entity.*;
import com.careerai.domain.repository.*;
import com.careerai.dto.JobMatchDto;
import com.careerai.dto.ResumeAnalysisDto;
import com.careerai.exception.ResourceNotFoundException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class JobMatchingService {

    private final JobRepository jobRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final UserRepository userRepository;
    private final ResumeRepository resumeRepository;
    private final ResumeAnalysisRepository resumeAnalysisRepository;
    private final AiServiceClient aiServiceClient;
    private final JobService jobService;
    private final ObjectMapper objectMapper;

    @Transactional(readOnly = true)
    public JobMatchDto getJobMatch(Long jobId) {
        User user = getCurrentUser();
        StudentProfile student = studentProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        if (!Boolean.TRUE.equals(job.getIsActive())) {
            throw new IllegalStateException("Matching is unavailable for this job as it is inactive.");
        }

        Resume activeResume = resumeRepository.findByStudentId(student.getId()).stream()
                .filter(Resume::getIsActive)
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("Analyze your resume first to get personalized job matches."));

        ResumeAnalysis analysis = resumeAnalysisRepository.findByResumeId(activeResume.getId())
                .orElseThrow(() -> new IllegalStateException("Analyze your resume first to get personalized job matches."));

        ResumeAnalysisDto analysisDto;
        try {
            analysisDto = objectMapper.readValue(analysis.getRawAnalysisJson(), ResumeAnalysisDto.class);
        } catch (JsonProcessingException e) {
            throw new IllegalStateException("Corrupted resume analysis data. Please analyze again.");
        }

        return calculateMatch(student, analysisDto, job);
    }

    @Transactional(readOnly = true)
    public List<JobMatchDto> getRecommendedJobs() {
        User user = getCurrentUser();
        StudentProfile student = studentProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));

        Resume activeResume = resumeRepository.findByStudentId(student.getId()).stream()
                .filter(Resume::getIsActive)
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("Analyze your resume first to get personalized job matches."));

        ResumeAnalysis analysis = resumeAnalysisRepository.findByResumeId(activeResume.getId())
                .orElseThrow(() -> new IllegalStateException("Analyze your resume first to get personalized job matches."));

        ResumeAnalysisDto analysisDto;
        try {
            analysisDto = objectMapper.readValue(analysis.getRawAnalysisJson(), ResumeAnalysisDto.class);
        } catch (JsonProcessingException e) {
            throw new IllegalStateException("Corrupted resume analysis data. Please analyze again.");
        }

        List<Job> activeJobs = jobRepository.findByIsActiveTrue();
        List<JobMatchDto> recommendations = new ArrayList<>();

        for (Job job : activeJobs) {
            JobMatchDto match = calculateMatch(student, analysisDto, job);
            if (Boolean.TRUE.equals(match.getEligible())) {
                recommendations.add(match);
            }
        }

        recommendations.sort((a, b) -> b.getMatchPercentage().compareTo(a.getMatchPercentage()));
        
        // Return top 10 matches
        return recommendations.stream().limit(10).collect(Collectors.toList());
    }

    @SuppressWarnings("unchecked")
    private JobMatchDto calculateMatch(StudentProfile student, ResumeAnalysisDto analysisDto, Job job) {
        // 1. Calculate Eligibility
        boolean isEligible = true;
        List<String> missingRequirements = new ArrayList<>();
        List<String> eligibilityReasons = new ArrayList<>();

        if (job.getMinCgpa() != null && job.getMinCgpa().compareTo(BigDecimal.ZERO) > 0) {
            if (student.getCgpa() == null) {
                isEligible = false;
                missingRequirements.add("CGPA not provided");
                eligibilityReasons.add("CGPA is required but missing from profile.");
            } else if (student.getCgpa().compareTo(job.getMinCgpa()) < 0) {
                isEligible = false;
                missingRequirements.add("Minimum CGPA of " + job.getMinCgpa());
                eligibilityReasons.add("Your CGPA (" + student.getCgpa() + ") is below the minimum requirement.");
            } else {
                eligibilityReasons.add("CGPA requirement met.");
            }
        }

        if (isEligible) {
            eligibilityReasons.add("You meet the basic eligibility criteria for this role.");
        }

        int eligibilityContribution = isEligible ? 10 : 0;

        // 2. Extract Resume Text safely
        // In Phase 3B, resume text was not fully persisted in the DB to save space, but we have the extracted skills and sections.
        // Wait, the python service calculates TF-IDF from resumeText. We need to reconstruct it from analysisDto or pass the raw skills.
        // Let's pass a reconstructed summary of the resume to represent the text, since the full PDF bytes shouldn't be sent to match endpoint (too slow for recommendations loop).
        StringBuilder resumeTextBuilder = new StringBuilder();
        if (analysisDto.getSkills() != null) {
            resumeTextBuilder.append(String.join(" ", analysisDto.getSkills())).append(" ");
        }
        if (analysisDto.getExperience() != null) {
            for (ResumeAnalysisDto.ExperienceDto exp : analysisDto.getExperience()) {
                resumeTextBuilder.append(exp.getRole()).append(" ").append(exp.getDescription()).append(" ");
            }
        }
        if (analysisDto.getProjects() != null) {
            for (ResumeAnalysisDto.ProjectDto proj : analysisDto.getProjects()) {
                resumeTextBuilder.append(proj.getName()).append(" ").append(proj.getDescription()).append(" ");
            }
        }

        // 3. Prepare AI Payload
        Map<String, Object> payload = new HashMap<>();
        payload.put("resumeText", resumeTextBuilder.toString());
        payload.put("resumeSkills", analysisDto.getSkills() != null ? analysisDto.getSkills() : List.of());
        payload.put("jobTitle", job.getTitle() != null ? job.getTitle() : "");
        payload.put("jobDescription", job.getDescription() != null ? job.getDescription() : "");
        payload.put("requiredSkills", job.getRequiredSkills() != null ? job.getRequiredSkills() : List.of());
        payload.put("optionalSkills", job.getOptionalSkills() != null ? job.getOptionalSkills() : List.of());

        // 4. Call Python AI Service
        Map<String, Object> aiResult = aiServiceClient.matchJob(payload);

        int aiRelevanceScore = ((Number) aiResult.getOrDefault("aiRelevanceScore", 0)).intValue();
        int finalMatchPercentage = aiRelevanceScore + eligibilityContribution;

        // 5. Construct JobMatchDto
        JobMatchDto matchDto = new JobMatchDto();
        matchDto.setJob(jobService.mapToDto(job));
        matchDto.setMatchPercentage(Math.min(finalMatchPercentage, 100));
        matchDto.setAiRelevanceScore(aiRelevanceScore);
        matchDto.setEligible(isEligible);
        matchDto.setEligibilityContribution(eligibilityContribution);
        matchDto.setRequiredSkillScore(((Number) aiResult.getOrDefault("requiredSkillScore", 0)).intValue());
        matchDto.setOptionalSkillScore(((Number) aiResult.getOrDefault("optionalSkillScore", 0)).intValue());
        matchDto.setSemanticSimilarityScore(((Number) aiResult.getOrDefault("semanticSimilarityScore", 0)).intValue());
        
        matchDto.setMatchedSkills((List<String>) aiResult.getOrDefault("matchedSkills", List.of()));
        matchDto.setMissingSkills((List<String>) aiResult.getOrDefault("missingSkills", List.of()));
        matchDto.setMatchedOptionalSkills((List<String>) aiResult.getOrDefault("matchedOptionalSkills", List.of()));
        matchDto.setMatchingReasons((List<String>) aiResult.getOrDefault("matchingReasons", List.of()));
        
        matchDto.setEligibilityReasons(eligibilityReasons);
        matchDto.setMissingRequirements(missingRequirements);

        return matchDto;
    }

    private User getCurrentUser() {
        String email = SecurityUtils.getCurrentUserEmail();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}

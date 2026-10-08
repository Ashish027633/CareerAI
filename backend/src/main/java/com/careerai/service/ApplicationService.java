package com.careerai.service;

import com.careerai.common.util.SecurityUtils;
import com.careerai.domain.entity.*;
import com.careerai.domain.enums.ApplicationStatus;
import com.careerai.domain.repository.*;
import com.careerai.dto.ApplicationDto;
import com.careerai.dto.EligibilityResponseDto;
import com.careerai.exception.ResourceNotFoundException;
import com.careerai.exception.UnauthorizedAccessException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final JobApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final CompanyProfileRepository companyProfileRepository;
    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    @Transactional
    public ApplicationDto applyForJob(Long jobId) {
        User user = getCurrentUser();
        StudentProfile student = studentProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        if (!job.getIsActive()) {
            throw new IllegalArgumentException("Cannot apply to an inactive job");
        }

        if (applicationRepository.existsByStudentIdAndJobId(student.getId(), job.getId())) {
            throw new IllegalArgumentException("You have already applied for this job");
        }

        Resume activeResume = resumeRepository.findByStudentId(student.getId())
                .stream().filter(Resume::getIsActive).findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Please upload a resume before applying"));

        JobApplication application = new JobApplication();
        application.setJob(job);
        application.setStudent(student);
        application.setResume(activeResume);
        application.setStatus(ApplicationStatus.APPLIED);
        application.setMatchPercentage(calculateMockMatch(student, job)); // Mock logic for Phase 2B

        applicationRepository.save(application);

        // Notify company
        notificationService.createNotification(
                job.getCompany().getUser(),
                "New Application Received",
                student.getFullName() + " applied for " + job.getTitle(),
                "APPLICATION"
        );

        return mapToDto(application);
    }

    public List<ApplicationDto> getMyApplications() {
        User user = getCurrentUser();
        StudentProfile student = studentProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));

        return applicationRepository.findByStudentId(student.getId())
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<ApplicationDto> getJobApplicants(Long jobId) {
        Job job = getJobAndVerifyOwnership(jobId);
        return applicationRepository.findByJobId(job.getId())
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public ApplicationDto updateApplicationStatus(Long applicationId, String statusStr) {
        ApplicationStatus newStatus = ApplicationStatus.valueOf(statusStr);
        JobApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));

        // Verify ownership of the job
        User user = getCurrentUser();
        CompanyProfile company = companyProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Company profile not found"));

        if (!application.getJob().getCompany().getId().equals(company.getId())) {
            throw new UnauthorizedAccessException("You don't have permission to update this application");
        }

        application.setStatus(newStatus);
        applicationRepository.save(application);

        // Notify student
        notificationService.createNotification(
                application.getStudent().getUser(),
                "Application Status Updated",
                "Your application for " + application.getJob().getTitle() + " has been marked as " + newStatus.name(),
                "STATUS_UPDATE"
        );

        return mapToDto(application);
    }

    public EligibilityResponseDto checkEligibility(Long jobId) {
        User user = getCurrentUser();
        StudentProfile student = studentProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        EligibilityResponseDto response = new EligibilityResponseDto();
        List<String> missing = new ArrayList<>();

        if (job.getMinCgpa() != null && student.getCgpa() != null) {
            if (student.getCgpa().compareTo(job.getMinCgpa()) < 0) {
                missing.add("CGPA is below the required " + job.getMinCgpa());
            }
        }
        
        response.setEligible(missing.isEmpty());
        response.setMissingRequirements(missing);
        return response;
    }

    private Job getJobAndVerifyOwnership(Long jobId) {
        User user = getCurrentUser();
        CompanyProfile company = companyProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Company profile not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        if (!job.getCompany().getId().equals(company.getId())) {
            throw new UnauthorizedAccessException("You don't have permission to modify this job");
        }
        return job;
    }

    private User getCurrentUser() {
        String email = SecurityUtils.getCurrentUserEmail();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private Integer calculateMockMatch(StudentProfile student, Job job) {
        // Simple deterministic calculation for Phase 2B
        if (student.getSkills() == null || job.getRequiredSkills() == null) return 50;
        long matches = student.getSkills().stream()
                .filter(s -> job.getRequiredSkills().contains(s))
                .count();
        if (job.getRequiredSkills().isEmpty()) return 100;
        return (int) ((matches * 100) / job.getRequiredSkills().size());
    }

    private ApplicationDto mapToDto(JobApplication application) {
        ApplicationDto dto = new ApplicationDto();
        dto.setId(application.getId());
        dto.setStudentId(application.getStudent().getId());
        dto.setStudentName(application.getStudent().getFullName());
        dto.setJobId(application.getJob().getId());
        dto.setJobTitle(application.getJob().getTitle());
        dto.setCompanyName(application.getJob().getCompany().getCompanyName());
        dto.setStatus(application.getStatus().name());
        dto.setAppliedAt(application.getAppliedAt());
        dto.setUpdatedAt(application.getUpdatedAt());
        return dto;
    }
}

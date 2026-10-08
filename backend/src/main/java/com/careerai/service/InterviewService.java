package com.careerai.service;

import com.careerai.common.util.SecurityUtils;
import com.careerai.domain.entity.*;
import com.careerai.domain.enums.InterviewType;
import com.careerai.domain.repository.*;
import com.careerai.dto.InterviewDto;
import com.careerai.exception.ResourceNotFoundException;
import com.careerai.exception.UnauthorizedAccessException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InterviewService {

    private final InterviewRepository interviewRepository;
    private final JobApplicationRepository applicationRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final CompanyProfileRepository companyProfileRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    @Transactional
    public InterviewDto scheduleInterview(InterviewDto dto) {
        User user = getCurrentUser();
        CompanyProfile company = companyProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Company profile not found"));

        JobApplication application = applicationRepository.findById(dto.getApplicationId())
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));

        if (!application.getJob().getCompany().getId().equals(company.getId())) {
            throw new UnauthorizedAccessException("You don't have permission to schedule for this application");
        }

        Interview interview = new Interview();
        interview.setApplication(application);
        interview.setScheduledTime(dto.getInterviewDate().atTime(dto.getInterviewTime()));
        interview.setInterviewType(InterviewType.valueOf(dto.getInterviewType()));
        interview.setMeetingLink(dto.getMeetingLink());
        interview.setNotes(dto.getNotes());
        interview.setStatus("Scheduled");

        interviewRepository.save(interview);

        // Notify Student
        notificationService.createNotification(
                application.getStudent().getUser(),
                "Interview Scheduled",
                "An interview has been scheduled for " + application.getJob().getTitle() + " on " + dto.getInterviewDate(),
                "INTERVIEW_ALERT"
        );

        return mapToDto(interview);
    }

    public List<InterviewDto> getMyStudentInterviews() {
        User user = getCurrentUser();
        StudentProfile student = studentProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));

        return interviewRepository.findByApplication_Student_Id(student.getId())
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<InterviewDto> getMyCompanyInterviews() {
        User user = getCurrentUser();
        CompanyProfile company = companyProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Company profile not found"));

        return interviewRepository.findByApplication_Job_Company_Id(company.getId())
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public InterviewDto updateInterview(Long id, InterviewDto dto) {
        User user = getCurrentUser();
        CompanyProfile company = companyProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Company profile not found"));

        Interview interview = interviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Interview not found"));

        if (!interview.getApplication().getJob().getCompany().getId().equals(company.getId())) {
            throw new UnauthorizedAccessException("You don't have permission to update this interview");
        }

        if ("CANCELLED".equals(interview.getStatus())) {
            throw new IllegalArgumentException("Cannot update a cancelled interview");
        }

        if (dto.getInterviewDate() != null && dto.getInterviewTime() != null) {
            interview.setScheduledTime(dto.getInterviewDate().atTime(dto.getInterviewTime()));
        }
        if (dto.getInterviewType() != null) {
            interview.setInterviewType(InterviewType.valueOf(dto.getInterviewType()));
        }
        if (dto.getMeetingLink() != null) {
            interview.setMeetingLink(dto.getMeetingLink());
        }
        if (dto.getNotes() != null) {
            interview.setNotes(dto.getNotes());
        }
        if (dto.getStatus() != null) {
            interview.setStatus(dto.getStatus());
        }

        interviewRepository.save(interview);
        return mapToDto(interview);
    }

    @Transactional
    public void deleteInterview(Long id) {
        User user = getCurrentUser();
        CompanyProfile company = companyProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Company profile not found"));

        Interview interview = interviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Interview not found"));

        if (!interview.getApplication().getJob().getCompany().getId().equals(company.getId())) {
            throw new UnauthorizedAccessException("You don't have permission to cancel this interview");
        }

        if (!"CANCELLED".equals(interview.getStatus())) {
            interview.setStatus("CANCELLED");
            interviewRepository.save(interview);

            // Notify Student
            notificationService.createNotification(
                    interview.getApplication().getStudent().getUser(),
                    "Interview Cancelled",
                    "Your interview for " + interview.getApplication().getJob().getTitle() + " has been cancelled.",
                    "INTERVIEW_ALERT"
            );
        }
    }

    private User getCurrentUser() {
        String email = SecurityUtils.getCurrentUserEmail();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private InterviewDto mapToDto(Interview interview) {
        InterviewDto dto = new InterviewDto();
        dto.setId(interview.getId());
        dto.setApplicationId(interview.getApplication().getId());
        dto.setStudentName(interview.getApplication().getStudent().getFullName());
        dto.setCompanyName(interview.getApplication().getJob().getCompany().getCompanyName());
        dto.setJobTitle(interview.getApplication().getJob().getTitle());
        dto.setInterviewDate(interview.getScheduledTime().toLocalDate());
        dto.setInterviewTime(interview.getScheduledTime().toLocalTime());
        dto.setInterviewType(interview.getInterviewType().name());
        dto.setMeetingLink(interview.getMeetingLink());
        dto.setStatus(interview.getStatus());
        dto.setNotes(interview.getNotes());
        return dto;
    }
}

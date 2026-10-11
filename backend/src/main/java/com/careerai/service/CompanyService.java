package com.careerai.service;

import com.careerai.common.util.SecurityUtils;
import com.careerai.domain.entity.CompanyProfile;
import com.careerai.domain.entity.Job;
import com.careerai.domain.entity.JobApplication;
import com.careerai.domain.entity.Interview;
import com.careerai.domain.entity.User;
import com.careerai.domain.enums.ApplicationStatus;
import com.careerai.domain.repository.CompanyProfileRepository;
import com.careerai.domain.repository.InterviewRepository;
import com.careerai.domain.repository.JobApplicationRepository;
import com.careerai.domain.repository.JobRepository;
import com.careerai.domain.repository.UserRepository;
import com.careerai.dto.CompanyDashboardStatsDto;
import com.careerai.dto.CompanyProfileDto;
import com.careerai.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyProfileRepository companyProfileRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final InterviewRepository interviewRepository;

    public CompanyDashboardStatsDto getDashboardStats() {
        String email = SecurityUtils.getCurrentUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        CompanyProfile company = companyProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Company profile not found"));

        Long companyId = company.getId();

        List<Job> jobs = jobRepository.findByCompanyId(companyId);
        long activeJobs = jobs.stream().filter(Job::getIsActive).count();

        List<JobApplication> applications = jobApplicationRepository.findByJob_Company_Id(companyId);
        long totalApplicants = applications.size();
        long shortlisted = applications.stream()
                .filter(a -> a.getStatus() == ApplicationStatus.SHORTLISTED)
                .count();
        long selected = applications.stream()
                .filter(a -> a.getStatus() == ApplicationStatus.SELECTED)
                .count();

        List<Interview> interviews = interviewRepository.findByApplication_Job_Company_Id(companyId);
        long totalInterviews = interviews.size();

        return CompanyDashboardStatsDto.builder()
                .activeJobs(activeJobs)
                .totalApplicants(totalApplicants)
                .shortlisted(shortlisted)
                .interviews(totalInterviews)
                .selected(selected)
                .build();
    }

    public CompanyProfileDto getMyProfile() {
        String email = SecurityUtils.getCurrentUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        CompanyProfile profile = companyProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Company profile not found"));

        return mapToDto(profile);
    }

    @Transactional
    public CompanyProfileDto updateMyProfile(CompanyProfileDto dto) {
        String email = SecurityUtils.getCurrentUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        CompanyProfile profile = companyProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Company profile not found"));

        profile.setCompanyName(dto.getCompanyName());
        profile.setIndustry(dto.getIndustry());
        profile.setWebsite(dto.getWebsite());
        profile.setLocation(dto.getLocation());
        profile.setDescription(dto.getDescription());

        companyProfileRepository.save(profile);
        return mapToDto(profile);
    }

    public CompanyProfileDto mapToDto(CompanyProfile profile) {
        CompanyProfileDto dto = new CompanyProfileDto();
        dto.setId(profile.getId());
        dto.setCompanyName(profile.getCompanyName());
        dto.setIndustry(profile.getIndustry());
        dto.setWebsite(profile.getWebsite());
        dto.setLocation(profile.getLocation());
        dto.setDescription(profile.getDescription());
        dto.setIsVerified(profile.getIsVerified());
        return dto;
    }
}

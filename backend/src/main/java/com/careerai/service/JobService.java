package com.careerai.service;

import com.careerai.common.util.SecurityUtils;
import com.careerai.domain.entity.CompanyProfile;
import com.careerai.domain.entity.Job;
import com.careerai.domain.entity.User;
import com.careerai.domain.repository.CompanyProfileRepository;
import com.careerai.domain.repository.JobRepository;
import com.careerai.domain.repository.UserRepository;
import com.careerai.dto.JobDto;
import com.careerai.exception.ResourceNotFoundException;
import com.careerai.exception.UnauthorizedAccessException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final CompanyProfileRepository companyProfileRepository;
    private final UserRepository userRepository;

    public List<JobDto> getAllActiveJobs() {
        return jobRepository.findByIsActiveTrue()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<JobDto> getMyCompanyJobs() {
        User user = getCurrentUser();
        CompanyProfile company = companyProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Company profile not found"));

        return jobRepository.findByCompanyId(company.getId())
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public JobDto getJobById(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));
        return mapToDto(job);
    }

    @Transactional
    public JobDto createJob(JobDto dto) {
        User user = getCurrentUser();
        CompanyProfile company = companyProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Company profile not found"));

        Job job = new Job();
        job.setCompany(company);
        updateJobFields(job, dto);
        job.setIsActive(true);

        jobRepository.save(job);
        return mapToDto(job);
    }

    @Transactional
    public JobDto updateJob(Long id, JobDto dto) {
        Job job = getJobAndVerifyOwnership(id);
        updateJobFields(job, dto);
        if (dto.getIsActive() != null) {
            job.setIsActive(dto.getIsActive());
        }
        jobRepository.save(job);
        return mapToDto(job);
    }

    @Transactional
    public void deleteJob(Long id) {
        Job job = getJobAndVerifyOwnership(id);
        jobRepository.delete(job);
    }

    private void updateJobFields(Job job, JobDto dto) {
        job.setTitle(dto.getTitle());
        job.setDescription(dto.getDescription());
        job.setLocation(dto.getLocation());
        job.setSalaryRange(dto.getSalaryRange());
        if (dto.getJobType() != null) {
            job.setJobType(com.careerai.domain.enums.JobType.valueOf(dto.getJobType()));
        }
        job.setExperienceLevel(dto.getExperienceLevel());
        if (dto.getMinCgpa() != null) {
            job.setMinCgpa(java.math.BigDecimal.valueOf(dto.getMinCgpa()));
        }
        job.setRequiredSkills(dto.getRequiredSkills() != null ? dto.getRequiredSkills() : List.of());
        job.setOptionalSkills(dto.getOptionalSkills() != null ? dto.getOptionalSkills() : List.of());
        job.setResponsibilities(dto.getResponsibilities() != null ? dto.getResponsibilities() : List.of());
        job.setBenefits(dto.getBenefits() != null ? dto.getBenefits() : List.of());
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

    public JobDto mapToDto(Job job) {
        JobDto dto = new JobDto();
        dto.setId(job.getId());
        dto.setTitle(job.getTitle());
        dto.setDescription(job.getDescription());
        dto.setLocation(job.getLocation());
        dto.setSalaryRange(job.getSalaryRange());
        dto.setExperienceLevel(job.getExperienceLevel());
        dto.setJobType(job.getJobType().name());
        dto.setMinCgpa(job.getMinCgpa() != null ? job.getMinCgpa().doubleValue() : 0.0);
        dto.setRequiredSkills(job.getRequiredSkills());
        dto.setOptionalSkills(job.getOptionalSkills());
        dto.setResponsibilities(job.getResponsibilities());
        dto.setBenefits(job.getBenefits());
        dto.setIsActive(job.getIsActive());
        dto.setCreatedAt(job.getCreatedAt());
        dto.setCompanyId(job.getCompany().getId());
        dto.setCompanyName(job.getCompany().getCompanyName());
        return dto;
    }
}

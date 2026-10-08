package com.careerai.service;

import com.careerai.domain.repository.CompanyProfileRepository;
import com.careerai.domain.repository.JobApplicationRepository;
import com.careerai.domain.repository.JobRepository;
import com.careerai.domain.repository.StudentProfileRepository;
import com.careerai.dto.AdminCompanyDto;
import com.careerai.dto.AdminMetricsDto;
import com.careerai.dto.AdminStudentDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final StudentProfileRepository studentProfileRepository;
    private final CompanyProfileRepository companyProfileRepository;
    private final JobRepository jobRepository;
    private final JobApplicationRepository applicationRepository;

    public AdminMetricsDto getSystemMetrics() {
        AdminMetricsDto metrics = new AdminMetricsDto();
        metrics.setTotalStudents(studentProfileRepository.count());
        metrics.setTotalCompanies(companyProfileRepository.count());
        metrics.setTotalJobs(jobRepository.count());
        metrics.setTotalApplications(applicationRepository.count());
        
        // Calculate selected candidates (mock representation from entire DB)
        long selected = applicationRepository.findAll().stream()
                .filter(a -> a.getStatus().name().equals("SELECTED"))
                .count();
        metrics.setSelectedCandidates(selected);

        return metrics;
    }

    public List<AdminStudentDto> getAllStudents() {
        return studentProfileRepository.findAll().stream().map(student -> {
            AdminStudentDto dto = new AdminStudentDto();
            dto.setId(student.getId());
            dto.setFullName(student.getFullName());
            dto.setEmail(student.getUser().getEmail());
            dto.setCollege(student.getCollege());
            dto.setBranch(student.getBranch());
            dto.setGraduationYear(student.getGraduationYear());
            dto.setCgpa(student.getCgpa());
            dto.setProfileCompletionPercentage(student.getProfileCompletionPercentage());
            dto.setStatus("Active"); // Defaulting status for now as we don't have it on StudentProfile
            dto.setCreatedAt(null); // Assuming no createdAt on entity currently, leaving null or we can map from user if it existed
            return dto;
        }).collect(Collectors.toList());
    }

    public List<AdminCompanyDto> getAllCompanies() {
        return companyProfileRepository.findAll().stream().map(company -> {
            AdminCompanyDto dto = new AdminCompanyDto();
            dto.setId(company.getId());
            dto.setCompanyName(company.getCompanyName());
            dto.setEmail(company.getUser().getEmail());
            dto.setIndustry(company.getIndustry());
            dto.setWebsite(company.getWebsite());
            dto.setLocation(company.getLocation());
            dto.setIsVerified(company.getIsVerified());
            dto.setCreatedAt(null);
            return dto;
        }).collect(Collectors.toList());
    }
}

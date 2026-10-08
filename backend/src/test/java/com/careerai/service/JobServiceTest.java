package com.careerai.service;

import com.careerai.domain.entity.CompanyProfile;
import com.careerai.domain.entity.Job;
import com.careerai.domain.entity.User;
import com.careerai.domain.enums.JobType;
import com.careerai.domain.repository.CompanyProfileRepository;
import com.careerai.domain.repository.JobRepository;
import com.careerai.domain.repository.UserRepository;
import com.careerai.dto.JobDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class JobServiceTest {

    @Mock
    private JobRepository jobRepository;

    @Mock
    private CompanyProfileRepository companyProfileRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private SecurityContext securityContext;

    @Mock
    private Authentication authentication;

    @Mock
    private UserDetails userDetails;

    @InjectMocks
    private JobService jobService;

    private User mockUser;
    private CompanyProfile mockCompany;
    private Job mockJob;

    @BeforeEach
    void setUp() {
        mockUser = new User();
        mockUser.setId(1L);
        mockUser.setEmail("company@test.com");

        mockCompany = new CompanyProfile();
        mockCompany.setId(1L);
        mockCompany.setCompanyName("Test Company");
        mockCompany.setUser(mockUser);

        mockJob = new Job();
        mockJob.setId(1L);
        mockJob.setTitle("Software Engineer");
        mockJob.setCompany(mockCompany);
        mockJob.setJobType(JobType.FULL_TIME);
        mockJob.setIsActive(true);
    }

    private void mockSecurityContext() {
        SecurityContextHolder.setContext(securityContext);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.isAuthenticated()).thenReturn(true);
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(userDetails.getUsername()).thenReturn("company@test.com");
    }

    @Test
    void getAllActiveJobs_ShouldReturnListOfJobs() {
        when(jobRepository.findByIsActiveTrue()).thenReturn(List.of(mockJob));

        List<JobDto> jobs = jobService.getAllActiveJobs();

        assertNotNull(jobs);
        assertEquals(1, jobs.size());
        assertEquals("Software Engineer", jobs.get(0).getTitle());
    }

    @Test
    void createJob_ShouldReturnCreatedJob() {
        mockSecurityContext();
        when(userRepository.findByEmail("company@test.com")).thenReturn(Optional.of(mockUser));
        when(companyProfileRepository.findByUserId(1L)).thenReturn(Optional.of(mockCompany));
        when(jobRepository.save(any(Job.class))).thenReturn(mockJob);

        JobDto inputDto = new JobDto();
        inputDto.setTitle("New Job");
        inputDto.setJobType("FULL_TIME");

        JobDto createdJob = jobService.createJob(inputDto);

        assertNotNull(createdJob);
        verify(jobRepository, times(1)).save(any(Job.class));
    }
}

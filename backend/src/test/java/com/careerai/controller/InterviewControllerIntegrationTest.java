package com.careerai.controller;

import com.careerai.domain.entity.*;
import com.careerai.domain.enums.Role;
import com.careerai.domain.enums.InterviewType;
import com.careerai.domain.repository.*;
import com.careerai.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class InterviewControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CompanyProfileRepository companyProfileRepository;

    @Autowired
    private StudentProfileRepository studentProfileRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private InterviewRepository interviewRepository;

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    private String companyAToken;
    private String companyBToken;
    private String studentToken;
    private Long interviewId;

    @BeforeEach
    void setUp() {
        interviewRepository.deleteAll();
        jobApplicationRepository.deleteAll();
        jobRepository.deleteAll();
        companyProfileRepository.deleteAll();
        studentProfileRepository.deleteAll();
        userRepository.deleteAll();

        // Company A
        User userA = new User();
        userA.setEmail("compA@test.com");
        userA.setPasswordHash(passwordEncoder.encode("password"));
        userA.setRole(Role.ROLE_COMPANY);
        userA = userRepository.save(userA);

        CompanyProfile compA = new CompanyProfile();
        compA.setUser(userA);
        compA.setCompanyName("Company A");
        compA = companyProfileRepository.save(compA);

        com.careerai.security.UserDetailsImpl userDetailsA = new com.careerai.security.UserDetailsImpl(userA);
        companyAToken = jwtService.generateToken(userDetailsA);

        // Company B
        User userB = new User();
        userB.setEmail("compB@test.com");
        userB.setPasswordHash(passwordEncoder.encode("password"));
        userB.setRole(Role.ROLE_COMPANY);
        userB = userRepository.save(userB);

        CompanyProfile compB = new CompanyProfile();
        compB.setUser(userB);
        compB.setCompanyName("Company B");
        compB = companyProfileRepository.save(compB);

        com.careerai.security.UserDetailsImpl userDetailsB = new com.careerai.security.UserDetailsImpl(userB);
        companyBToken = jwtService.generateToken(userDetailsB);

        // Student
        User studentUser = new User();
        studentUser.setEmail("stud@test.com");
        studentUser.setPasswordHash(passwordEncoder.encode("password"));
        studentUser.setRole(Role.ROLE_STUDENT);
        studentUser = userRepository.save(studentUser);

        StudentProfile student = new StudentProfile();
        student.setUser(studentUser);
        student.setFullName("Student Name");
        student = studentProfileRepository.save(student);

        com.careerai.security.UserDetailsImpl studentDetails = new com.careerai.security.UserDetailsImpl(studentUser);
        studentToken = jwtService.generateToken(studentDetails);

        // Job by Company A
        Job job = new Job();
        job.setCompany(compA);
        job.setTitle("Dev");
        job.setDescription("Job Description");
        job.setLocation("Remote");
        job.setSalaryRange("10 LPA");
        job.setExperienceLevel("Entry");
        job.setJobType(com.careerai.domain.enums.JobType.FULL_TIME);
        job = jobRepository.save(job);

        // Resume by Student
        Resume resume = new Resume();
        resume.setStudent(student);
        resume.setFileName("resume.pdf");
        resume.setContentType("application/pdf");
        resume.setFileSizeBytes(100L);
        resume.setFileData(new byte[]{1, 2, 3});
        resume = resumeRepository.save(resume);

        // Application by Student for Company A's Job
        JobApplication application = new JobApplication();
        application.setJob(job);
        application.setStudent(student);
        application.setResume(resume);
        application.setMatchPercentage(85);
        application.setStatus(com.careerai.domain.enums.ApplicationStatus.APPLIED);
        application = jobApplicationRepository.save(application);

        // Interview by Company A for Application
        Interview interview = new Interview();
        interview.setApplication(application);
        interview.setScheduledTime(LocalDateTime.now().plusDays(1));
        interview.setInterviewType(InterviewType.TECHNICAL_ROUND_1);
        interview.setStatus("Scheduled");
        interview = interviewRepository.save(interview);

        interviewId = interview.getId();
    }

    @Test
    void updateInterview_ByOwnerCompany_ShouldReturnSuccess() throws Exception {
        String dtoJson = """
                {
                    "notes": "Updated Notes",
                    "status": "RESCHEDULED"
                }
                """;
        mockMvc.perform(put("/api/interviews/" + interviewId)
                .header("Authorization", "Bearer " + companyAToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(dtoJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.notes").value("Updated Notes"))
                .andExpect(jsonPath("$.data.status").value("RESCHEDULED"));
    }

    @Test
    void updateInterview_ByNonOwnerCompany_ShouldReturnForbiddenOrUnauthorized() throws Exception {
        String dtoJson = "{\"notes\": \"Hacked Notes\"}";
        mockMvc.perform(put("/api/interviews/" + interviewId)
                .header("Authorization", "Bearer " + companyBToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(dtoJson))
                .andExpect(status().isForbidden());
    }

    @Test
    void cancelInterview_ByOwnerCompany_ShouldSoftDelete() throws Exception {
        mockMvc.perform(delete("/api/interviews/" + interviewId)
                .header("Authorization", "Bearer " + companyAToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void cancelInterview_ByNonOwnerCompany_ShouldReturnForbidden() throws Exception {
        mockMvc.perform(delete("/api/interviews/" + interviewId)
                .header("Authorization", "Bearer " + companyBToken))
                .andExpect(status().isForbidden());
    }
}

package com.careerai.controller;

import com.careerai.security.JwtService;
import com.careerai.domain.entity.CompanyProfile;
import com.careerai.domain.entity.User;
import com.careerai.domain.enums.Role;
import com.careerai.domain.repository.CompanyProfileRepository;
import com.careerai.domain.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class JobControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CompanyProfileRepository companyProfileRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    private String companyToken;

    @Autowired
    private com.careerai.domain.repository.JobApplicationRepository jobApplicationRepository;

    @Autowired
    private com.careerai.domain.repository.JobRepository jobRepository;

    @BeforeEach
    void setUp() {
        jobApplicationRepository.deleteAll();
        jobRepository.deleteAll();
        companyProfileRepository.deleteAll();
        userRepository.deleteAll();

        if (userRepository.findByEmail("testcompany@test.com").isEmpty()) {
            User user = new User();
            user.setEmail("testcompany@test.com");
            user.setPasswordHash(passwordEncoder.encode("password"));
            user.setRole(Role.ROLE_COMPANY);
            user = userRepository.save(user);

            CompanyProfile company = new CompanyProfile();
            company.setUser(user);
            company.setCompanyName("Test Company Ltd");
            companyProfileRepository.save(company);
        }

        User user = userRepository.findByEmail("testcompany@test.com").get();
        com.careerai.security.UserDetailsImpl userDetails = new com.careerai.security.UserDetailsImpl(user);
        companyToken = jwtService.generateToken(userDetails);
    }

    @Test
    void createJob_WithValidToken_ShouldReturnSuccess() throws Exception {
        String jobJson = """
                {
                    "title": "Backend Engineer",
                    "description": "Develop APIs",
                    "location": "Remote",
                    "salaryRange": "15-20 LPA",
                    "jobType": "FULL_TIME",
                    "experienceLevel": "Entry Level"
                }
                """;

        mockMvc.perform(post("/api/company/jobs")
                .header("Authorization", "Bearer " + companyToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(jobJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.title").value("Backend Engineer"));
    }

    @Test
    void createJob_WithoutToken_ShouldReturnUnauthorized() throws Exception {
        mockMvc.perform(post("/api/company/jobs")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{}"))
                .andExpect(status().isUnauthorized());
    }
}

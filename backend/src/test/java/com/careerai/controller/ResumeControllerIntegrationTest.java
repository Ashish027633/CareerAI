package com.careerai.controller;

import com.careerai.domain.entity.StudentProfile;
import com.careerai.domain.entity.User;
import com.careerai.domain.enums.Role;
import com.careerai.domain.repository.StudentProfileRepository;
import com.careerai.domain.repository.UserRepository;
import com.careerai.service.AiServiceClient;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
public class ResumeControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentProfileRepository studentProfileRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @MockBean
    private AiServiceClient aiServiceClient;

    private User studentUser;

    @BeforeEach
    void setUp() {
        if (!userRepository.existsByEmail("student_resume_test@careerai.com")) {
            studentUser = new User();
            studentUser.setEmail("student_resume_test@careerai.com");
            studentUser.setPasswordHash(passwordEncoder.encode("Password123!"));
            studentUser.setRole(Role.ROLE_STUDENT);
            studentUser.setIsActive(true);
            userRepository.save(studentUser);

            StudentProfile profile = new StudentProfile();
            profile.setUser(studentUser);
            profile.setFullName("Test Student");
            studentProfileRepository.save(profile);
        } else {
            studentUser = userRepository.findByEmail("student_resume_test@careerai.com").orElseThrow();
        }
    }

    @Test
    @WithMockUser(username = "student_resume_test@careerai.com", roles = {"STUDENT"})
    void testUploadAnalyzeAndGetLatestAnalysis() throws Exception {
        // 1. Upload Resume
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "test_resume.pdf",
                "application/pdf",
                "%PDF-1.4 Mock resume content for testing".getBytes()
        );

        mockMvc.perform(multipart("/api/resumes/upload").file(file))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.fileName").value("test_resume.pdf"));

        // Mock AI Service Response using HashMap to avoid Map.of() limit
        Map<String, Object> aiMockData = new HashMap<>();
        aiMockData.put("overallScore", 82);
        aiMockData.put("categoryScores", Map.of("skills", 22, "projects", 18, "education", 15, "experience", 12, "certifications", 5, "structure", 7, "completeness", 3));
        aiMockData.put("scoreReasons", Map.of("skills", "Strong skills detected"));
        aiMockData.put("skills", List.of("Java", "Spring Boot", "MySQL"));
        aiMockData.put("skillCategories", Map.of("Backend", List.of("Spring Boot")));
        aiMockData.put("skillCount", 3);
        aiMockData.put("education", List.of(Map.of("degree", "B.Tech", "institution", "ABC College")));
        aiMockData.put("projects", List.of(Map.of("name", "CareerAI", "technologies", List.of("Spring Boot"))));
        aiMockData.put("experience", List.of());
        aiMockData.put("experienceLevel", "FRESHER");
        aiMockData.put("certifications", List.of());
        aiMockData.put("sections", List.of("SKILLS", "EDUCATION", "PROJECTS"));
        aiMockData.put("missingSections", List.of("EXPERIENCE"));
        aiMockData.put("completenessPercentage", 75);
        aiMockData.put("recommendations", List.of("Add 1-2 projects"));
        aiMockData.put("pageCount", 1);

        given(aiServiceClient.analyzeResume(any(), anyString())).willReturn(aiMockData);

        // 2. Trigger Analyze
        mockMvc.perform(post("/api/resumes/analyze"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.overallScore").value(82))
                .andExpect(jsonPath("$.data.skills[0]").value("Java"));

        // 3. Fetch Latest Analysis from H2
        mockMvc.perform(get("/api/resumes/analysis"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.overallScore").value(82));
    }

    @Test
    @WithMockUser(username = "student_resume_test@careerai.com", roles = {"STUDENT"})
    void testAnalyzeWithoutResumeReturnsError() throws Exception {
        mockMvc.perform(post("/api/resumes/analyze"))
                .andExpect(status().is4xxClientError());
    }
}

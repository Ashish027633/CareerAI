package com.careerai.controller;

import com.careerai.domain.entity.User;
import com.careerai.domain.enums.Role;
import com.careerai.domain.repository.UserRepository;
import com.careerai.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AdminControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    private String adminToken;
    private String studentToken;

    @BeforeEach
    void setUp() {
        if (userRepository.findByEmail("admin@test.com").isEmpty()) {
            User admin = new User();
            admin.setEmail("admin@test.com");
            admin.setPasswordHash(passwordEncoder.encode("password"));
            admin.setRole(Role.ROLE_ADMIN);
            userRepository.save(admin);
        }

        if (userRepository.findByEmail("student@test.com").isEmpty()) {
            User student = new User();
            student.setEmail("student@test.com");
            student.setPasswordHash(passwordEncoder.encode("password"));
            student.setRole(Role.ROLE_STUDENT);
            userRepository.save(student);
        }

        User admin = userRepository.findByEmail("admin@test.com").get();
        com.careerai.security.UserDetailsImpl adminDetails = new com.careerai.security.UserDetailsImpl(admin);
        adminToken = jwtService.generateToken(adminDetails);

        User student = userRepository.findByEmail("student@test.com").get();
        com.careerai.security.UserDetailsImpl studentDetails = new com.careerai.security.UserDetailsImpl(student);
        studentToken = jwtService.generateToken(studentDetails);
    }

    @Test
    void getStudents_WithAdminToken_ShouldReturnSuccess() throws Exception {
        mockMvc.perform(get("/api/admin/students")
                .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void getStudents_WithStudentToken_ShouldReturnForbidden() throws Exception {
        mockMvc.perform(get("/api/admin/students")
                .header("Authorization", "Bearer " + studentToken))
                .andExpect(status().isForbidden());
    }

    @Test
    void getCompanies_WithAdminToken_ShouldReturnSuccess() throws Exception {
        mockMvc.perform(get("/api/admin/companies")
                .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }
}

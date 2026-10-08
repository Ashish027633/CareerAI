package com.careerai.controller;

import com.careerai.common.dto.ApiResponse;
import com.careerai.service.AiServiceClient;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class AiHealthControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AiServiceClient aiServiceClient;

    @Test
    public void testAiHealthUnauthenticated() throws Exception {
        mockMvc.perform(get("/api/system/ai-health"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(roles = "STUDENT")
    public void testAiHealthStudentAccess() throws Exception {
        mockMvc.perform(get("/api/system/ai-health"))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(roles = "COMPANY")
    public void testAiHealthCompanyAccess() throws Exception {
        mockMvc.perform(get("/api/system/ai-health"))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void testAiHealthAdminAccessServiceUp() throws Exception {
        when(aiServiceClient.checkHealth()).thenReturn(true);

        mockMvc.perform(get("/api/system/ai-health"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("AI service is available"))
                .andExpect(jsonPath("$.data.status").value("UP"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void testAiHealthAdminAccessServiceUnavailable() throws Exception {
        when(aiServiceClient.checkHealth()).thenReturn(false);

        mockMvc.perform(get("/api/system/ai-health"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("AI service UNAVAILABLE"))
                .andExpect(jsonPath("$.data.status").value("UNAVAILABLE"));
    }
}

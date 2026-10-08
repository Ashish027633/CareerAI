package com.careerai.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import static org.junit.jupiter.api.Assertions.assertFalse;

@SpringBootTest
@ActiveProfiles("test")
@TestPropertySource(properties = {"app.ai-service.url=http://localhost:65534"})
public class AiServiceClientTest {

    @Autowired
    private AiServiceClient aiServiceClient;

    @Test
    public void testCheckHealthServiceDown() {
        // Assuming no AI service is running on the configured port during this test
        boolean isUp = aiServiceClient.checkHealth();
        assertFalse(isUp, "Service should be reported as down/unavailable");
    }
}

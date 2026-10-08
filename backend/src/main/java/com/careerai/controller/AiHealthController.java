package com.careerai.controller;

import com.careerai.common.dto.ApiResponse;
import com.careerai.service.AiServiceClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/system")
@RequiredArgsConstructor
public class AiHealthController {

    private final AiServiceClient aiServiceClient;

    @GetMapping("/ai-health")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Map<String, String>>> checkAiHealth() {
        boolean isUp = aiServiceClient.checkHealth();
        if (isUp) {
            return ResponseEntity.ok(ApiResponse.success("AI service is available", Map.of("status", "UP")));
        } else {
            return ResponseEntity.ok(ApiResponse.success("AI service UNAVAILABLE", Map.of("status", "UNAVAILABLE")));
        }
    }
}

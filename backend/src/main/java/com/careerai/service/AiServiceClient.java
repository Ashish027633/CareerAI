package com.careerai.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.ClientHttpRequestFactories;
import org.springframework.boot.web.client.ClientHttpRequestFactorySettings;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import java.time.Duration;
import java.util.Map;

@Slf4j
@Service
public class AiServiceClient {

    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    public AiServiceClient(@Value("${app.ai-service.url:http://127.0.0.1:8000}") String aiServiceUrl, @Value("${app.ai-service.api-key}") String apiKey,
                            ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
        // Set connection (3s) and read (30s) timeouts as per Phase 3B specifications
        ClientHttpRequestFactorySettings settings = ClientHttpRequestFactorySettings.DEFAULTS
                .withConnectTimeout(Duration.ofSeconds(3))
                .withReadTimeout(Duration.ofSeconds(30));

        ClientHttpRequestFactory requestFactory = ClientHttpRequestFactories.get(settings);

        this.restClient = RestClient.builder()
                .baseUrl(aiServiceUrl)
                .defaultHeader("x-api-key", apiKey)
                .requestFactory(requestFactory)
                .build();
    }

    /**
     * Diagnostic check to ensure AI Service is reachable.
     */
    public boolean checkHealth() {
        log.info("AI service health check started");
        try {
            Map<String, Object> response = restClient.get()
                    .uri("/health")
                    .retrieve()
                    .body(Map.class);

            if (response != null && "UP".equals(response.get("status"))) {
                log.info("AI service available");
                return true;
            }
            log.warn("AI service returned unexpected status: {}", response);
        } catch (RestClientException e) {
            log.warn("AI service unavailable: {}", e.getMessage());
        }
        return false;
    }

    /**
     * Calls Python AI service to perform real resume extraction and scoring.
     */
    @SuppressWarnings("unchecked")
    public Map<String, Object> analyzeResume(byte[] pdfBytes, String fileName) {
        if (pdfBytes == null || pdfBytes.length == 0) {
            throw new IllegalArgumentException("Cannot analyze empty PDF file.");
        }

        log.info("Sending resume ({}, {} bytes) to AI service for analysis", fileName, pdfBytes.length);

        ByteArrayResource fileResource = new ByteArrayResource(pdfBytes) {
            @Override
            public String getFilename() {
                return (fileName != null && !fileName.isBlank()) ? fileName : "resume.pdf";
            }
        };

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", fileResource);

        try {
            Map<String, Object> response = restClient.post()
                    .uri("/api/v1/analyze-resume")
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .body(body)
                    .retrieve()
                    .body(Map.class);

            if (response == null || !Boolean.TRUE.equals(response.get("success"))) {
                String errMsg = response != null && response.containsKey("message") ?
                        (String) response.get("message") : "Invalid response from AI analysis service.";
                log.error("AI service returned failure: {}", errMsg);
                throw new IllegalStateException(errMsg);
            }

            Map<String, Object> data = (Map<String, Object>) response.get("data");
            if (data == null) {
                throw new IllegalStateException("AI service returned empty analysis payload.");
            }

            // Score Validation
            Object scoreObj = data.get("overallScore");
            if (scoreObj instanceof Number scoreNum) {
                int score = scoreNum.intValue();
                if (score < 0 || score > 100) {
                    throw new IllegalStateException("AI service returned invalid score: " + score);
                }
            } else {
                throw new IllegalStateException("AI service response missing valid overallScore.");
            }

            log.info("Successfully received AI analysis result (overall score: {})", data.get("overallScore"));
            return data;

        } catch (RestClientException e) {
            log.error("Failed to connect or timeout communicating with AI service: {}", e.getMessage());
            if (e.getMessage() != null && e.getMessage().contains("Read timed out")) {
                throw new IllegalStateException("Resume analysis service timed out. Please try again.");
            }
            throw new IllegalStateException("Resume analysis service is currently unavailable. Please ensure the AI service is running.");
        }
    }
    public Map<String, Object> matchJob(Map<String, Object> payload) {
        log.info("Sending job match request to AI service for job: {}", payload.get("jobTitle"));

        try {
            Map<String, Object> response = restClient.post()
                    .uri("/api/v1/match-job")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(payload)
                    .retrieve()
                    .body(Map.class);

            if (response == null || !Boolean.TRUE.equals(response.get("success"))) {
                String errMsg = response != null && response.containsKey("message") ?
                        (String) response.get("message") : "Invalid response from AI matching service.";
                log.error("AI service returned failure: {}", errMsg);
                throw new IllegalStateException(errMsg);
            }

            Map<String, Object> data = (Map<String, Object>) response.get("data");
            if (data == null) {
                throw new IllegalStateException("AI service returned empty match payload.");
            }

            // Score Validation
            Object scoreObj = data.get("aiRelevanceScore");
            if (scoreObj instanceof Number scoreNum) {
                int score = scoreNum.intValue();
                if (score < 0 || score > 90) {
                    throw new IllegalStateException("AI service returned invalid AI relevance score: " + score);
                }
            } else {
                throw new IllegalStateException("AI service response missing valid aiRelevanceScore.");
            }

            log.info("Successfully received AI job match result (AI relevance score: {})", data.get("aiRelevanceScore"));
            return data;

        } catch (RestClientException e) {
            log.error("Failed to connect or timeout communicating with AI service: {}", e.getMessage());
            if (e.getMessage() != null && e.getMessage().contains("Read timed out")) {
                throw new IllegalStateException("Job matching service timed out. Please try again.");
            }
            throw new IllegalStateException("Job matching service is currently unavailable. Please ensure the AI service is running.");
        }
    }
}

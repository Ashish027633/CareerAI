package com.careerai.controller;

import com.careerai.common.dto.ApiResponse;
import com.careerai.dto.ApplicationDto;
import com.careerai.dto.ApplicationStatusRequestDto;
import com.careerai.dto.EligibilityResponseDto;
import com.careerai.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping("/jobs/{jobId}/apply")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<ApplicationDto>> applyForJob(@PathVariable Long jobId) {
        return ResponseEntity.ok(ApiResponse.success("Successfully applied for job", applicationService.applyForJob(jobId)));
    }

    @GetMapping("/jobs/{jobId}/eligibility")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<EligibilityResponseDto>> checkEligibility(@PathVariable Long jobId) {
        return ResponseEntity.ok(ApiResponse.success("Eligibility checked", applicationService.checkEligibility(jobId)));
    }

    @GetMapping("/applications/my")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<List<ApplicationDto>>> getMyApplications() {
        return ResponseEntity.ok(ApiResponse.success("Applications retrieved successfully", applicationService.getMyApplications()));
    }

    @GetMapping("/company/jobs/{jobId}/applicants")
    @PreAuthorize("hasRole('COMPANY')")
    public ResponseEntity<ApiResponse<List<ApplicationDto>>> getJobApplicants(@PathVariable Long jobId) {
        return ResponseEntity.ok(ApiResponse.success("Applicants retrieved successfully", applicationService.getJobApplicants(jobId)));
    }

    @PatchMapping("/company/applications/{id}/status")
    @PreAuthorize("hasRole('COMPANY')")
    public ResponseEntity<ApiResponse<ApplicationDto>> updateApplicationStatus(
            @PathVariable Long id,
            @RequestBody ApplicationStatusRequestDto dto) {
        return ResponseEntity.ok(ApiResponse.success("Application status updated", applicationService.updateApplicationStatus(id, dto.getStatus())));
    }
}

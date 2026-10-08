package com.careerai.controller;

import com.careerai.common.dto.ApiResponse;
import com.careerai.dto.JobDto;
import com.careerai.service.JobService;
import com.careerai.service.JobMatchingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;
    private final JobMatchingService jobMatchingService;

    @GetMapping("/jobs")
    public ResponseEntity<ApiResponse<List<JobDto>>> getAllActiveJobs() {
        return ResponseEntity.ok(ApiResponse.success("Jobs retrieved successfully", jobService.getAllActiveJobs()));
    }

    @GetMapping("/jobs/{id}")
    public ResponseEntity<ApiResponse<JobDto>> getJobById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Job retrieved successfully", jobService.getJobById(id)));
    }

    @GetMapping("/jobs/{id}/match")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<com.careerai.dto.JobMatchDto>> getJobMatch(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Job match computed successfully", jobMatchingService.getJobMatch(id)));
    }

    @GetMapping("/jobs/recommended")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<List<com.careerai.dto.JobMatchDto>>> getRecommendedJobs() {
        return ResponseEntity.ok(ApiResponse.success("Recommended jobs retrieved successfully", jobMatchingService.getRecommendedJobs()));
    }

    @GetMapping("/company/jobs")
    @PreAuthorize("hasRole('COMPANY')")
    public ResponseEntity<ApiResponse<List<JobDto>>> getMyCompanyJobs() {
        return ResponseEntity.ok(ApiResponse.success("Company jobs retrieved successfully", jobService.getMyCompanyJobs()));
    }

    @PostMapping("/company/jobs")
    @PreAuthorize("hasRole('COMPANY')")
    public ResponseEntity<ApiResponse<JobDto>> createJob(@RequestBody JobDto dto) {
        return ResponseEntity.ok(ApiResponse.success("Job created successfully", jobService.createJob(dto)));
    }

    @PutMapping("/company/jobs/{id}")
    @PreAuthorize("hasRole('COMPANY')")
    public ResponseEntity<ApiResponse<JobDto>> updateJob(@PathVariable Long id, @RequestBody JobDto dto) {
        return ResponseEntity.ok(ApiResponse.success("Job updated successfully", jobService.updateJob(id, dto)));
    }

    @DeleteMapping("/company/jobs/{id}")
    @PreAuthorize("hasRole('COMPANY')")
    public ResponseEntity<ApiResponse<Void>> deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return ResponseEntity.ok(ApiResponse.success("Job deleted successfully", null));
    }
}

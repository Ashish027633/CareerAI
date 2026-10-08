package com.careerai.controller;

import com.careerai.common.dto.ApiResponse;
import com.careerai.dto.InterviewDto;
import com.careerai.service.InterviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;

    @PostMapping("/company/interviews")
    @PreAuthorize("hasRole('COMPANY')")
    public ResponseEntity<ApiResponse<InterviewDto>> scheduleInterview(@RequestBody InterviewDto dto) {
        return ResponseEntity.ok(ApiResponse.success("Interview scheduled successfully", interviewService.scheduleInterview(dto)));
    }

    @GetMapping("/interviews/my")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<List<InterviewDto>>> getMyStudentInterviews() {
        return ResponseEntity.ok(ApiResponse.success("Interviews retrieved successfully", interviewService.getMyStudentInterviews()));
    }

    @GetMapping("/company/interviews")
    @PreAuthorize("hasRole('COMPANY')")
    public ResponseEntity<ApiResponse<List<InterviewDto>>> getMyCompanyInterviews() {
        return ResponseEntity.ok(ApiResponse.success("Company interviews retrieved successfully", interviewService.getMyCompanyInterviews()));
    }

    @PutMapping("/interviews/{id}")
    @PreAuthorize("hasRole('COMPANY')")
    public ResponseEntity<ApiResponse<InterviewDto>> updateInterview(@PathVariable Long id, @RequestBody InterviewDto dto) {
        return ResponseEntity.ok(ApiResponse.success("Interview updated successfully", interviewService.updateInterview(id, dto)));
    }

    @DeleteMapping("/interviews/{id}")
    @PreAuthorize("hasRole('COMPANY')")
    public ResponseEntity<ApiResponse<Void>> deleteInterview(@PathVariable Long id) {
        interviewService.deleteInterview(id);
        return ResponseEntity.ok(ApiResponse.success("Interview cancelled successfully", null));
    }
}

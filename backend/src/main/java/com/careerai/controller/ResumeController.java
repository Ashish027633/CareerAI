package com.careerai.controller;

import com.careerai.common.dto.ApiResponse;
import com.careerai.dto.ResumeAnalysisDto;
import com.careerai.dto.ResumeDto;
import com.careerai.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resumes")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;

    @PostMapping("/upload")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<ResumeDto>> uploadResume(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(ApiResponse.success("Resume uploaded successfully", resumeService.uploadResume(file)));
    }

    @GetMapping("/my-resume")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<ResumeDto>> getMyResume() {
        return ResponseEntity.ok(ApiResponse.success("Resume retrieved successfully", resumeService.getMyResume()));
    }

    @PostMapping("/analyze")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<ResumeAnalysisDto>> analyzeResume() {
        return ResponseEntity.ok(ApiResponse.success("Resume analysis completed successfully", resumeService.analyzeResume()));
    }

    @GetMapping("/analysis")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<ResumeAnalysisDto>> getLatestAnalysis() {
        return ResponseEntity.ok(ApiResponse.success("Latest resume analysis retrieved successfully", resumeService.getLatestAnalysis()));
    }
}

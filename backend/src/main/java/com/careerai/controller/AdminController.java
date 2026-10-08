package com.careerai.controller;

import com.careerai.common.dto.ApiResponse;
import com.careerai.dto.AdminCompanyDto;
import com.careerai.dto.AdminMetricsDto;
import com.careerai.dto.AdminStudentDto;
import com.careerai.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/metrics")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<AdminMetricsDto>> getSystemMetrics() {
        return ResponseEntity.ok(ApiResponse.success("System metrics retrieved successfully", adminService.getSystemMetrics()));
    }

    @GetMapping("/students")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<AdminStudentDto>>> getStudents() {
        return ResponseEntity.ok(ApiResponse.success("Students retrieved successfully", adminService.getAllStudents()));
    }

    @GetMapping("/companies")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<AdminCompanyDto>>> getCompanies() {
        return ResponseEntity.ok(ApiResponse.success("Companies retrieved successfully", adminService.getAllCompanies()));
    }
}

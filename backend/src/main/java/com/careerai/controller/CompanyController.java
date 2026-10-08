package com.careerai.controller;

import com.careerai.common.dto.ApiResponse;
import com.careerai.dto.CompanyProfileDto;
import com.careerai.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/company")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @GetMapping("/profile")
    @PreAuthorize("hasRole('COMPANY')")
    public ResponseEntity<ApiResponse<CompanyProfileDto>> getProfile() {
        return ResponseEntity.ok(ApiResponse.success("Company profile retrieved", companyService.getMyProfile()));
    }

    @PutMapping("/profile")
    @PreAuthorize("hasRole('COMPANY')")
    public ResponseEntity<ApiResponse<CompanyProfileDto>> updateProfile(@RequestBody CompanyProfileDto dto) {
        return ResponseEntity.ok(ApiResponse.success("Company profile updated", companyService.updateMyProfile(dto)));
    }
}

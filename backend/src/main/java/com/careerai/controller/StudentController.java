package com.careerai.controller;

import com.careerai.common.dto.ApiResponse;
import com.careerai.dto.StudentProfileDto;
import com.careerai.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @GetMapping("/profile")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<StudentProfileDto>> getProfile() {
        return ResponseEntity.ok(ApiResponse.success("Profile retrieved", studentService.getMyProfile()));
    }

    @PutMapping("/profile")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<StudentProfileDto>> updateProfile(@RequestBody StudentProfileDto dto) {
        return ResponseEntity.ok(ApiResponse.success("Profile updated", studentService.updateMyProfile(dto)));
    }
}

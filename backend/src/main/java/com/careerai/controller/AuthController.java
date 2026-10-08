package com.careerai.controller;

import com.careerai.common.dto.ApiResponse;
import com.careerai.domain.dto.auth.AuthResponse;
import com.careerai.domain.dto.auth.LoginRequest;
import com.careerai.domain.dto.auth.RegisterCompanyRequest;
import com.careerai.domain.dto.auth.RegisterStudentRequest;
import com.careerai.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Login successful", response));
    }

    @PostMapping("/register/student")
    public ResponseEntity<ApiResponse<AuthResponse>> registerStudent(@Valid @RequestBody RegisterStudentRequest request) {
        AuthResponse response = authService.registerStudent(request);
        return ResponseEntity.ok(ApiResponse.success("Student registered successfully", response));
    }

    @PostMapping("/register/company")
    public ResponseEntity<ApiResponse<AuthResponse>> registerCompany(@Valid @RequestBody RegisterCompanyRequest request) {
        AuthResponse response = authService.registerCompany(request);
        return ResponseEntity.ok(ApiResponse.success("Company registered successfully", response));
    }

    @PostMapping("/google")
    public ResponseEntity<ApiResponse<AuthResponse>> googleLogin(@RequestBody Map<String, String> request) {
        String token = request.get("credential");
        if (token == null) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Missing Google credential"));
        }
        // This will currently throw UnsupportedOperationException per the stub
        AuthResponse response = authService.googleLogin(token);
        return ResponseEntity.ok(ApiResponse.success("Google login successful", response));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout() {
        // Since JWT is stateless, client just discards token. 
        // If we implement refresh tokens later, we revoke them here.
        return ResponseEntity.ok(ApiResponse.success("Logged out successfully", null));
    }
}

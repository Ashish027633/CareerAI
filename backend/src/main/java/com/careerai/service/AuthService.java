package com.careerai.service;

import com.careerai.domain.dto.auth.AuthResponse;
import com.careerai.domain.dto.auth.LoginRequest;
import com.careerai.domain.dto.auth.RegisterCompanyRequest;
import com.careerai.domain.dto.auth.RegisterStudentRequest;
import com.careerai.domain.entity.CompanyProfile;
import com.careerai.domain.entity.StudentProfile;
import com.careerai.domain.entity.User;
import com.careerai.domain.enums.Role;
import com.careerai.domain.repository.UserRepository;
import com.careerai.security.JwtService;
import com.careerai.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthResponse registerStudent(RegisterStudentRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already in use");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.ROLE_STUDENT);

        StudentProfile profile = new StudentProfile();
        profile.setUser(user);
        profile.setFullName(request.getFullName());
        
        user.setStudentProfile(profile);
        
        User savedUser = userRepository.save(user);
        
        return generateAuthResponse(savedUser, profile.getFullName());
    }

    @Transactional
    public AuthResponse registerCompany(RegisterCompanyRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already in use");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.ROLE_COMPANY);

        CompanyProfile profile = new CompanyProfile();
        profile.setUser(user);
        profile.setCompanyName(request.getCompanyName());
        
        user.setCompanyProfile(profile);
        
        User savedUser = userRepository.save(user);
        
        return generateAuthResponse(savedUser, profile.getCompanyName());
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        String name = user.getRole() == Role.ROLE_STUDENT && user.getStudentProfile() != null 
                ? user.getStudentProfile().getFullName() 
                : (user.getRole() == Role.ROLE_COMPANY && user.getCompanyProfile() != null 
                    ? user.getCompanyProfile().getCompanyName() 
                    : "Admin User");

        return generateAuthResponse(user, name);
    }
    
    // Stub for Google OAuth abstract contract
    public AuthResponse googleLogin(String googleToken) {
        // In a real implementation:
        // 1. Verify token with GoogleIdTokenVerifier
        // 2. Extract email, name
        // 3. Find or create user
        // 4. Generate system JWT
        throw new UnsupportedOperationException("Google OAuth is not fully implemented yet. Configure credentials first.");
    }

    private AuthResponse generateAuthResponse(User user, String name) {
        String token = jwtService.generateToken(new UserDetailsImpl(user));
        
        AuthResponse.UserDto userDto = AuthResponse.UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(name)
                .role(user.getRole().name())
                .permissions(List.of("READ", "WRITE")) // Mock permissions
                .build();
                
        return AuthResponse.builder()
                .token(token)
                .refreshToken("mock-refresh-token") // To be implemented later
                .user(userDto)
                .build();
    }
}

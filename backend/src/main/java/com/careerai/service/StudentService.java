package com.careerai.service;

import com.careerai.common.util.SecurityUtils;
import com.careerai.domain.entity.StudentProfile;
import com.careerai.domain.entity.User;
import com.careerai.domain.repository.StudentProfileRepository;
import com.careerai.domain.repository.UserRepository;
import com.careerai.dto.StudentProfileDto;
import com.careerai.exception.ResourceNotFoundException;
import com.careerai.exception.UnauthorizedAccessException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentProfileRepository studentProfileRepository;
    private final UserRepository userRepository;

    public StudentProfileDto getMyProfile() {
        String email = SecurityUtils.getCurrentUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        StudentProfile profile = studentProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));

        return mapToDto(profile);
    }

    @Transactional
    public StudentProfileDto updateMyProfile(StudentProfileDto dto) {
        String email = SecurityUtils.getCurrentUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        StudentProfile profile = studentProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));

        profile.setFullName(dto.getFullName());
        profile.setCollege(dto.getCollege());
        profile.setBranch(dto.getBranch());
        profile.setGraduationYear(dto.getGraduationYear());
        if (dto.getCgpa() != null) {
            profile.setCgpa(java.math.BigDecimal.valueOf(dto.getCgpa()));
        }
        profile.setPhone(dto.getPhone());
        profile.setGithubUrl(dto.getGithubUrl());
        profile.setLinkedinUrl(dto.getLinkedinUrl());
        profile.setPortfolioUrl(dto.getPortfolioUrl());
        profile.setBio(dto.getBio());
        profile.setHeadline(dto.getHeadline());
        if (dto.getSkills() != null) {
            profile.setSkills(dto.getSkills());
        }

        // Calculate a simple completion percentage
        int completion = 0;
        if (profile.getFullName() != null && !profile.getFullName().isEmpty()) completion += 10;
        if (profile.getCollege() != null && !profile.getCollege().isEmpty()) completion += 10;
        if (profile.getBranch() != null && !profile.getBranch().isEmpty()) completion += 10;
        if (profile.getGraduationYear() != null) completion += 10;
        if (profile.getCgpa() != null) completion += 10;
        if (profile.getPhone() != null && !profile.getPhone().isEmpty()) completion += 10;
        if (profile.getBio() != null && !profile.getBio().isEmpty()) completion += 10;
        if (profile.getHeadline() != null && !profile.getHeadline().isEmpty()) completion += 10;
        if (profile.getSkills() != null && !profile.getSkills().isEmpty()) completion += 20;

        profile.setProfileCompletionPercentage(completion);

        studentProfileRepository.save(profile);
        return mapToDto(profile);
    }

    private StudentProfileDto mapToDto(StudentProfile profile) {
        StudentProfileDto dto = new StudentProfileDto();
        dto.setId(profile.getId());
        dto.setFullName(profile.getFullName());
        dto.setCollege(profile.getCollege());
        dto.setBranch(profile.getBranch());
        dto.setGraduationYear(profile.getGraduationYear());
        dto.setCgpa(profile.getCgpa() != null ? profile.getCgpa().doubleValue() : null);
        dto.setPhone(profile.getPhone());
        dto.setGithubUrl(profile.getGithubUrl());
        dto.setLinkedinUrl(profile.getLinkedinUrl());
        dto.setPortfolioUrl(profile.getPortfolioUrl());
        dto.setBio(profile.getBio());
        dto.setHeadline(profile.getHeadline());
        dto.setSkills(profile.getSkills());
        dto.setProfileCompletionPercentage(profile.getProfileCompletionPercentage());
        return dto;
    }
}

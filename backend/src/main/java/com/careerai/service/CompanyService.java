package com.careerai.service;

import com.careerai.common.util.SecurityUtils;
import com.careerai.domain.entity.CompanyProfile;
import com.careerai.domain.entity.User;
import com.careerai.domain.repository.CompanyProfileRepository;
import com.careerai.domain.repository.UserRepository;
import com.careerai.dto.CompanyProfileDto;
import com.careerai.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyProfileRepository companyProfileRepository;
    private final UserRepository userRepository;

    public CompanyProfileDto getMyProfile() {
        String email = SecurityUtils.getCurrentUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        CompanyProfile profile = companyProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Company profile not found"));

        return mapToDto(profile);
    }

    @Transactional
    public CompanyProfileDto updateMyProfile(CompanyProfileDto dto) {
        String email = SecurityUtils.getCurrentUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        CompanyProfile profile = companyProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Company profile not found"));

        profile.setCompanyName(dto.getCompanyName());
        profile.setIndustry(dto.getIndustry());
        profile.setWebsite(dto.getWebsite());
        profile.setLocation(dto.getLocation());
        profile.setDescription(dto.getDescription());

        companyProfileRepository.save(profile);
        return mapToDto(profile);
    }

    public CompanyProfileDto mapToDto(CompanyProfile profile) {
        CompanyProfileDto dto = new CompanyProfileDto();
        dto.setId(profile.getId());
        dto.setCompanyName(profile.getCompanyName());
        dto.setIndustry(profile.getIndustry());
        dto.setWebsite(profile.getWebsite());
        dto.setLocation(profile.getLocation());
        dto.setDescription(profile.getDescription());
        dto.setIsVerified(profile.getIsVerified());
        return dto;
    }
}

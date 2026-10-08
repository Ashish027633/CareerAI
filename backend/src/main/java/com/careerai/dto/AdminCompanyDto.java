package com.careerai.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AdminCompanyDto {
    private Long id;
    private String companyName;
    private String email;
    private String industry;
    private String website;
    private String location;
    private Boolean isVerified;
    private LocalDateTime createdAt;
}

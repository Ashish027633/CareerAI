package com.careerai.dto;

import lombok.Data;

@Data
public class CompanyProfileDto {
    private Long id;
    private String companyName;
    private String industry;
    private String website;
    private String location;
    private String description;
    private Boolean isVerified;
}

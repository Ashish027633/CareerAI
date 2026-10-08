package com.careerai.dto;

import lombok.Data;

import java.util.List;

@Data
public class StudentProfileDto {
    private Long id;
    private String fullName;
    private String college;
    private String branch;
    private Integer graduationYear;
    private Double cgpa;
    private String phone;
    private String githubUrl;
    private String linkedinUrl;
    private String portfolioUrl;
    private String bio;
    private String headline;
    private List<String> skills;
    private Integer profileCompletionPercentage;
}

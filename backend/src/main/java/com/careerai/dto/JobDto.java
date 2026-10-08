package com.careerai.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class JobDto {
    private Long id;
    private String title;
    private String description;
    private String location;
    private String salaryRange;
    private String experienceLevel;
    private String jobType;
    private Double minCgpa;
    private List<String> requiredSkills;
    private List<String> optionalSkills;
    private List<String> responsibilities;
    private List<String> benefits;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long companyId;
    private String companyName;
}

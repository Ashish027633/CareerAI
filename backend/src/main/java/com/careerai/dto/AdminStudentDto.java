package com.careerai.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class AdminStudentDto {
    private Long id;
    private String fullName;
    private String email;
    private String college;
    private String branch;
    private Integer graduationYear;
    private BigDecimal cgpa;
    private Integer profileCompletionPercentage;
    private String status; // User status or profile status
    private LocalDateTime createdAt;
}

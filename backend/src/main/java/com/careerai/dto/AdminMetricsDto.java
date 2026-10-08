package com.careerai.dto;

import lombok.Data;

@Data
public class AdminMetricsDto {
    private Long totalStudents;
    private Long totalCompanies;
    private Long totalJobs;
    private Long totalApplications;
    private Long selectedCandidates;
}

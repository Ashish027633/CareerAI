package com.careerai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDashboardStatsDto {
    private long activeJobs;
    private long totalApplicants;
    private long shortlisted;
    private long interviews;
    private long selected;
}

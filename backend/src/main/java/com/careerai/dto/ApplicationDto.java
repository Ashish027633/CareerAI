package com.careerai.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ApplicationDto {
    private Long id;
    private Long studentId;
    private String studentName;
    private String studentEmail;
    private Long jobId;
    private String jobTitle;
    private String companyName;
    private String status;
    private Integer matchPercentage;
    private LocalDateTime appliedAt;
    private LocalDateTime updatedAt;
}

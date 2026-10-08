package com.careerai.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class InterviewDto {
    private Long id;
    private Long applicationId;
    private String studentName;
    private String companyName;
    private String jobTitle;
    private LocalDate interviewDate;
    private LocalTime interviewTime;
    private String interviewType;
    private String meetingLink;
    private String status;
    private String notes;
}

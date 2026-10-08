package com.careerai.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ResumeDto {
    private Long id;
    private String fileName;
    private Long fileSizeBytes;
    private String contentType;
    private Boolean isActive;
    private LocalDateTime uploadedAt;
}

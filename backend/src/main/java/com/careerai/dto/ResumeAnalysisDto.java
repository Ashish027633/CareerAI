package com.careerai.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
public class ResumeAnalysisDto {
    private Long id;
    private Long resumeId;
    private Integer overallScore;
    private Map<String, Integer> categoryScores;
    private Map<String, String> scoreReasons;
    private List<String> skills;
    private Map<String, List<String>> skillCategories;
    private Integer skillCount;
    private List<EducationDto> education;
    private List<ProjectDto> projects;
    private List<ExperienceDto> experience;
    private String experienceLevel;
    private List<String> certifications;
    private List<String> sections;
    private List<String> missingSections;
    private Integer completenessPercentage;
    private List<String> recommendations;
    private Integer pageCount;
    private LocalDateTime analyzedAt;

    @Data
    public static class EducationDto {
        private String degree;
        private String field;
        private String institution;
        private String graduationYear;
        private String cgpa;
        private String percentage;
    }

    @Data
    public static class ProjectDto {
        private String name;
        private String description;
        private List<String> technologies;
    }

    @Data
    public static class ExperienceDto {
        private String company;
        private String role;
        private String duration;
        private String description;
    }
}

package com.careerai.domain.entity;

import com.careerai.domain.converter.StringListConverter;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "resume_analyses")
@Getter
@Setter
public class ResumeAnalysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resume_id", nullable = false, unique = true)
    private Resume resume;

    @Column(nullable = false)
    private Integer overallScore;

    @Column(nullable = false)
    private Integer skillsScore;

    @Column(nullable = false)
    private Integer educationScore;

    @Column(nullable = false)
    private Integer projectsScore;

    @Column(nullable = false)
    private Integer experienceScore;

    @Column(nullable = false)
    private Integer formattingScore;

    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "TEXT", nullable = false)
    private List<String> detectedSkills = new ArrayList<>();

    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "TEXT", nullable = false)
    private List<String> missingSkills = new ArrayList<>();

    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "TEXT", nullable = false)
    private List<String> recommendations = new ArrayList<>();

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime analyzedAt;
}

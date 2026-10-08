package com.careerai.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

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
    private Integer skillsScore = 0;

    @Column(nullable = false)
    private Integer projectsScore = 0;

    @Column(nullable = false)
    private Integer educationScore = 0;

    @Column(nullable = false)
    private Integer experienceScore = 0;

    @Column(nullable = false)
    private Integer certificationsScore = 0;

    @Column(nullable = false)
    private Integer structureScore = 0;

    @Column(nullable = false)
    private Integer completenessScore = 0;

    @Column(nullable = false)
    private Integer completenessPercentage = 0;

    @Column(nullable = false)
    private Integer pageCount = 1;

    @Lob
    @Column(columnDefinition = "LONGTEXT", nullable = false)
    private String rawAnalysisJson;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime analyzedAt;
}

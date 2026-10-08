package com.careerai.dto;

import lombok.Data;
import java.util.List;

@Data
public class JobMatchDto {
    private JobDto job;
    private Integer matchPercentage;
    private Integer aiRelevanceScore;
    private Boolean eligible;
    private Integer eligibilityContribution;
    
    private Integer requiredSkillScore;
    private Integer optionalSkillScore;
    private Integer semanticSimilarityScore;
    
    private List<String> matchedSkills;
    private List<String> missingSkills;
    private List<String> matchedOptionalSkills;
    
    private List<String> eligibilityReasons;
    private List<String> missingRequirements;
    private List<String> matchingReasons;
}

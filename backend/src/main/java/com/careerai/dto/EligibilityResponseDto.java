package com.careerai.dto;

import lombok.Data;
import java.util.List;

@Data
public class EligibilityResponseDto {
    private Boolean eligible;
    private List<String> missingRequirements;
}

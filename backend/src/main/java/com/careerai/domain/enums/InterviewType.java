package com.careerai.domain.enums;

public enum InterviewType {
    TECHNICAL_ROUND_1("Technical Round 1"),
    TECHNICAL_ROUND_2("Technical Round 2"),
    HR_ROUND("HR Round"),
    MANAGERIAL("Managerial");

    private final String displayName;

    InterviewType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}

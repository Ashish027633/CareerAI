package com.careerai.domain.enums;

public enum JobType {
    FULL_TIME("Full-time"),
    INTERNSHIP("Internship"),
    CONTRACT("Contract"),
    REMOTE("Remote");

    private final String displayName;

    JobType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}

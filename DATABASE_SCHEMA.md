# CareerAI Relational Database Schema Design (Phase 4 Target)

## Overview
Designed for MySQL 8+ / PostgreSQL with Spring Data JPA and Hibernate. All foreign keys, constraints, and audit fields are specified below.

```mermaid
erDiagram
    USERS ||--o| STUDENT_PROFILES : "has one"
    USERS ||--o| COMPANY_PROFILES : "has one"
    USERS ||--o{ NOTIFICATIONS : "receives"
    STUDENT_PROFILES ||--o{ RESUMES : "uploads"
    RESUMES ||--o| RESUME_ANALYSES : "evaluates to"
    COMPANY_PROFILES ||--o{ JOBS : "publishes"
    JOBS ||--o{ JOB_APPLICATIONS : "receives"
    STUDENT_PROFILES ||--o{ JOB_APPLICATIONS : "submits"
    JOB_APPLICATIONS ||--o{ INTERVIEWS : "progresses to"
```

## Tables & Relationships

### 1. `users`
- `id` (BIGINT, PK, AUTO_INCREMENT)
- `email` (VARCHAR(150), UNIQUE, NOT NULL)
- `password_hash` (VARCHAR(255), NOT NULL)
- `role` (ENUM('ROLE_STUDENT', 'ROLE_COMPANY', 'ROLE_ADMIN'), NOT NULL)
- `is_active` (BOOLEAN, DEFAULT TRUE)
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
- `updated_at` (TIMESTAMP)

### 2. `student_profiles`
- `id` (BIGINT, PK, AUTO_INCREMENT)
- `user_id` (BIGINT, FK -> users.id, UNIQUE, NOT NULL)
- `full_name` (VARCHAR(120), NOT NULL)
- `phone` (VARCHAR(20))
- `college` (VARCHAR(150))
- `branch` (VARCHAR(100))
- `graduation_year` (INT)
- `cgpa` (DECIMAL(3,2))
- `profile_completion_percentage` (INT, DEFAULT 0)
- `headline` (VARCHAR(200))
- `bio` (TEXT)
- `skills` (JSON / ARRAY)
- `github_url` (VARCHAR(255))
- `linkedin_url` (VARCHAR(255))
- `portfolio_url` (VARCHAR(255))

### 3. `company_profiles`
- `id` (BIGINT, PK, AUTO_INCREMENT)
- `user_id` (BIGINT, FK -> users.id, UNIQUE, NOT NULL)
- `company_name` (VARCHAR(150), NOT NULL)
- `industry` (VARCHAR(100))
- `website` (VARCHAR(255))
- `location` (VARCHAR(150))
- `description` (TEXT)
- `is_verified` (BOOLEAN, DEFAULT FALSE)

### 4. `resumes`
- `id` (BIGINT, PK, AUTO_INCREMENT)
- `student_id` (BIGINT, FK -> student_profiles.id, NOT NULL)
- `file_name` (VARCHAR(255), NOT NULL)
- `file_size_bytes` (BIGINT, NOT NULL)
- `file_url` (VARCHAR(500), NOT NULL)
- `is_active` (BOOLEAN, DEFAULT TRUE)
- `uploaded_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

### 5. `resume_analyses`
- `id` (BIGINT, PK, AUTO_INCREMENT)
- `resume_id` (BIGINT, FK -> resumes.id, UNIQUE, NOT NULL)
- `overall_score` (INT, NOT NULL)
- `skills_score` (INT, NOT NULL)
- `education_score` (INT, NOT NULL)
- `projects_score` (INT, NOT NULL)
- `experience_score` (INT, NOT NULL)
- `formatting_score` (INT, NOT NULL)
- `detected_skills` (JSON, NOT NULL)
- `missing_skills` (JSON, NOT NULL)
- `recommendations` (JSON, NOT NULL)
- `analyzed_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

### 6. `jobs`
- `id` (BIGINT, PK, AUTO_INCREMENT)
- `company_id` (BIGINT, FK -> company_profiles.id, NOT NULL)
- `title` (VARCHAR(150), NOT NULL)
- `description` (TEXT, NOT NULL)
- `location` (VARCHAR(100), NOT NULL)
- `salary_range` (VARCHAR(100), NOT NULL)
- `job_type` (ENUM('Full-time', 'Internship', 'Contract', 'Remote'), NOT NULL)
- `experience_level` (VARCHAR(50), NOT NULL)
- `min_cgpa` (DECIMAL(3,2), DEFAULT 0.0)
- `required_skills` (JSON, NOT NULL)
- `responsibilities` (JSON)
- `benefits` (JSON)
- `is_active` (BOOLEAN, DEFAULT TRUE)
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

### 7. `job_applications`
- `id` (BIGINT, PK, AUTO_INCREMENT)
- `job_id` (BIGINT, FK -> jobs.id, NOT NULL)
- `student_id` (BIGINT, FK -> student_profiles.id, NOT NULL)
- `resume_id` (BIGINT, FK -> resumes.id, NOT NULL)
- `match_percentage` (INT, NOT NULL)
- `status` (ENUM('Applied', 'Under Review', 'Shortlisted', 'Interview', 'Selected', 'Rejected'), DEFAULT 'Applied')
- `applied_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
- `updated_at` (TIMESTAMP)

### 8. `interviews`
- `id` (BIGINT, PK, AUTO_INCREMENT)
- `application_id` (BIGINT, FK -> job_applications.id, NOT NULL)
- `scheduled_time` (TIMESTAMP, NOT NULL)
- `interview_type` (ENUM('Technical Round 1', 'Technical Round 2', 'HR Round', 'Managerial'), NOT NULL)
- `meeting_link` (VARCHAR(255))
- `status` (ENUM('Scheduled', 'Completed', 'Cancelled', 'Rescheduled'), DEFAULT 'Scheduled')
- `notes` (TEXT)

### 9. `notifications`
- `id` (BIGINT, PK, AUTO_INCREMENT)
- `user_id` (BIGINT, FK -> users.id, NOT NULL)
- `title` (VARCHAR(150), NOT NULL)
- `message` (TEXT, NOT NULL)
- `type` (ENUM('INFO', 'APPLICATION_UPDATE', 'INTERVIEW_ALERT', 'RESUME_ANALYSIS'), NOT NULL)
- `is_read` (BOOLEAN, DEFAULT FALSE)
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

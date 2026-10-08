# CareerAI API Documentation (Phase 4 Database Configured)

*(Phase 4 Status: Database migration/configuration implemented. H2 regression verified. Live MySQL persistence verification pending due to unavailable local MySQL runtime.)*

## Standard Response Format
All Spring Boot endpoints follow this standardized response wrapper:
```json
{
  "success": true,
  "message": "Success message or error summary",
  "data": {},
  "timestamp": "2026-10-08T17:30:00Z"
}
```

## 1. Authentication Endpoints (`/api/auth`)
- `POST /api/auth/login`: Authenticates Student, Company, or Admin. Returns JWT token, refresh token, user profile, and assigned roles.
- `POST /api/auth/register/student`: Registers student candidate with academic & contact details.
- `POST /api/auth/register/company`: Registers company recruiter with company metadata.
- `POST /api/auth/logout`: Revokes refresh token and invalidates session.
- `GET /api/auth/me`: Returns current authenticated principal.

## 2. Resume & Resume Intelligence Endpoints (`/api/resumes`)
- `POST /api/resumes/upload`: Multi-part PDF upload (max file size: 10MB). Deactivates previous active resumes for the student and stores the new active PDF in DB.
- `GET /api/resumes/my-resume`: Retrieves currently active uploaded resume metadata.
- `POST /api/resumes/analyze`: Triggers Python AI service parsing pipeline, extracts skills, sections, education, projects, experience, certifications, calculates 100-point CareerAI Resume Readiness Score, saves `ResumeAnalysis` in H2, and returns structured analysis.
- `GET /api/resumes/analysis`: Retrieves the latest stored resume analysis from H2 for the authenticated student's active resume.

## 2.5 Phase 3 AI Service (Python) Endpoints
- `GET /health` or `GET /api/v1/health`: (Python AI Service) Returns basic health status `{"status": "UP"}`.
- `GET /api/system/ai-health`: (Spring Boot) Diagnostic endpoint calling Python AI Service `/health`. Requires `ADMIN`.
- `POST /api/v1/analyze-resume`: (Python AI Service) Internal multipart POST endpoint receiving PDF file bytes. Parses text, detects sections, normalizes skills via taxonomy, extracts education/projects/experience/certs, computes 100-pt score, and returns Pydantic `ResumeAnalysisResponse`.
- `POST /api/v1/match-job`: (Python AI Service) Internal POST endpoint receiving unstructured resume text and job criteria. Computes Semantic Similarity, Required/Optional skill gaps, and returns Pydantic `JobMatchResponse` with AI Relevance Score (max 90).

## 3. Jobs Endpoints (`/api/jobs`)
- `GET /api/jobs`: Lists active jobs.
- `GET /api/jobs/{id}`: Fetches detailed job description.
- `GET /api/jobs/{id}/match`: (Student) Evaluates candidate eligibility and triggers AI service to calculate exact relevance match. Returns `JobMatchDto`.
- `GET /api/jobs/recommended`: (Student) Returns list of eligible jobs dynamically ranked by Match Percentage (AI Relevance + Eligibility Contribution).
- `POST /api/company/jobs`: (Company) Creates a new job posting.
- `PUT /api/company/jobs/{id}`: (Company) Updates job listing details.
- `DELETE /api/company/jobs/{id}`: (Company) Soft-deletes a job posting.

## 4. Application Endpoints (`/api/applications`)
- `POST /api/jobs/{jobId}/apply`: Submits a student job application.
- `GET /api/applications/my`: Returns student's submitted applications.
- `GET /api/company/jobs/{jobId}/applicants`: (Company) Retrieves candidate applications for a job.
- `PATCH /api/company/applications/{id}/status`: (Company) Updates candidate application status.

## 5. Interview Endpoints (`/api/interviews`)
- `GET /api/interviews/my`: Returns upcoming and past interviews for the student.
- `GET /api/company/interviews`: (Company) Returns company interviews.
- `POST /api/company/interviews`: (Company) Schedules an interview.
- `DELETE /api/interviews/{id}`: (Company/Admin) Soft-cancels an interview.

## 6. Admin Endpoints (`/api/admin`)
- `GET /api/admin/metrics`: Platform-wide aggregates.
- `GET /api/admin/students`: Directory of registered students.
- `GET /api/admin/companies`: Directory of registered companies.

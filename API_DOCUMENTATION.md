# CareerAI API Documentation (Phase 1 Contract & Phase 2 Roadmap)

## Standard Response Format
All endpoints will follow this response wrapper in Phase 2:
```json
{
  "success": true,
  "message": "Success message or error summary",
  "data": {},
  "timestamp": "2026-10-07T14:05:00Z"
}
```

## 1. Authentication Endpoints (`/api/auth`)
- `POST /api/auth/login`: Authenticates Student, Company, or Admin. Returns JWT token, refresh token, user profile, and assigned roles.
- `POST /api/auth/register/student`: Registers student candidate with academic & contact details.
- `POST /api/auth/register/company`: Registers company recruiter with company metadata.
- `POST /api/auth/logout`: Revokes refresh token and invalidates session.
- `GET /api/auth/me`: Returns current authenticated principal.

## 2. Resume & AI Endpoints (`/api/resumes`)
- `POST /api/resumes/upload`: Multi-part PDF upload. Triggers parsing pipeline.
- `GET /api/resumes/my-resume`: Retrieves currently active resume metadata & download URL.
- `GET /api/resumes/analysis`: Retrieves comprehensive resume score, category scores (skills, education, projects, experience, certifications, formatting), detected skills, missing skills, and improvement recommendations.
- `POST /api/resumes/reanalyze`: Triggers re-computation of ATS score and skill gaps.

## 3. Jobs Endpoints (`/api/jobs`)
- `GET /api/jobs`: Lists active jobs with optional filtering (search query, location, jobType, minSalary, experience, skills, sort). Includes personalized `matchPercentage` for authenticated students.
- `GET /api/jobs/:id`: Fetches detailed job description, responsibilities, required skills, eligibility, and candidate match breakdown (matched vs missing skills).
- `POST /api/jobs`: (Company) Creates a new job posting.
- `PUT /api/jobs/:id`: (Company/Admin) Updates job listing details.
- `PATCH /api/jobs/:id/status`: (Company/Admin) Activates or pauses a job listing.
- `DELETE /api/jobs/:id`: (Company/Admin) Deletes a job posting.

## 4. Application Endpoints (`/api/applications`)
- `POST /api/applications`: Submits a student job application for a specific job ID.
- `GET /api/applications/my`: Returns student's submitted applications with current status, timeline, and match scores.
- `GET /api/applications/job/:jobId`: (Company) Retrieves ranked candidate applications for a specific job.
- `PATCH /api/applications/:id/status`: (Company) Updates candidate status (`Applied`, `Under Review`, `Shortlisted`, `Interview`, `Selected`, `Rejected`).

## 5. Interview Endpoints (`/api/interviews`)
- `GET /api/interviews/my`: Returns upcoming and past interviews for the student.
- `POST /api/interviews/schedule`: (Company) Schedules an interview round with date, time, format, and meeting link.

## 6. Admin Endpoints (`/api/admin`)
- `GET /api/admin/metrics`: Platform-wide aggregates (students, companies, jobs, applications, placement rate, monthly trends).
- `GET /api/admin/students`: Directory of registered students with search/filter/status management.
- `GET /api/admin/companies`: Directory of registered companies with approval & moderation controls.
- `GET /api/admin/jobs`: Platform-wide job listing moderation.
- `GET /api/admin/applications`: Platform-wide application ledger.

## 7. Phase 2B Extensions (Implemented)
- `GET /api/student/profile`: Returns `StudentProfileDto`. Requires `STUDENT` role.
- `PUT /api/student/profile`: Updates `StudentProfileDto`.
- `GET /api/company/profile`: Returns `CompanyProfileDto`. Requires `COMPANY` role.
- `PUT /api/company/profile`: Updates `CompanyProfileDto`.
- `GET /api/jobs`: Returns list of active `JobDto`.
- `GET /api/jobs/{id}`: Returns specific `JobDto`.
- `POST /api/company/jobs`: Creates a job.
- `PUT /api/company/jobs/{id}`: Updates a job.
- `DELETE /api/company/jobs/{id}`: Deletes a job.
- `POST /api/jobs/{jobId}/apply`: Applies to a job.
- `GET /api/applications/my`: Gets student's applications.
- `GET /api/company/jobs/{jobId}/applicants`: Gets applicants for a job.
- `PATCH /api/company/applications/{id}/status`: Updates application status.
- `POST /api/company/interviews`: Schedules an interview.
- `GET /api/interviews/my`: Gets student's interviews.
- `GET /api/company/interviews`: Gets company's interviews.
- `POST /api/resumes/upload`: Uploads a PDF resume.
- `GET /api/resumes/my-resume`: Gets active resume.
- `GET /api/notifications`: Gets notifications.
- `PATCH /api/notifications/{id}/read`: Marks a notification as read.
- `PATCH /api/notifications/read-all`: Marks all as read.
- `GET /api/admin/metrics`: Gets overall DB metrics.

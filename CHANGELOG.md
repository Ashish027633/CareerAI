# CareerAI Changelog

All notable changes to the CareerAI project will be documented in this file.

## [5.0.0-phase-5-cloud-deployment] - 2026-10-10
### Added (Phase 5 Cloud Deployment)
- **Render Blueprint**: Configured ender.yaml for zero-downtime deployment of Spring Boot and Python FastAPI.
- **AI Service Security**: Migrated Python AI service to a public web service (due to Render free tier limits) and secured all endpoints with a mandatory x-api-key header.
- **Health Checks**: Standardized /api/health across services for Render orchestration.

## [4.0.0-phase-4-database-migration] - 2026-10-08
### Added (Phase 4 Database & Integration)
- **Status**: Database migration/configuration implemented. H2 regression verified (19/19 passing). Live Aiven MySQL production database provisioned, secured, schema initialized with TLS verification, and persistence tested across restarts.
- **MySQL Compatibility**: Audited and modified JPA entities for MySQL production safety (`MEDIUMBLOB` for Resumes, `LONGTEXT` for AI Analysis JSON).
- **Application Uniqueness**: Formalized the "One application ever per student/job" business rule via database-level `UNIQUE(student_id, job_id)` constraint on `job_applications`.
- **Targeted Indexes**: Added optimized database indexes (`users.email`, `resumes.student_id`, `jobs.company_id`, `jobs.is_active`, `job_applications.student_id`, `job_applications.job_id`, `job_applications.status`, `notifications.user_id`, `notifications.is_read`).
- **Resilient Cascades**: Relaxed `CascadeType.ALL` to `CascadeType.PERSIST, CascadeType.MERGE` for Jobs and Resumes to prevent accidental cascading hard-deletions of critical historical data.
- **Schema Strategy**: Documented that `ddl-auto=update` is NOT the final production migration strategy.
- **Test Determinism**: Hardened `AiServiceClientTest` to not fail when real Python service is running locally on port 8000.

## [3.2.0-smart-job-matching] - 2026-10-08
### Added (Phase 3C Smart Job Matching & Skill Gap Analysis)
- **Semantic Job Matching**: Python AI service matches resume text to unstructured job descriptions using TF-IDF vectorization and Cosine Similarity (max 15 pts).
- **Skill Gap Scoring**: Weighted extraction penalizing missing required skills (max 60 pts) and rewarding optional skills (max 15 pts).
- **AI Relevance vs Eligibility**: Strict architectural division between AI Relevance Score (calculated in Python out of 90) and Business Eligibility (calculated in Spring Boot out of 10 for CGPA, degree, batch year, backlogs).
- **Job Matching DTO & Services**: Spring Boot calculates eligibility, fetches AI match from python `/api/v1/match-job`, and aggregates to a final Match Percentage.
- **Recommendations Endpoint**: `GET /api/jobs/recommended` strictly filters ineligible jobs and dynamically ranks the remaining jobs by Match Percentage.
- **Frontend Upgrades**: Job Details page shows match breakdown, missing/matched skills, and AI transparency disclaimer. Created Recommended Jobs feed.
- **E2E Testing**: E2E test script validates exact score deduction logic, eligibility gating, and ranking scenarios.

## [3.1.0-real-resume-intelligence] - 2026-10-08
### Added (Phase 3B Real Resume Intelligence Pipeline)
- **PyMuPDF Text Extraction**: Integrated PyMuPDF (`fitz`) for PDF text parsing and page counting with handling for normal, multi-page, empty, password-protected, or unreadable PDFs.
- **Text Cleaner**: Preserves technical tokens (`C++`, `C#`, `.NET`, `Node.js`, `React.js`, `Spring Boot`, `scikit-learn`, `SQL`, `Java`).
- **Section Detector**: Detects SUMMARY, EDUCATION, SKILLS, PROJECTS, EXPERIENCE, CERTIFICATIONS, ACHIEVEMENTS, CONTACT.
- **Skill Knowledge Base & Token Extractor**: Standardized taxonomy in `app/data/skills.json` with word-boundary token matching to prevent false substring matches (e.g., `java` matching `javascript`).
- **Education, Project, Experience, Certification Extractors**: Identifies degrees, fields, institutions, CGPA/%, projects, tech stacks, experience levels (`FRESHER`/`EXPERIENCED`), and verified certifications.
- **CareerAI Resume Readiness Score Engine**: Transparent 100-point scoring algorithm (Skills 25, Projects 20, Education 15, Experience 15, Certifications 10, Structure 10, Completeness 5) with category scores and explainable score reasons.
- **Rule-Based Recommendation Engine**: Generates specific, actionable resume improvement suggestions based on actual structural and technical gaps.
- **Python API Endpoint**: `POST /api/v1/analyze-resume` taking PDF upload (`multipart/form-data`) and returning strict Pydantic response.
- **Spring Boot Client Integration**: Updated `AiServiceClient.java` to send PDF bytes to Python via `POST /api/v1/analyze-resume` with 30s timeout and response validation.
- **Persistence & API Endpoints**: Updated `ResumeAnalysis` entity to persist full analysis JSON in H2 linked to `Resume` versions. Added `POST /api/resumes/analyze` and `GET /api/resumes/analysis` endpoints.
- **Frontend Integration**: Updated `resumeService.js` and `ResumeAnalysisPage.jsx` to render live scores, category radar chart, detected skills, education, projects, experience, certs, recommendations, and mandatory AI transparency disclaimer.
- **Test Suites**: Created Python pytest suite (16 tests passed) and Spring Boot Maven integration tests (19 tests passed).

## [3.0.0-ai-service-foundation] - 2026-10-08
### Added (Phase 3A AI Service Foundation)
- **Python AI Microservice**: Initialized `ai-service` using FastAPI, Uvicorn, and Pydantic with `GET /health` and `GET /api/v1/health` endpoints.
- **Spring Boot Client Integration**: Added `AiServiceClient.java` leveraging `RestClient` with configured timeouts and graceful failure handling. Exposed protected `GET /api/system/ai-health` diagnostic endpoint.

## [2.3.0-backend-integration-and-cleanup] - 2026-10-08
### Added & Changed (Phase 2C, 2D, 2E)
- **Phase 2C Frontend â†” Backend Integration**: Connected all React frontend services to real Spring Boot REST APIs using Axios. Configured global interceptors for JWT injection and 401/403 error handling.
- **Phase 2D Final Backend Gaps**: Implemented missing endpoints including Admin Directory endpoints (`/api/admin/students`, `/api/admin/companies`) and Interview Soft Delete / Cancellation strategy (`status = CANCELLED`).
- **Phase 2E Production Cleanup**: Scrubbed demo labels, externalized environment variables, configured Vercel SPA routing.

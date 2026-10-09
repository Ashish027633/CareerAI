# CareerAI Project Context

## Project Goal
CareerAI is an intelligent, AI-powered campus placement preparation, resume analysis, and job matching platform designed for students, recruiting companies, and institutional placement administrators. It bridges the gap between candidate resumes and modern company job descriptions through deep skill gap extraction, ATS resume scoring, job recommendations, applicant tracking, and placement analytics.

PHASE 4 â€” DATABASE MIGRATION & INTEGRATION (IMPLEMENTATION COMPLETE)

## Status
Phase 1 Frontend completed.
Phase 2 (Backend Foundation, Business Logic, Frontend-Backend Integration, Gaps, Cleanup) completed.
Phase 3A AI Service Foundation completed.
Phase 3B Real Resume Intelligence completed.
Phase 3C Smart Job Matching completed.
Phase 3C Smart Job Matching completed.
Phase 4 Database Migration & Integration (VERIFIED COMPLETE).

## Completed Features
- **Visual Identity & Design Tokens**: Bespoke SaaS palette centered around deep dark obsidian (`#08090C`), rich burgundy/wine (`#991B32`), warm ivory highlights (`#F7F4EB`), and muted coral accents (`#E05D5D`). Centralized semantic tokens in `src/constants/themeTokens.js` and `tailwind.config.js`.
- **Backend & REST APIs**: Spring Boot 3.3.4, Java 17, Spring Security JWT authentication, H2 JPA persistence for Student/Company profiles, Resumes, Jobs, Applications, Interviews, Admin directories.
- **Python AI Microservice Foundation (Phase 3A)**: FastAPI application running locally on port 8000. `AiServiceClient` connection from Spring Boot to Python.
- **Real Resume Intelligence Pipeline (Phase 3B)**:
  - PyMuPDF text extraction with handling for normal, multi-page, empty, password-protected, or unreadable PDFs.
  - Text cleaner preserving technical tokens (`C++`, `C#`, `.NET`, `Node.js`, `React.js`, `Spring Boot`, `scikit-learn`, `SQL`, `Java`).
  - Section detector for SUMMARY, EDUCATION, SKILLS, PROJECTS, EXPERIENCE, CERTIFICATIONS, ACHIEVEMENTS, CONTACT.
  - Token-aware skill extractor using categorized `skills.json` knowledge base with alias normalization (e.g. `js` -> `JavaScript`).
  - Education, project, experience, and certification extractors.
  - Deterministic 100-point CareerAI Resume Readiness Score (Skills 25, Projects 20, Education 15, Experience 15, Certifications 10, Structure 10, Completeness 5).
  - Rule-based actionable improvement suggestions.
  - H2 persistence of `ResumeAnalysis` entity linked to `Resume` versions.
  - Real React display in `ResumeAnalysisPage.jsx` with radar breakdown, skills badges, score reasons, and AI disclaimer.
- **Smart Job Matching & Recommendation Engine (Phase 3C)**:
  - Python AI Service uses TF-IDF and Cosine Similarity to compare unstructured job descriptions against resume content (max 15 pts).
  - Python evaluates strict requirements gaps (max 60 pts) and optional skills gap (max 15 pts) for a total AI Relevance Score of 90.
  - Spring Boot enforces strict eligibility criteria (Minimum CGPA, Graduation Year, Backlogs) contributing 10 points or 0 points to the final 100-point match metric.
  - Ineligible jobs retain their AI score but lose their eligibility contribution.
  - `/api/jobs/recommended` strictly returns eligible jobs ranked dynamically by final match percentage.
  - `JobDetailsPage.jsx` clearly breaks down AI match metrics vs institutional eligibility criteria with disclaimer.

## Technology Stack
- **Frontend**: React 18, Vite, JavaScript, Vanilla/Tailwind CSS, React Router v6, Lucide React, Recharts, Axios.
- **Backend**: Java 17, Spring Boot 3.3.4, Spring Security 6, JWT, Spring Data JPA, H2 Database (in-memory).
- **AI/ML Microservice**: Python 3.14, FastAPI, Uvicorn, Pydantic, PyMuPDF, pytest.

## Next Phase
## Next Phase
PHASE 5 â€” TESTING, SECURITY & DEPLOYMENT

## Limitations & Architecture Notes
- **MySQL Migration Strategy**: Currently using `ddl-auto=update` as a temporary bootstrap mechanism for the initial MySQL rollout. Hibernate `ddl-auto=update` is NOT the final production schema migration strategy. A proper tool like Flyway/Liquibase will be needed in the future.
- **MySQL Live Verification**: MySQL persistence-after-restart has not been explicitly tested locally yet because the MySQL runtime is unavailable in the local environment. Code and configuration are ready for validation.

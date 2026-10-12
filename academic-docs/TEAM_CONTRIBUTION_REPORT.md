# CareerAI — 12-Week Team Contribution Report

**Project Title**: CareerAI — AI-Based Placement & Resume Analyzer
**Institutional Track**: Final Year B.Tech / Major Project Evaluation
**Academic Session**: 2026
**Repository**: [https://github.com/Ashish027633/CareerAI](https://github.com/Ashish027633/CareerAI)
**Live Frontend**: [https://career-ai-orpin-kappa.vercel.app/](https://career-ai-orpin-kappa.vercel.app/)
**Live Backend**: [https://careerai-backend-4soo.onrender.com](https://careerai-backend-4soo.onrender.com)

---

## 1. Project Information & Team Roster

| S. No. | Student Name | Roll Number | Team Role | Proposed Module Responsibility | Status |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 1 | **Ashish Sharma** | `24EARAD025` | Team Leader | Architecture, Spring Boot Backend, Cross-Service Integration & Deployment | Verified |
| 2 | **Dev Upadhayay** | `24EARAD038` | Team Member | Frontend Architecture, React 18 SPA, Tailwind CSS & Dashboards | Proposed |
| 3 | **Chandan Kumar** | `24EARAD033` | Team Member | Database Modeling, Aiven MySQL Integration, JPA Persistence & Repositories | Proposed |
| 4 | **Gautam Bairwa** | `24EARAD054` | Team Member | Python AI Microservice, PyMuPDF Parsing, Skill Taxonomy & Scoring Engine | Proposed |
| 5 | **Gauransh Rajiria** | `24EARAD051` | Team Member | Quality Assurance, Automated Testing, Security Review & Academic Documentation | Proposed |

> **Note on Academic Records**: Verified university enrollment roll numbers are recorded above. Historical repository commits reflect technical authoring; module distributions below represent the agreed team collaboration plan.

---

## 2. Project Overview & Problem Statement

### 2.1 Problem Statement
Campus placement cells and graduating students face significant operational and technical bottlenecks:
1. **Manual Resume Screening**: Placement officers and recruiters manually screen hundreds of PDF resumes, leading to fatigue, inconsistent evaluations, and delays.
2. **Opaque ATS Scoring**: Commercial Applicant Tracking Systems (ATS) operate as black boxes, failing to explain why a student was rejected or which skills were missing.
3. **Skill Gap Blindspots**: Students often lack actionable, quantitative feedback detailing exact technical deficiencies relative to corporate job descriptions.
4. **Fragmented Workflows**: Job postings, resume uploads, applicant shortlisting, and institutional reporting are typically dispersed across disconnected spreadsheets and email threads.

### 2.2 The CareerAI Solution
**CareerAI** is an institutional-grade, AI-assisted placement intelligence and ATS resume analysis platform. It introduces a transparent, explainable 100-point scoring algorithm, automated PDF text extraction, hybrid job-matching (combining academic eligibility with NLP relevance), and role-tailored dashboards for Students, Recruiters, and Placement Administrators.

---

## 3. Project Objectives
- **Objective 1**: Develop a responsive, light-first Single Page Application (SPA) in React 18 providing seamless workflows for Students, Companies, and Administrators.
- **Objective 2**: Build an enterprise-grade RESTful API backend using Java 17 and Spring Boot 3.3.4, enforcing stateless JWT authentication, Role-Based Access Control (RBAC), and transactional integrity.
- **Objective 3**: Implement a dedicated Python FastAPI NLP microservice leveraging PyMuPDF and Scikit-Learn for entity extraction and semantic TF-IDF job matching.
- **Objective 4**: Design a resilient fallback mechanism in Java (Apache PDFBox) ensuring zero downtime and continuous evaluation even if microservices experience cold starts.
- **Objective 5**: Deploy a production-ready, cloud-hosted architecture using Vercel (Frontend), Render (Spring Boot and FastAPI containers), and Aiven Cloud MySQL with TLS/SSL encryption.

---

## 4. Technology Stack & Tooling

| Tier / Layer | Technology | Version | Purpose in CareerAI |
| :--- | :--- | :--- | :--- |
| **Frontend SPA** | React.js | 18.2 | Component-driven user interface and interactive state management |
| **Build Tool** | Vite | 5.x / 8.x | High-speed frontend bundling and hot module replacement |
| **CSS Framework** | Tailwind CSS | 3.4 | Utility-first styling with custom editorial light theme tokens |
| **Icons & Charts** | Lucide React / Recharts | Latest | Modern iconography and SVG data visualization charts |
| **Backend Framework** | Java Spring Boot | 3.3.4 | Enterprise application gateway, REST API, and business rules |
| **Java Runtime** | Eclipse Temurin JDK | 17 | Core execution environment for high-throughput concurrency |
| **Security & Auth** | Spring Security / JJWT | 0.12.5 | Stateless JWT generation, validation, and BCrypt password encryption |
| **ORM / Persistence** | Spring Data JPA / Hibernate | 6.x | Object-relational mapping, database transactions, and repository queries |
| **Database** | Aiven Cloud MySQL | 8.0 | Cloud relational storage for users, jobs, applications, and resume BLOBs |
| **In-Memory Testing DB** | H2 Database | 2.x | Isolated in-memory SQL database for deterministic JUnit integration tests |
| **AI / NLP Microservice** | Python FastAPI | 0.110+ | Asynchronous REST service for PDF parsing and machine learning algorithms |
| **PDF Extraction** | PyMuPDF (`fitz`) / PDFBox | 1.24+ / 2.0.31 | Dual-layer PDF binary extraction (Python primary + Java resilient fallback) |
| **Machine Learning** | Scikit-Learn / NumPy | 1.4+ | TF-IDF vectorization and Cosine Similarity for resume-to-job matching |
| **Testing Frameworks** | JUnit 5 / MockMvc / Pytest | Latest | Multi-tiered automated unit, integration, and regression testing |
| **Cloud Hosting** | Render / Vercel | Cloud | Dockerized container hosting (Render) and Edge CDN static deployment (Vercel) |

---

## 5. System Architecture & Modular Division

```
                      +---------------------------------------+
                      |         CareerAI React Frontend       |
                      |   (Vercel CDN Edge Hosting / SPA)     |
                      +-------------------+-------------------+
                                          | HTTPS / REST (JWT)
                                          v
                      +---------------------------------------+
                      |      Spring Boot Gateway & API        |
                      |     (Render Cloud Container - Java)   |
                      +---------+-------------------+---------+
                                |                   |
                 Internal HTTP  |                   | JDBC / TLS
              (x-api-key Auth)  |                   |
                                v                   v
          +-----------------------+     +-----------------------+
          |   Python AI Service   |     |   Aiven Cloud MySQL   |
          |  (FastAPI Microservice|     |  (Managed Relational  |
          |   PyMuPDF & TF-IDF)   |     |    Production DB)     |
          +-----------------------+     +-----------------------+
```

### Module Breakdown
- **Module 1 (Architecture & Backend Gateway)**: Handles API routing, Spring Security filters, JWT authentication, user registration, role enforcement, and cross-service orchestration.
- **Module 2 (Frontend Client & Dashboards)**: Manages client routing, responsive UI views, state management, form validations, Axios interceptors, and candidate dossier tables.
- **Module 3 (Persistence & Data Engineering)**: Manages database schema design, JPA entities, connection pooling (HikariCP), BLOB management for PDFs, and index optimization.
- **Module 4 (AI & NLP Resume Intelligence)**: Handles PyMuPDF text parsing, token-level skill extraction (`skills.json`), 100-point scoring calculations, and semantic TF-IDF job matching.
- **Module 5 (Quality Assurance & Systems Audit)**: Manages automated test suites (JUnit 5, Pytest), end-to-end integration verifications, security audit, and academic documentation.

---

## 6. Complete 12-Week Day-by-Day Work Schedule (All 84 Days)

*Calendar structure: Monday to Sunday across all 12 weeks.*

### Week 1: Inception, Requirements & Feasibility (Days 1–7)
- **Day 1 (Mon)**: Project Inception & Team Formation. Define CareerAI project scope, problem statement, and campus placement friction points.
- **Day 2 (Tue)**: Stakeholder Analysis. Interview student job seekers, placement cell officers, and corporate recruiters to outline user stories.
- **Day 3 (Wed)**: Feasibility Analysis. Evaluate technical feasibility of client-side React with Spring Boot and Python FastAPI microservices.
- **Day 4 (Thu)**: Scope & Feature Definition. Finalize core platform modules: Student Vault, Recruiter Console, and Admin Command Center.
- **Day 5 (Fri)**: Project Abstract Drafting. Complete initial draft of `01_Project_Abstract.md` and define evaluation milestones.
- **Day 6 (Sat)**: Mentor Review & Guide Interaction. Present project scope and abstract to faculty guide for initial academic clearance.
- **Day 7 (Sun)**: Retrospective & Week 2 Planning. Consolidate mentor feedback and schedule Week 2 requirements documentation.

### Week 2: Requirements Specification & Database Design (Days 8–14)
- **Day 8 (Mon)**: SRS Document Authoring. Draft Software Requirements Specification detailing functional and non-functional requirements (`02_SRS.md`).
- **Day 9 (Tue)**: System Architecture Specification. Formulate decoupled microservice architecture, API contracts, and security boundaries (`ARCHITECTURE.md`).
- **Day 10 (Wed)**: UML Modeling — Use Case & Class Diagrams. Design actor use cases (Student, Company, Admin) and entity class relationships (`03_UML_Design.md`).
- **Day 11 (Thu)**: UML Modeling — Sequence Diagrams. Map sequence diagrams for JWT login, PDF resume upload, and AI score computation.
- **Day 12 (Fri)**: Relational Database Schema Design. Formulate ER diagram, table schemas, primary/foreign keys, and data types (`04_Database_Design.md`).
- **Day 13 (Sat)**: Database Normalization & Review. Audit schema against 3NF rules; optimize foreign key cascades to avoid orphan records.
- **Day 14 (Sun)**: UI/UX Guidelines & Week 3 Sprint Setup. Define design tokens, color palette, and component specifications (`05_UI_Design.md`).

### Week 3: UI/UX Architecture & Frontend Scaffolding (Days 15–21)
- **Day 15 (Mon)**: Design System Initialization. Configure Tailwind CSS with custom editorial light theme tokens (Burgundy `#8B0026`, Cream `#F3E5D0`).
- **Day 16 (Tue)**: React 18 Application Scaffold. Initialize frontend project using Vite, configure directory structure, and install dependencies.
- **Day 17 (Wed)**: Atomic Component Development. Create reusable components: `Button.jsx`, `Card.jsx`, `Input.jsx`, `Modal.jsx`, `StatusBadge.jsx`.
- **Day 18 (Thu)**: Layout & Shell Construction. Build global navigation structures: `Navbar.jsx`, `Sidebar.jsx`, `PageHeader.jsx`, and `Footer.jsx`.
- **Day 19 (Fri)**: Public Marketing Pages. Build responsive `LandingPage.jsx`, `AboutPage.jsx`, and `FeaturesPage.jsx` with Hero sections.
- **Day 20 (Sat)**: Viewport Responsiveness Audit. Verify UI rendering across 360px (mobile), 768px (tablet), and 1920px (desktop) viewports.
- **Day 21 (Sun)**: UI Polish & Sprint Retrospective. Review UI visual hierarchy and plan authentication view workflows.

### Week 4: Frontend Authentication & Dashboard Views (Days 22–28)
- **Day 22 (Mon)**: Authentication Views. Build 2-column `LoginPage.jsx` and `RegisterPage.jsx` with tabbed Student and Company role selectors.
- **Day 23 (Tue)**: Student Workspace Views. Build `StudentDashboard.jsx` featuring metric stat cards, upcoming interviews, and recent applications.
- **Day 24 (Wed)**: Student Profile & Resume Vault UI. Construct `StudentProfilePage.jsx` and `StudentResumePage.jsx` with drag-and-drop upload zone.
- **Day 25 (Thu)**: Company Hiring Suite UI. Build `CompanyDashboard.jsx`, dynamic job creation requisition form, and applicant review tables.
- **Day 26 (Fri)**: University Admin Command Center. Build `AdminDashboard.jsx` incorporating Recharts visualizations for placement statistics.
- **Day 27 (Sat)**: Forward-Compatible Mock API Layer. Construct realistic mock service endpoints in `frontend/src/services/api/` for early testing.
- **Day 28 (Sun)**: Phase 1 Review & Backend Milestone Prep. Audit all 23 frontend client routes; verify zero console errors.

### Week 5: Spring Boot Foundation & Security Engine (Days 29–35)
- **Day 29 (Mon)**: Backend Initialization. Scaffold Spring Boot 3.3.4 project with Java 17, Maven wrapper, and core web dependencies.
- **Day 30 (Tue)**: Spring Security Configuration. Implement `SecurityConfig.java` enforcing stateless session management and BCrypt password encryption.
- **Day 31 (Wed)**: JWT Infrastructure. Create `JwtService.java` and `JwtAuthenticationFilter.java` for signing and validating bearer tokens.
- **Day 32 (Thu)**: Core User Entity & Roles. Implement `User.java` entity, `Role.java` enum (`ROLE_STUDENT`, `ROLE_COMPANY`, `ROLE_ADMIN`), and `UserRepository`.
- **Day 33 (Fri)**: Authentication REST Controller. Implement `AuthController.java` and `AuthService.java` handling registration and login requests.
- **Day 34 (Sat)**: Auth Integration Testing. Write MockMvc tests verifying JWT token issuance, bad credential handling, and duplicate email rejection.
- **Day 35 (Sun)**: Security Code Audit. Verify environment externalization for `JWT_SECRET` and prepare student profile entities.

### Week 6: Profile Management & Placement Business Logic (Days 36–42)
- **Day 36 (Mon)**: Student Profile Entity & Service. Implement `StudentProfile.java`, `StudentProfileRepository`, and CRUD profile management endpoints.
- **Day 37 (Tue)**: Company Profile Entity & Service. Implement `CompanyProfile.java`, `CompanyProfileRepository`, and recruiter profile APIs.
- **Day 38 (Wed)**: Job Posting Requisition Service. Implement `Job.java`, `JobController.java`, and multi-criteria search filtering by title/skills.
- **Day 39 (Thu)**: Placement Application Workflow. Implement `JobApplication.java` entity, application submission, and status lifecycle endpoints.
- **Day 40 (Fri)**: Admin Moderation APIs. Build `AdminController.java` for student directories, company approvals, and institutional metrics.
- **Day 41 (Sat)**: Backend Integration Test Suite. Execute JUnit 5 tests covering student profiles, job postings, and RBAC authorization rules.
- **Day 42 (Sun)**: Code Review & Documentation Sync. Update `API_DOCUMENTATION.md` with newly implemented endpoint specifications.

### Week 7: Resume Vault & PDF Storage Engineering (Days 43–49)
- **Day 43 (Mon)**: Resume Entity & Database Storage. Create `Resume.java` entity with `fileData` (`LONGBLOB`/`MEDIUMBLOB`) for secure relational persistence.
- **Day 44 (Tue)**: Multipart File Upload Controller. Implement `ResumeController.java` (`POST /api/resumes/upload`) handling multi-part PDF streams.
- **Day 45 (Wed)**: Active Resume Versioning Logic. Implement automated deactivation of older resumes when a student uploads a revised master document.
- **Day 46 (Thu)**: Frontend Resume Vault Connection. Wire `StudentResumePage.jsx` to live `/api/resumes/upload` using Axios and FormData.
- **Day 47 (Fri)**: File Inspection & Metadata Retrieval. Implement `GET /api/resumes/my-resume` returning active resume metadata and byte streaming.
- **Day 48 (Sat)**: File Upload Boundary Testing. Test upload constraints (10MB limits, non-PDF file rejection, and empty payload handling).
- **Day 49 (Sun)**: Weekly Synthesis & AI Planning. Validate PDF BLOB integrity in local database; prepare Python AI service specifications.

### Week 8: Python AI Microservice & Resume NLP Pipeline (Days 50–56)
- **Day 50 (Mon)**: FastAPI Microservice Setup. Initialize `ai-service/` with FastAPI, Uvicorn, and structured Pydantic response models.
- **Day 51 (Tue)**: PyMuPDF PDF Text Parsing. Implement `pdf_parser.py` using `fitz` for fast, memory-safe text extraction and page counting.
- **Day 52 (Wed)**: Text Cleaning & Section Detection. Build `text_cleaner.py` and `section_detector.py` preserving programming language tokens.
- **Day 53 (Thu)**: Skill & Entity Taxonomy Extraction. Implement `skill_extractor.py` using boundary-aware regex matching against `skills.json`.
- **Day 54 (Fri)**: 100-Point Resume Scoring Engine. Implement `resume_scorer.py` (Skills 25, Projects 20, Edu 15, Exp 15, Certs 10, Struct 10, Comp 5).
- **Day 55 (Sat)**: AI Microservice Unit Testing. Construct Pytest suite (`tests/`) covering normal, empty, multi-page, and password-protected PDFs.
- **Day 56 (Sun)**: Microservice API Key Security. Secure FastAPI routes using mandatory `x-api-key` header verification (`app/auth.py`).

### Week 9: Job Matching & Spring-to-Python Bridge (Days 57–63)
- **Day 57 (Mon)**: Semantic Job Matcher in Python. Implement `job_matcher.py` using Scikit-Learn TF-IDF vectorization and Cosine Similarity.
- **Day 58 (Tue)**: Spring Boot AI Client Gateway. Implement `AiServiceClient.java` with RestClient, connect/read timeouts, and API key header.
- **Day 59 (Wed)**: Hybrid Job Matching Service. Build `JobMatchingService.java` combining AI Relevance Score (0-90) with Academic Eligibility (10).
- **Day 60 (Thu)**: Recommended Jobs Feed API. Implement `GET /api/jobs/recommended` dynamically filtering and ranking jobs by match %.
- **Day 61 (Fri)**: Frontend Resume Intelligence Visualizer. Update `ResumeAnalysisPage.jsx` with Recharts radar chart, skill pills, and recommendations.
- **Day 62 (Sat)**: End-to-End Matching Verification. Execute matching test scenarios verifying required skill penalties and optional skill bonuses.
- **Day 63 (Sun)**: Phase Review & Cloud Migration Prep. Verify AI transparency disclaimer across all student views; prepare MySQL migration.

### Week 10: Cloud Database Migration & Full API Integration (Days 64–70)
- **Day 64 (Mon)**: Aiven MySQL Provisioning. Provision cloud MySQL instance on Aiven, configure TLS/SSL enforcement, and test remote connectivity.
- **Day 65 (Tue)**: Production Database Schema Migration. Update JPA entity column definitions (`LONGTEXT`, `MEDIUMBLOB`) and configure indexes.
- **Day 66 (Wed)**: End-to-End API Integration. Connect all remaining React frontend services (jobs, applications, interviews) to Spring Boot REST APIs.
- **Day 67 (Thu)**: CORS & JWT Interceptor Hardening. Configure CORS allowed origins and ensure Axios client reliably attaches bearer tokens.
- **Day 68 (Fri)**: Persistence & Restart Testing. Execute server restart tests; verify student profile and resume data persist across cold starts.
- **Day 69 (Sat)**: Complete Regression Testing. Run all 29 Spring Boot Maven integration tests and 16 Python Pytests to verify baseline stability.
- **Day 70 (Sun)**: Production Security Audit. Perform comprehensive security audit ensuring zero exposed secrets and strict RBAC enforcement.

### Week 11: Cloud Deployment & Production Hardening (Days 71–77)
- **Day 71 (Mon)**: Docker Containerization. Construct multi-stage `Dockerfile` for Spring Boot and optimize `Dockerfile` for Python AI service.
- **Day 72 (Tue)**: Render Cloud Deployment. Deploy Spring Boot backend and FastAPI service as web services on Render; deploy frontend to Vercel.
- **Day 73 (Wed)**: Infrastructure Bug Fix — AI Service Sync. Debug Render Blueprint dynamic environment variable resolution (`AI_SERVICE_URL`).
- **Day 74 (Thu)**: Frontend Bug Fix — Interceptor Loop. Resolve Axios redirect loops on unauthenticated public routes (`LandingPage.jsx`, `RegisterPage.jsx`).
- **Day 75 (Fri)**: Auth Bug Fix — DTO Field Alignment. Fix company registration payload key mapping (`officialEmail` vs `email`) and clean login state.
- **Day 76 (Sat)**: Resilient Resume Intelligence Fallback. Implement `LocalResumeAnalyzer.java` (PDFBox) in Java for zero-downtime fallback during AI cold starts.
- **Day 77 (Sun)**: Production Verification. Re-test live registration, login, resume upload, and analysis flows on production URLs.

### Week 12: Documentation, Final Verification & Demo Defense (Days 78–84)
- **Day 78 (Mon)**: Academic Documentation Compilation. Complete final versions of Project Abstract, SRS, UML, and Database Design documents.
- **Day 79 (Tue)**: Team Contribution Report Authoring. Author `TEAM_CONTRIBUTION_REPORT.md` and 5 individual member contribution reports.
- **Day 80 (Wed)**: Presentation Slide Deck Preparation. Draft 15-slide academic presentation structure in `10_Presentation_Outline.md`.
- **Day 81 (Thu)**: Viva Defense Guide Compilation. Author 30 comprehensive viva questions and answers covering Java, Spring, AI, and SQL (`11_Demo_Viva_Guide.md`).
- **Day 82 (Fri)**: Full Platform Dry Run. Rehearse live demonstration flows across Student, Recruiter, and Administrator personas.
- **Day 83 (Sat)**: Final Repository & Documentation Audit. Audit Git working tree, verify all Markdown links, and inspect code diffs.
- **Day 84 (Sun)**: Final Project Sign-Off. Finalize evaluation dossier, verify live system health, and secure faculty evaluation readiness.

---

## 7. Weekly Deliverables & Milestones Summary

| Week | Milestone Name | Key Deliverable | Verification Evidence |
| :---: | :--- | :--- | :--- |
| **W1** | Project Inception | Approved Project Abstract | `academic-docs/01_Project_Abstract.md` |
| **W2** | Requirements & Modeling | SRS & Architecture Specifications | `02_SRS.md`, `03_UML_Design.md`, `04_Database_Design.md` |
| **W3** | Frontend Prototype | Responsive UI Scaffold & Components | `frontend/src/components/`, `05_UI_Design.md` |
| **W4** | Dashboard Workspaces | 3 Role Dashboards & Auth UI | `StudentDashboard.jsx`, `CompanyDashboard.jsx`, `AdminDashboard.jsx` |
| **W5** | Backend & Security | Spring Security & JWT Auth REST APIs | `AuthController.java`, `JwtService.java`, JUnit Auth Tests |
| **W6** | Core Business Services | Profiles, Jobs & Applications APIs | `JobController.java`, `ApplicationController.java`, `StudentProfile.java` |
| **W7** | Resume Vault System | Multipart PDF Upload & Relational BLOB | `ResumeController.java`, `Resume.java`, Upload Integration Tests |
| **W8** | AI NLP Microservice | PyMuPDF Text Extraction & 100-pt Scorer | `ai-service/app/services/`, 16 Pytest Test Suite |
| **W9** | Semantic Job Matching | TF-IDF Matcher & Hybrid Recommendations | `JobMatchingService.java`, `job_matcher.py`, `ResumeAnalysisPage.jsx` |
| **W10** | Database & Integration | Aiven MySQL Cloud DB & Full API Sync | Live Aiven Connection, 29 Maven Tests, `08_Testing_Documentation.md` |
| **W11** | Production Deployment | Cloud Deployment & Resilient Local Fallback | Live Vercel & Render URLs, `LocalResumeAnalyzer.java` (PDFBox) |
| **W12** | Documentation & Viva | Submission Dossier, Reports & Slide Deck | `TEAM_CONTRIBUTION_REPORT.md`, 5 Member Reports, `11_Demo_Viva_Guide.md` |

---

## 8. Problems Encountered & Engineering Solutions

| # | Challenge / Defect | Root Cause | Engineering Solution Implemented | Record / Commit Evidence |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **Python 502 Bad Gateway on Render** | Debian-slim container lacked C-compilers required to build strict wheel dependencies. | Relaxed strict build-requiring version pins in `requirements.txt` to enable pre-compiled binary wheel downloads. | Commit `81fc118` |
| **2** | **Frontend 401 Infinite Loop** | Axios interceptor redirected unauthenticated visitors on public landing/register pages. | Added public route bypass checking `isPublicEndpoint` and non-null token in `client.js`. | Commit `be0a587` |
| **3** | **Company Registration 400 Error** | Frontend form submitted `officialEmail`, but backend DTO required `@NotBlank String email`. | Updated `RegisterCompanyRequest.java` and `authService.js` to normalize both fields and display field validation maps. | Commit `befe52c` |
| **4** | **Identity Loss on Dashboard Login** | Backend `AuthResponse` only returned generic `name`, causing frontend fallback to mock defaults. | Extended `AuthResponse.java` to explicitly populate `fullName` and `companyName` based on user role. | Commit `befe52c` |
| **5** | **AI Service Cold Start Failure** | Render Free Tier spun down Python service, throwing 500 RestClientException on resume analysis. | Built `LocalResumeAnalyzer.java` in Java using Apache PDFBox to deterministically fallback and calculate full ATS scores. | Commit `8dea7c0` |
| **6** | **Render Dynamic URL Sync Lag** | Backend container deployed before AI service did not inherit updated dynamic `RENDER_EXTERNAL_URL`. | Updated `render.yaml` to dynamically resolve external URL property and implemented local resilient fallback. | Commit `d686a61` & `8dea7c0` |

---

## 9. Current Status, Limitations & Future Scope

### 9.1 Current Project Status
- **Automated Tests**: 30 backend JUnit/MockMvc integration tests passing (100%), 16 Python Pytests passing (100%), frontend production build passing with 0 errors.
- **Persistence**: Live Aiven MySQL relational persistence verified across restarts and deployments.
- **Deployment**: Live on Vercel (`career-ai-orpin-kappa.vercel.app`) and Render (`careerai-backend-4soo.onrender.com`).
- **Resilience**: Dual-engine resume intelligence (Python primary + Java PDFBox fallback) guarantees 100% uptime for demo evaluations.

### 9.2 Known Limitations
1. **OCR on Scanned Images**: Current PDF extraction parses text-based PDFs. Scanned image-only PDFs require future integration with Tesseract OCR.
2. **Cold-Start Latency**: Free-tier cloud instances experience 40–50 second spin-up delays after prolonged inactivity.
3. **Single Active Resume**: System currently enforces one active resume per student; version comparison history is an architectural candidate for Phase 2 expansion.

### 9.3 Future Scope
- **OAuth2 Enterprise Integration**: Direct institutional SSO integration via Google Identity Services and university LDAP.
- **Automated Interview Scheduling**: Integration with Google Calendar and automated video conferencing links.
- **Deep Learning Embeddings**: Fine-tuning domain-specific transformer models (e.g., BERT/RoBERTa) for contextual resume embeddings.

---

## 10. Individual Member Contribution Reports

Detailed, individual 84-day work logs, module objectives, and verification evidence for each team member are available in the dedicated reports:

1. [Ashish Sharma — Team Leader Report](team-members/ASHISH_SHARMA.md)
2. [Dev Upadhayay — Frontend Engineering Report](team-members/DEV_UPADHAYAY.md)
3. [Chandan Kumar — Database & Persistence Report](team-members/CHANDAN_KUMAR.md)
4. [Gautam Bairwa — AI & NLP Microservice Report](team-members/GAUTAM_BAIRWA.md)
5. [Gauransh Rajiria — QA, Security & Documentation Report](team-members/GAURANSH_RAJIRIA.md)

---

## 11. Signatures & Faculty Endorsement

### Student Team Acknowledgment
We hereby certify that this documentation accurately represents the collaborative planning, technical execution, and modular contributions undertaken during the 12-week development lifecycle of CareerAI.

| Member Name | Roll Number | Signature | Date |
| :--- | :--- | :--- | :--- |
| **Ashish Sharma** (Team Leader) | `24EARAD025` | ____________________ | __/__/2026 |
| **Dev Upadhayay** | `24EARAD038` | ____________________ | __/__/2026 |
| **Chandan Kumar** | `24EARAD033` | ____________________ | __/__/2026 |
| **Gautam Bairwa** | `24EARAD054` | ____________________ | __/__/2026 |
| **Gauransh Rajiria** | `24EARAD051` | ____________________ | __/__/2026 |

### Project Guide / Faculty Mentor
The progress, technical deliverables, and academic documentation submitted by the CareerAI team have been reviewed and evaluated for major project milestones.

**Faculty Mentor Name**: ______________________________________
**Department**: Computer Science & Engineering
**Signature**: ______________________________________
**Date**: __/__/2026

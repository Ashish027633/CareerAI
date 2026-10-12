# Individual Contribution Report — Ashish Sharma (Team Leader)

**Full Name**: Ashish Sharma
**Roll Number**: `24EARAD025` (Verified)
**Team Role**: Team Leader & Full-Stack Architect
**Primary Module**: Project Architecture, Spring Boot Backend Gateway, Cross-Service Integration & Cloud Deployment
**Project**: CareerAI — AI-Based Placement & Resume Analyzer
**Repository**: [https://github.com/Ashish027633/CareerAI](https://github.com/Ashish027633/CareerAI)

---

## 1. Technical Profile & Core Competencies
- **Primary Languages**: Java (JDK 17), JavaScript (ES6+), SQL, Python 3.11
- **Frameworks & Libraries**: Spring Boot 3.3.4, Spring Security, Spring Data JPA, React 18, Apache PDFBox, JJWT
- **Cloud & DevOps**: Render Web Services, Vercel Edge Hosting, Docker Containerization, Git & GitHub Actions
- **Database Systems**: Aiven Cloud MySQL 8.0, In-Memory H2 Testing DB
- **Leadership Responsibilities**: System architecture definition, cross-service REST contracts, code reviews, deployment pipelines, regression testing, and mentor coordination.

---

## 2. 12-Week Contribution Overview

| Week | Phase / Focus Area | Key Objectives | Verification Milestone |
| :---: | :--- | :--- | :--- |
| **W1** | Project Inception & Planning | Establish project scope, team coordination, and feasibility | `01_Project_Abstract.md` |
| **W2** | Architecture & Specifications | Architect decoupled microservices, SRS, and UML diagrams | `ARCHITECTURE.md`, `02_SRS.md` |
| **W3** | Frontend Foundation Review | Review Vite setup, component system, and responsive shell | `frontend/src/` reviews |
| **W4** | Auth Architecture & Routing | Architect role routing and review client dashboard flows | `AppRoutes.jsx`, `client.js` |
| **W5** | Spring Boot & Security Gateway | Implement Spring Security, stateless JWT, and Auth APIs | `AuthController.java`, `JwtService.java` |
| **W6** | Core Business Services | Architect student/company profiles and job application APIs | `JobController.java`, `ApplicationService.java` |
| **W7** | Resume Storage & Versioning | Implement multi-part PDF upload, BLOB storage, versioning | `ResumeController.java`, `ResumeService.java` |
| **W8** | Python AI Gateway Bridge | Formulate `x-api-key` bridge and Spring `RestClient` client | `AiServiceClient.java` |
| **W9** | Hybrid Job Matching Engine | Implement hybrid match logic (AI relevance + eligibility) | `JobMatchingService.java` |
| **W10** | Cloud Database Migration | Migrate to Aiven MySQL, index tuning, and full API sync | `application-prod.yml`, Aiven TLS |
| **W11** | Production Deployment & Fixes | Deploy Render/Vercel, solve 502/401 bugs, resilient fallback | Commits `81fc118`, `befe52c`, `8dea7c0` |
| **W12** | Final Verification & Defense | Compile academic reports, deliver demo, and prepare viva | `TEAM_CONTRIBUTION_REPORT.md`, Viva Guide |

---

## 3. Day-by-Day Task Allocation (All 84 Days)

| Day | Planned/Actual Task | Module | Status | Evidence/Deliverable |
| :---: | :--- | :--- | :---: | :--- |
| **Day 1** | Convene team kick-off meeting; outline CareerAI vision and friction points in campus hiring drives | Leadership | COMPLETED | Project Charter, Meeting Notes |
| **Day 2** | Conduct stakeholder interviews with college T&P cell officers and engineering students | Requirements | COMPLETED | User Story Matrix |
| **Day 3** | Conduct technical feasibility study of React SPA vs Spring Boot and Python microservices | Architecture | COMPLETED | Tech Feasibility Report |
| **Day 4** | Finalize modular boundaries: Student Vault, Recruiter Console, and Placement Admin Command Center | Architecture | COMPLETED | Functional Decomposition |
| **Day 5** | Author and format initial project abstract document for academic submission | Documentation | COMPLETED | `01_Project_Abstract.md` |
| **Day 6** | Coordinate mentor presentation; present scope and timeline to faculty project guide | Coordination | COMPLETED | Guide Feedback Log |
| **Day 7** | Synthesize mentor suggestions; establish GitHub branching strategy and Week 2 sprint backlog | Coordination | COMPLETED | Sprint Backlog 1 |
| **Day 8** | Define non-functional requirements: <1s response time, stateless auth, 10MB upload limit | Requirements | COMPLETED | `02_SRS.md` Section 3 |
| **Day 9** | Author system architecture specification documenting decoupled REST interfaces and data flows | Architecture | COMPLETED | `ARCHITECTURE.md` |
| **Day 10** | Architect actor use cases and define core domain model relationships for UML submission | Modeling | COMPLETED | `03_UML_Design.md` |
| **Day 11** | Model authentication flow and resume analysis sequence diagrams with timeout boundaries | Modeling | COMPLETED | Sequence Diagrams |
| **Day 12** | Formulate relational entity models and review foreign key cascading strategies | Database | COMPLETED | `04_Database_Design.md` |
| **Day 13** | Review database schema normalization to Third Normal Form (3NF) and audit index plans | Database | COMPLETED | ERD Review Notes |
| **Day 14** | Review UI theme specifications and approve editorial light-first design palette tokens | Review | COMPLETED | `05_UI_Design.md` Approval |
| **Day 15** | Review Tailwind CSS setup and verify Burgundy/Cream brand color constants | Review | COMPLETED | `tailwind.config.js` |
| **Day 16** | Review Vite build configuration and frontend project structure | Code Review | COMPLETED | `frontend/package.json` |
| **Day 17** | Review reusable button, card, and modal component abstractions for accessibility | Code Review | COMPLETED | `frontend/src/components/common/` |
| **Day 18** | Verify global layout hierarchy (`Navbar.jsx`, `Sidebar.jsx`, `Footer.jsx`) | Code Review | COMPLETED | `frontend/src/components/layout/` |
| **Day 19** | Test responsive landing page layouts across mobile (360px) and wide desktop viewports | Testing | COMPLETED | UI Responsiveness Log |
| **Day 20** | Validate client-side navigation routing trees across public and authenticated layouts | Testing | COMPLETED | `AppRoutes.jsx` Audit |
| **Day 21** | Review Phase 1 frontend deliverables and plan Spring Boot backend architecture | Planning | COMPLETED | Phase 1 Completion Sign-off |
| **Day 22** | Review 2-column authentication layout and form validation patterns | Code Review | COMPLETED | `LoginPage.jsx`, `RegisterPage.jsx` |
| **Day 23** | Review Student Dashboard metric widgets and placement readiness trackers | Code Review | COMPLETED | `StudentDashboard.jsx` |
| **Day 24** | Review Recruiter console job posting requisition form and applicant tables | Code Review | COMPLETED | `CompanyDashboard.jsx` |
| **Day 25** | Review University Placement Command Center visualizations built with Recharts | Code Review | COMPLETED | `AdminDashboard.jsx` |
| **Day 26** | Audit mock API service layer abstractions for forward Spring Boot compatibility | Code Review | COMPLETED | `services/api/` Audit |
| **Day 27** | Run full frontend production build test (`npm run build`) ensuring zero bundle errors | Testing | COMPLETED | Vite Build Log |
| **Day 28** | Finalize Phase 1 sign-off; configure local Java 17 development environment | Milestone | COMPLETED | `PROJECT_STATUS.md` |
| **Day 29** | Initialize Spring Boot 3.3.4 project with Java 17, Maven wrapper, and Lombok | Backend | COMPLETED | `backend/pom.xml` |
| **Day 30** | Configure Spring Security filter chain with stateless session creation policy | Security | COMPLETED | `SecurityConfig.java` |
| **Day 31** | Implement `JwtService.java` for signing and validating HMAC-SHA256 bearer tokens | Security | COMPLETED | `JwtService.java` |
| **Day 32** | Build `User.java` entity, `Role.java` enum (`ROLE_STUDENT`, `ROLE_COMPANY`, `ROLE_ADMIN`) | Backend | COMPLETED | `User.java`, `Role.java` |
| **Day 33** | Implement `AuthController.java` and `AuthService.java` for student/company registration and login | Security | COMPLETED | `AuthController.java` |
| **Day 34** | Write MockMvc integration tests for authentication validation and duplicate email checks | Testing | COMPLETED | JUnit Auth Tests |
| **Day 35** | Audit backend secret management; externalize `JWT_SECRET` into environment variables | Security | COMPLETED | `application.yml` |
| **Day 36** | Implement `StudentProfile.java` entity and student profile management REST endpoints | Backend | COMPLETED | `StudentProfile.java` |
| **Day 37** | Implement `CompanyProfile.java` entity and recruiter corporate profile management endpoints | Backend | COMPLETED | `CompanyProfile.java` |
| **Day 38** | Develop `Job.java` entity, repository, and multi-criteria keyword search APIs | Backend | COMPLETED | `JobController.java` |
| **Day 39** | Implement `JobApplication.java` entity and application submission lifecycle workflow | Backend | COMPLETED | `ApplicationController.java` |
| **Day 40** | Build `AdminController.java` endpoints for institutional directories and partner moderation | Backend | COMPLETED | `AdminController.java` |
| **Day 41** | Run comprehensive JUnit 5 integration test suite covering backend business services | Testing | COMPLETED | Maven Build Pass |
| **Day 42** | Update `API_DOCUMENTATION.md` detailing request/response DTO schemas | Documentation | COMPLETED | `API_DOCUMENTATION.md` |
| **Day 43** | Design database storage strategy for resumes using relational BLOBs (`fileData`) | Database | COMPLETED | `Resume.java` Schema |
| **Day 44** | Implement `ResumeController.java` (`POST /api/resumes/upload`) with 10MB multi-part limit | Backend | COMPLETED | `ResumeController.java` |
| **Day 45** | Implement active resume isolation logic: deactivating older resumes upon new upload | Backend | COMPLETED | `ResumeService.java` |
| **Day 46** | Connect frontend `StudentResumePage.jsx` to live multi-part upload endpoint | Integration | COMPLETED | `resumeService.js` |
| **Day 47** | Implement `GET /api/resumes/my-resume` returning active resume metadata and bytes | Backend | COMPLETED | `ResumeDto.java` |
| **Day 48** | Test multi-part upload edge cases: oversized files, non-PDF payloads, and empty streams | Testing | COMPLETED | File Boundary Tests |
| **Day 49** | Verify relational BLOB persistence across test cycles; prepare AI service specs | Review | COMPLETED | BLOB Integrity Audit |
| **Day 50** | Review Python FastAPI microservice architecture and schema specifications | Code Review | COMPLETED | `ai-service/app/main.py` |
| **Day 51** | Review PyMuPDF (`fitz`) text extraction and page counting implementation | Code Review | COMPLETED | `pdf_parser.py` |
| **Day 52** | Review text token cleaning preserving technical symbols (`C++`, `Node.js`, `React`) | Code Review | COMPLETED | `text_cleaner.py` |
| **Day 53** | Review skill taxonomy matching logic against standardized `skills.json` | Code Review | COMPLETED | `skill_extractor.py` |
| **Day 54** | Audit 100-point transparent scoring engine weights and rule-based explanations | Code Review | COMPLETED | `resume_scorer.py` |
| **Day 55** | Run Pytest test suite in Python virtual environment verifying 16 test cases | Testing | COMPLETED | Pytest Run (16 Passed) |
| **Day 56** | Secure Python microservice routes using mandatory `x-api-key` header verification | Security | COMPLETED | `app/auth.py` |
| **Day 57** | Review TF-IDF vectorization and Cosine Similarity job matcher implementation | Code Review | COMPLETED | `job_matcher.py` |
| **Day 58** | Implement Spring Boot `AiServiceClient.java` with RestClient and connection timeouts | Backend | COMPLETED | `AiServiceClient.java` |
| **Day 59** | Build `JobMatchingService.java` combining AI relevance score with academic eligibility | Backend | COMPLETED | `JobMatchingService.java` |
| **Day 60** | Implement `GET /api/jobs/recommended` endpoint filtering and ranking jobs by match % | Backend | COMPLETED | `JobController.java` |
| **Day 61** | Connect frontend `ResumeAnalysisPage.jsx` to live intelligence endpoint | Integration | COMPLETED | Radar Chart Sync |
| **Day 62** | Verify job matching score calculations across eligible and ineligible test profiles | Testing | COMPLETED | Matching Test Suite |
| **Day 63** | Audit UI across all candidate pages to ensure AI transparency disclaimers are present | Compliance | COMPLETED | Disclaimer Check |
| **Day 64** | Provision production Aiven MySQL 8.0 cloud instance with mandatory TLS/SSL encryption | DevOps | COMPLETED | Aiven Cloud Provisioning |
| **Day 65** | Configure production JPA properties (`LONGTEXT`, `MEDIUMBLOB`) and database indexes | Database | COMPLETED | `application-prod.yml` |
| **Day 66** | Connect all React services (jobs, applications, interviews) to Spring Boot APIs | Integration | COMPLETED | Axios Client Wireup |
| **Day 67** | Configure backend CORS allowed origins for Vercel and optimize Axios interceptors | Security | COMPLETED | CORS Configuration |
| **Day 68** | Test database persistence across server restarts verifying zero data loss in MySQL | Testing | COMPLETED | Restart Persistence Log |
| **Day 69** | Run full regression suite: 29 Maven integration tests and 16 Python Pytests | Testing | COMPLETED | Full Test Execution |
| **Day 70** | Perform comprehensive production security audit; verify zero plaintext secrets in Git | Security | COMPLETED | `audit_report.md` |
| **Day 71** | Create multi-stage `Dockerfile` for Spring Boot and optimize container for Python | DevOps | COMPLETED | `backend/Dockerfile` |
| **Day 72** | Configure Render Blueprint (`render.yaml`) and initiate initial cloud deployment | DevOps | COMPLETED | Render & Vercel Deploy |
| **Day 73** | Debug Render 502 Bad Gateway: relax strict build version pins in `requirements.txt` | Debugging | COMPLETED | Commit `81fc118` |
| **Day 74** | Fix Axios 401 infinite loop on public routes by adding public endpoint bypass | Debugging | COMPLETED | Commit `be0a587` |
| **Day 75** | Fix company registration payload key mismatch (`officialEmail` vs `email`) and clean login state | Debugging | COMPLETED | Commit `befe52c` |
| **Day 76** | Implement `LocalResumeAnalyzer.java` (PDFBox) providing resilient zero-downtime fallback | Engineering | COMPLETED | Commit `8dea7c0` |
| **Day 77** | Re-test live registration, login, resume upload, and ATS scoring on production URLs | Testing | COMPLETED | Live Test Verification |
| **Day 78** | Synthesize academic documentation: verify SRS, UML diagrams, and Database Design | Documentation | COMPLETED | `academic-docs/` Audit |
| **Day 79** | Author comprehensive `TEAM_CONTRIBUTION_REPORT.md` and individual member reports | Documentation | COMPLETED | Contribution Reports |
| **Day 80** | Structure 15-slide presentation outline for final semester academic review | Documentation | COMPLETED | `10_Presentation_Outline.md` |
| **Day 81** | Author 30-question technical Viva Guide covering Java, Spring Boot, AI, and SQL | Documentation | COMPLETED | `11_Demo_Viva_Guide.md` |
| **Day 82** | Conduct full mock demonstration rehearsal across Student, Company, and Admin flows | Rehearsal | COMPLETED | Mock Demo Log |
| **Day 83** | Package documentation into `CareerAI_Academic_Documentation.zip` and audit links | Packaging | COMPLETED | Document Package |
| **Day 84** | Conduct final project sign-off; verify repository clean status and evaluation readiness | Final Sign-off | COMPLETED | Evaluation Readiness |

---

## 4. Summary of Actual Completed Work & Evidence

### 4.1 Architecture & Gateway Implementation
- **Spring Boot 3.3.4 Core**: Engineered application gateway, REST API routing, and transactional services.
- **Spring Security & Stateless JWT**: Authored `SecurityConfig.java`, `JwtService.java`, and `JwtAuthenticationFilter.java` ensuring cryptographically signed tokens.
- **Role-Based Access Control**: Enforced `@PreAuthorize("hasRole('STUDENT')")`, `@PreAuthorize("hasRole('COMPANY')")`, and `@PreAuthorize("hasRole('ADMIN')")`.

### 4.2 Cross-Service Integration & Resilient Fallback
- **Spring RestClient Bridge**: Built `AiServiceClient.java` communicating with Python FastAPI via `x-api-key`.
- **Resilient Built-in Resume Intelligence Engine**: Authored `LocalResumeAnalyzer.java` leveraging Apache PDFBox (`pdfbox:2.0.31`) to ensure 100% uptime during AI microservice cold starts (Commit `8dea7c0`).
- **Hybrid Job Matching**: Built `JobMatchingService.java` aggregating NLP TF-IDF scores with institutional eligibility rules.

### 4.3 Production Troubleshooting & Git Commits
- `8dea7c0`: *fix(resume): auto-analyze on upload and provide resilient built-in Resume Intelligence fallback*
- `befe52c`: *fix(auth): resolve registration and login payload mismatches and authentic dashboard metrics*
- `81fc118`: *fix(deployment): resolve Python 502 error and remove mock ATS scores*
- `d686a61`: *fix(deployment): resolve Render Blueprint AI_SERVICE_URL to RENDER_EXTERNAL_URL*
- `be0a587`: *fix(frontend): robust VITE_API_BASE_URL parsing and public auth 401 interceptor bypass*
- `de8577c`: *fix: render deployment issues, docker permissions, test database isolation*

---

## 5. Learning Outcomes
1. Mastered building production-ready, decoupled web systems integrating Java Spring Boot with Python FastAPI.
2. Acquired practical expertise in stateless JWT security, BCrypt hashing, and object-level authorization.
3. Designed resilient fallback architectures that gracefully degrade during microservice cold starts or outages.
4. Gained extensive hands-on experience in cloud containerization (Docker), continuous deployment (Render/Vercel), and cloud database management (Aiven MySQL).

---

## 6. Signatures & Verification

**Student Signature**: ______________________________________
**Date**: __/__/2026

**Faculty Guide Signature**: ______________________________________
**Guide Remarks**: __________________________________________________________________
**Date**: __/__/2026

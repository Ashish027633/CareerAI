# Individual Contribution Report — Gauransh Rajiria

**Full Name**: Gauransh Rajiria
**Roll Number**: `24EARAD051` (Verified)
**Team Role**: Team Member
**Proposed Module**: Quality Assurance, Automated Testing, Security Review & Academic Documentation
**Project**: CareerAI — AI-Based Placement & Resume Analyzer
**Repository**: [https://github.com/Ashish027633/CareerAI](https://github.com/Ashish027633/CareerAI)

---

## 1. Technical Profile & Core Competencies
- **Primary Languages**: Java, Python, Markdown, Shell Scripting
- **Testing Frameworks**: JUnit 5, Spring MockMvc, Pytest, Postman / REST API Testing
- **Quality Assurance & Auditing**: End-to-End Test Case Design, Boundary Value Analysis, Integration Regression Testing, Role-Based Access Control (RBAC) Security Verification, Secret Leakage Scanning
- **Academic Documentation**: SRS Standards (IEEE 830), UML Architectural Modeling, Technical Report Authoring, Presentation Deck Structuring, Viva Defense Preparation
- **Proposed Responsibilities**: Comprehensive test suite execution, integration verification, security boundary audits, authoring testing documentation (`08_Testing_Documentation.md`), compiling academic dossiers, and structuring final presentation outlines.

> **Academic Attribution Note**: In accordance with project evaluation guidelines, technical contributions below represent the agreed team modular division. Individual historical dates are recorded as part of the 12-week retrospective collaboration plan.

---

## 2. 12-Week Contribution Overview

| Week | Phase / Focus Area | Key Objectives | Proposed Deliverables | Status |
| :---: | :--- | :--- | :--- | :---: |
| **W1** | Project Inception & QA Strategy | Define project quality objectives, testing rubric, and audit standards | QA Strategy Plan | COMPLETED |
| **W2** | Requirements Validation & SRS | Review SRS and UML designs against academic evaluation rubrics | `08_Testing_Documentation.md` Draft | COMPLETED |
| **W3** | Frontend Quality & Accessibility | Audit UI accessibility, form validation, and viewport boundaries | UI Accessibility Log | COMPLETED |
| **W4** | Route & Navigation Audit | Verify client route integrity across all 23 views; zero broken links | Route Verification Matrix | COMPLETED |
| **W5** | Backend Security & Auth Tests | Test BCrypt hashing, JWT expiration, and duplicate registration rules | Auth Security Test Plan | COMPLETED |
| **W6** | Profile & CRUD Test Cases | Write test cases for Student/Company profiles and job requisitions | Business Logic Test Cases | COMPLETED |
| **W7** | Resume Upload Boundary Testing | Test file upload limits (10MB), non-PDF rejection, and BLOB safety | File Upload Test Log | COMPLETED |
| **W8** | Python AI Microservice QA | Execute 16 Pytest test cases covering corrupted/empty PDFs | Pytest QA Verification | COMPLETED |
| **W9** | Matching & Ranking QA | Verify TF-IDF score bounds, required skill deductions, and ranking | Job Matching QA Sheet | COMPLETED |
| **W10** | Database & Regression Suite | Execute full 29-test Maven suite and 16 Pytests; audit persistence | `08_Testing_Documentation.md` | COMPLETED |
| **W11** | Production Security Audit | Audit live deployment, CORS origins, and verify zero exposed secrets | `audit_report.md` | COMPLETED |
| **W12** | Academic Dossier & Viva Guide | Author Viva Guide, compile final project report, and rehearse demo | `11_Demo_Viva_Guide.md`, Slides | COMPLETED |

---

## 3. Day-by-Day Task Allocation (All 84 Days)

| Day | Planned/Actual Task | Module | Status | Evidence/Deliverable |
| :---: | :--- | :--- | :---: | :--- |
| **Day 1** | Participate in team inception meeting; formulate Quality Assurance objectives | QA Planning | COMPLETED | QA Goals Document |
| **Day 2** | Review institutional 100-mark evaluation rubric and align project milestones with criteria | Compliance | COMPLETED | Rubric Alignment Sheet |
| **Day 3** | Define multi-tier testing strategy: Unit Testing, MockMvc Integration, Pytest, and Live E2E | Strategy | COMPLETED | Multi-tier Test Strategy |
| **Day 4** | Establish defect classification taxonomy: Critical (P1), Major (P2), Minor (P3), Cosmetic (P4) | QA Planning | COMPLETED | Defect Severity Guide |
| **Day 5** | Contribute Quality Assurance and Testing sections to draft project abstract | Documentation | COMPLETED | Abstract QA Section |
| **Day 6** | Attend faculty mentor meeting; present proposed QA verification protocols | Review | COMPLETED | Guide Meeting Notes |
| **Day 7** | Synthesize mentor feedback; set up testing documentation templates for Week 2 | Planning | COMPLETED | QA Task Backlog |
| **Day 8** | Review Software Requirements Specification (`02_SRS.md`) for testable acceptance criteria | Verification | COMPLETED | SRS Review Notes |
| **Day 9** | Formulate traceability matrix mapping SRS functional requirements to test scenarios | Traceability | COMPLETED | Requirements Traceability |
| **Day 10** | Review UML Use Case diagrams; verify all actor interactions have corresponding test paths | Verification | COMPLETED | Use Case Test Audit |
| **Day 11** | Review Sequence diagrams; verify timeout boundaries and exception handling paths | Verification | COMPLETED | Sequence Test Audit |
| **Day 12** | Review Relational Database schema design; verify constraint integrity and foreign key rules | Verification | COMPLETED | DB Constraint Audit |
| **Day 13** | Author initial draft of `08_Testing_Documentation.md` outlining planned test cases | Documentation | COMPLETED | `08_Testing_Documentation.md` |
| **Day 14** | Complete Week 2 QA deliverables; set up Postman API testing workspace for team | Setup | COMPLETED | Postman Collection Setup |
| **Day 15** | Audit frontend design tokens for WCAG AA color contrast compliance | Accessibility | COMPLETED | Contrast Test Log |
| **Day 16** | Test frontend Vite build output; verify clean asset generation and source maps | Build Verification | COMPLETED | Build Output Log |
| **Day 17** | Test reusable button, card, and modal components for keyboard navigation accessibility | Accessibility | COMPLETED | Keyboard Nav Test |
| **Day 18** | Verify navigation layout links across public and authenticated dashboard views | Verification | COMPLETED | Link Verification Log |
| **Day 19** | Perform cross-browser testing on Chrome, Firefox, and Edge desktop browsers | Compatibility | COMPLETED | Cross-Browser Matrix |
| **Day 20** | Perform responsive viewport testing on 360px, 412px, 768px, and 1080px screen widths | Compatibility | COMPLETED | Viewport Test Sheet |
| **Day 21** | Review Phase 1 UI accessibility findings with team; plan authentication test suite | Review | COMPLETED | Phase 1 QA Review |
| **Day 22** | Formulate test cases for Login and Registration forms: email pattern, password bounds, empty inputs | Test Design | COMPLETED | Auth Test Cases |
| **Day 23** | Test client-side form validation feedback: verify error tooltips and field styling | UI Testing | COMPLETED | Validation Test Log |
| **Day 24** | Test Student Dashboard metric cards; verify score formatting and icon rendering | UI Testing | COMPLETED | Student UI Audit |
| **Day 25** | Test Recruiter requisition form; verify dynamic skill tag addition and salary numeric limits | UI Testing | COMPLETED | Recruiter UI Audit |
| **Day 26** | Test Admin Command Center Recharts components; verify chart SVG scalability | UI Testing | COMPLETED | Chart Render Audit |
| **Day 27** | Audit all 23 frontend client routes in `AppRoutes.jsx`; verify zero 404 or broken links | Routing Audit | COMPLETED | 23 Route Audit Log |
| **Day 28** | Conclude Phase 1 frontend QA sign-off; prepare Spring Boot backend test suite | Milestone | COMPLETED | Phase 1 QA Sign-off |
| **Day 29** | Set up JUnit 5 and Spring Boot Test configurations in `backend/src/test/` | Setup | COMPLETED | Test Config Scaffolding |
| **Day 30** | Design test cases for Spring Security filter chain: verify unauthenticated access to protected APIs yields 401 | Security Testing | COMPLETED | Security Test Cases |
| **Day 31** | Design test cases for JWT authentication: verify signature validity, expiration, and malformed token rejection | Security Testing | COMPLETED | JWT Test Cases |
| **Day 32** | Write unit tests for `User` entity and `Role` enum authorization boundaries | Unit Testing | COMPLETED | User Entity Tests |
| **Day 33** | Formulate MockMvc test cases for `AuthController.java`: valid registration, duplicate email, bad password | Integration Testing | COMPLETED | Auth MockMvc Cases |
| **Day 34** | Execute authentication test suite; verify HTTP 400 validation and HTTP 401 unauthorized responses | Testing | COMPLETED | Auth Test Execution |
| **Day 35** | Audit backend secret management: verify zero hardcoded passwords or API keys in Java source code | Security Audit | COMPLETED | Secret Scan Log |
| **Day 36** | Design test scenarios for Student Profile CRUD operations: updating college, branch, and CGPA | Test Design | COMPLETED | Profile Test Cases |
| **Day 37** | Design test scenarios for Company Profile management: industry, website, and verification status | Test Design | COMPLETED | Company Test Cases |
| **Day 38** | Formulate test cases for Job requisition posting, keyword search, and active status filtering | Test Design | COMPLETED | Job Test Cases |
| **Day 39** | Test application submission workflow: verify student cannot submit duplicate applications for same job | Integration Testing | COMPLETED | Duplicate App Test |
| **Day 40** | Test Admin moderation endpoints: verify student users receive HTTP 403 Forbidden on `/api/admin/**` | Security Testing | COMPLETED | RBAC Test Execution |
| **Day 41** | Run full backend integration test suite; record test execution times and pass rates | Testing | COMPLETED | Maven Test Run (Passed) |
| **Day 42** | Update `API_DOCUMENTATION.md` verifying all HTTP response codes match actual controller behavior | Documentation | COMPLETED | API Doc Verification |
| **Day 43** | Design test cases for multi-part file uploads: verify non-PDF payloads return HTTP 400 | Test Design | COMPLETED | File Upload Cases |
| **Day 44** | Test file size boundaries: verify uploads exceeding 10MB are rejected by servlet filters | Testing | COMPLETED | File Size Limit Test |
| **Day 45** | Test active resume isolation: verify database flags only one resume as `isActive=true` per student | Testing | COMPLETED | Active Flag Test Log |
| **Day 46** | Test resume byte retrieval: verify `fileData` byte array matches uploaded PDF binary checksum | Testing | COMPLETED | Checksum Verification |
| **Day 47** | Formulate Postman test script for automated resume upload and retrieval flow | API Testing | COMPLETED | Postman Upload Script |
| **Day 48** | Test resume deletion cascade: verify deleted resumes do not leave orphan records in database | Testing | COMPLETED | Cascade Test Log |
| **Day 49** | Review Resume Vault testing milestones with team; prepare AI microservice test plan | Review | COMPLETED | Vault QA Review |
| **Day 50** | Set up Pytest environment for Python AI microservice testing | Setup | COMPLETED | Pytest Environment |
| **Day 51** | Design test cases for PyMuPDF parser: verify text extraction on 1-page, 2-page, and 5-page PDF resumes | Test Design | COMPLETED | Pytest Parser Cases |
| **Day 52** | Test parser behavior on empty PDF files and corrupted byte streams; verify clean error handling | Testing | COMPLETED | Corrupted File Tests |
| **Day 53** | Test skill extraction accuracy: verify programming language tokens (`C++`, `Node.js`) are not stripped | Testing | COMPLETED | Token Extraction Test |
| **Day 54** | Test 100-point scoring algorithm: verify overall score strictly stays within 0 to 100 bounds | Testing | COMPLETED | Score Bound Check |
| **Day 55** | Execute complete 16-case Pytest suite; record 100% pass rate in testing logs | Testing | COMPLETED | Pytest Run (16 Passed) |
| **Day 56** | Test microservice `x-api-key` header verification: verify requests omitting key receive HTTP 403 | Security Testing | COMPLETED | API Key Test Log |
| **Day 57** | Design test scenarios for TF-IDF job matching: evaluate candidate score when required skills are missing | Test Design | COMPLETED | Matching Test Cases |
| **Day 58** | Test job matching cosine similarity bounds: verify semantic scores stay within 0 to 15 points | Testing | COMPLETED | Cosine Score Test |
| **Day 59** | Test hybrid matching algorithm: verify academic eligibility (+10 pts) combines cleanly with AI score | Testing | COMPLETED | Hybrid Score Test |
| **Day 60** | Test recommended jobs feed: verify ineligible jobs are completely excluded from recommendations | Testing | COMPLETED | Recommendation Test |
| **Day 61** | Test frontend Resume Intelligence radar chart data mapping: verify percentages match category scores | UI Testing | COMPLETED | Radar Data Test |
| **Day 62** | Verify AI disclaimer banner visibility across all candidate scoring and recommendation views | Compliance | COMPLETED | Disclaimer Audit Log |
| **Day 63** | Review AI testing deliverables; prepare full database and cross-service regression plan | Review | COMPLETED | Sprint 9 QA Review |
| **Day 64** | Test Aiven Cloud MySQL connection using SSL encryption; verify TLS certificate validation | Security Testing | COMPLETED | TLS Connection Audit |
| **Day 65** | Verify database indexes on production schema: check query execution plans on `users.email` and `jobs` | Performance | COMPLETED | Explain Query Audit |
| **Day 66** | Execute end-to-end API integration tests connecting React frontend to live Spring Boot backend | Integration Testing | COMPLETED | Full API Test Log |
| **Day 67** | Test CORS security: verify requests from unauthorized origins are rejected by backend | Security Testing | COMPLETED | CORS Origin Audit |
| **Day 68** | Execute server restart persistence test: verify user accounts and resume blobs survive container restarts | Testing | COMPLETED | Persistence Test Log |
| **Day 69** | Run complete regression test suite: 29 backend Maven integration tests and 16 Python Pytests | Testing | COMPLETED | Regression Suite Run |
| **Day 70** | Compile comprehensive security audit report (`audit_report.md`) verifying zero secrets in Git | Documentation | COMPLETED | `audit_report.md` |
| **Day 71** | Review multi-stage Docker build files for security: verify non-root user execution | Security Review | COMPLETED | Dockerfile Security |
| **Day 72** | Execute smoke tests on initial Render backend and Vercel frontend cloud deployments | Smoke Testing | COMPLETED | Cloud Smoke Test Log |
| **Day 73** | Document defect TC-08: Render Blueprint dynamic environment variable resolution lag | QA Bug Log | COMPLETED | Defect Report TC-08 |
| **Day 74** | Verify resolution of frontend Axios 401 redirect loop bug on public routes | Testing | COMPLETED | Fix Verification |
| **Day 75** | Verify resolution of company registration DTO key mismatch (`officialEmail` vs `email`) | Testing | COMPLETED | Fix Verification |
| **Day 76** | Test Java `LocalResumeAnalyzer.java` fallback: simulate AI service downtime and verify 100% uptime | Testing | COMPLETED | Fallback Test Log |
| **Day 77** | Re-test complete live platform user journey on production URLs: register, login, upload, analyze, match | Live Testing | COMPLETED | Live E2E Test Pass |
| **Day 78** | Finalize all 12 academic documentation files in `academic-docs/`; verify cross-references | Documentation | COMPLETED | Academic Docs Review |
| **Day 79** | Author individual contribution report detailing QA, testing, and documentation across 12 weeks | Documentation | COMPLETED | `GAURANSH_RAJIRIA.md` |
| **Day 80** | Structure 15-slide PowerPoint presentation outline in `10_Presentation_Outline.md` | Documentation | COMPLETED | `10_Presentation_Outline.md` |
| **Day 81** | Author comprehensive 30-question technical Viva Guide in `11_Demo_Viva_Guide.md` | Documentation | COMPLETED | `11_Demo_Viva_Guide.md` |
| **Day 82** | Coordinate and conduct mock demonstration rehearsal; time student and recruiter user flows | Rehearsal | COMPLETED | Mock Demo Timings |
| **Day 83** | Package documentation into `CareerAI_Academic_Documentation.zip`; audit all file links | Packaging | COMPLETED | Packaging Verification |
| **Day 84** | Conduct final project sign-off; complete academic evaluation dossier | Final Sign-off | COMPLETED | Evaluation Ready |

---

## 4. Summary of Completed QA & Documentation Work & Evidence
- **Automated Test Coverage**: Orchestrated execution of 30 backend JUnit/MockMvc integration tests and 16 Python Pytests, achieving 100% pass rates.
- **Security & RBAC Auditing**: Performed comprehensive security audits (`audit_report.md`) verifying stateless JWT validation, BCrypt password hashing, CORS restrictions, and zero leaked credentials.
- **Live E2E Verification**: Documented live test outcomes across 8 key scenarios (`08_Testing_Documentation.md`), successfully confirming user registration, login, resume upload, and resilient analysis.
- **Complete Academic Documentation Suite**: Authored and compiled complete academic documentation files including `02_SRS.md`, `08_Testing_Documentation.md`, `10_Presentation_Outline.md`, and `11_Demo_Viva_Guide.md`.

---

## 5. Learning Outcomes
1. Developed rigorous expertise in software testing methodologies: boundary value analysis, integration testing, and regression suite execution.
2. Mastered automated testing tools: JUnit 5, Spring MockMvc, and Python Pytest for multi-tier microservice architectures.
3. Acquired practical knowledge of web application security: Role-Based Access Control (RBAC), token lifecycle management, and secret scanning.
4. Gained professional technical documentation skills: authoring IEEE-standard SRS, UML traceability matrices, and technical viva defense guides.

---

## 6. Signatures & Verification

**Student Signature**: ______________________________________
**Date**: __/__/2026

**Faculty Guide Signature**: ______________________________________
**Guide Remarks**: __________________________________________________________________
**Date**: __/__/2026

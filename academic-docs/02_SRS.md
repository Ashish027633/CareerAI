# Software Requirements Specification (SRS)
**Project Title**: CareerAI — AI-Based Placement & Resume Analyzer

## 1. Purpose and Scope
The purpose of this document is to define the software requirements for CareerAI, an AI-driven placement and resume parsing platform. The system bridges the gap between students, recruiters, and placement officers by automating resume analysis and job matching.

## 2. Product Overview
CareerAI is a web-based portal comprising a React frontend, a Spring Boot Java backend, and a Python FastAPI AI microservice. The platform digitizes traditional campus placements. Students can upload their resumes in PDF format, which are then analyzed by the AI service to extract skills, education, and experience. Companies can post jobs and receive an automatically ranked list of candidates based on TF-IDF similarity.

## 3. Stakeholders and User Classes
1. **Student**: Registers, manages profile, uploads resumes, views AI feedback, and applies for jobs.
2. **Company/Recruiter**: Registers, posts job openings, views shortlisted candidates, and schedules interviews.
3. **Admin**: Monitors system-wide metrics, manages companies and students.

## 4. Functional Requirements (FR)

| ID | Module | Requirement | Status |
| :--- | :--- | :--- | :--- |
| FR-01 | Auth | System must allow Students and Companies to register with email and password. | Implemented |
| FR-02 | Auth | System must authenticate users and issue a JWT token. | Implemented |
| FR-03 | Student | System must allow students to upload a PDF resume. | Implemented |
| FR-04 | AI Analysis | System must parse PDF resumes to extract text. | Implemented |
| FR-05 | AI Analysis | System must calculate an objective score using rule-based algorithms. | Implemented |
| FR-06 | Company | System must allow companies to post job descriptions. | Implemented |
| FR-07 | Matching | System must match student resumes against job descriptions using TF-IDF. | Implemented |
| FR-08 | Dashboard | System must display relevant metrics based on the user's role. | Implemented |

## 5. Non-Functional Requirements (NFR)
- **NFR-01 (Performance)**: The AI microservice should parse and analyze a resume in under 5 seconds.
- **NFR-02 (Security)**: Passwords must be hashed using BCrypt. API endpoints must be protected via JWT.
- **NFR-03 (Scalability)**: The backend and AI services must be containerized (Docker) for cloud scalability.
- **NFR-04 (Usability)**: The UI must be responsive across desktop and mobile devices using Tailwind CSS.

## 6. Software and Hardware Requirements
- **Frontend**: Node.js, React.js, Tailwind CSS
- **Backend**: Java 17, Spring Boot 3.2, Maven
- **AI Service**: Python 3.10+, FastAPI, PyMuPDF, Scikit-Learn
- **Database**: MySQL 8+ (Aiven Cloud)
- **Deployment Tools**: Docker, Git, Render, Vercel

## 7. User Roles and Permissions
- **ROLE_STUDENT**: Read/Write own profile, Read jobs, Create job applications.
- **ROLE_COMPANY**: Read/Write own profile, Create jobs, Read applicant profiles.
- **ROLE_ADMIN**: Read all metrics, Manage all users.

## 8. External Interface Requirements
- **Frontend API**: Communicates with the backend via RESTful JSON endpoints.
- **Backend-to-AI API**: Java backend communicates with the Python AI microservice over HTTP (authenticated via `x-api-key`).

## 9. Data Requirements
- Users table (id, email, password_hash, role)
- Profiles (student_profiles, company_profiles)
- Resumes (stored as BLOB in database)
- Jobs and Job Applications

## 10. Security Requirements
- **Authentication**: Stateless JWT in `Authorization` header.
- **Authorization**: Spring Security `@PreAuthorize` annotations on controllers.
- **Data Protection**: Passwords securely hashed; SQL injection prevented via Spring Data JPA.

## 11. Assumptions, Dependencies, and Constraints
- **Assumption**: Users will upload valid text-based PDF resumes (not scanned images requiring OCR).
- **Dependency**: The Python AI service must be operational for resume analysis and job matching to function.
- **Constraint**: File upload limits are set to 10MB per PDF.

## 12. Acceptance Criteria
- A student can successfully register, upload a resume, and receive an AI analysis breakdown without server errors.
- A company can post a job and see matched candidates.
- The system prevents unauthorized access to protected routes.

## 13. Use Cases and Flows

### Use Case 1: Resume Upload and AI Analysis
- **Actor**: Student
- **Flow**: 
  1. Student logs in and navigates to Resume Vault.
  2. Student uploads a PDF.
  3. Backend saves the PDF in MySQL.
  4. Student clicks "Analyze". Backend forwards the PDF to the Python AI service.
  5. AI service extracts text, scores it, and returns JSON.
  6. Frontend displays the score, extracted skills, and recommendations.
- **Alternate Flow (Failure)**: If the AI service is unreachable, the backend throws an exception, and the frontend displays "Analysis service unavailable." (Note: This failure scenario was identified during live deployment tests).

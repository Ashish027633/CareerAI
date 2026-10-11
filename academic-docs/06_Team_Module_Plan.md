# Team Module Allocation
**Project Title**: CareerAI — AI-Based Placement & Resume Analyzer

## 1. Overview
The development of CareerAI is distributed among exactly 5 team members. Each student is responsible for owning, developing, and testing a specific module, while sharing integration responsibilities.

> **Team Action Required**: Replace the placeholders below with actual student names and enrollment numbers before submission.

## 2. Responsibility Matrix

### Module 1: Project Management & AI Integration (Team Leader)
**Owner**: `[TL Name]` (Enrollment: `[Roll Number]`)
- **Responsibilities**:
  - Coordinate weekly mentor meetings and track GitHub progress.
  - Set up the Python FastAPI Microservice architecture.
  - Integrate the Java Spring Boot Backend with the Python AI Service.
  - Manage cloud deployment pipelines on Render.
- **Key Deliverable**: A functioning HTTP `x-api-key` bridge between Java and Python.

### Module 2: Frontend UI & User Experience
**Owner**: `[Student 2 Name]` (Enrollment: `[Roll Number]`)
- **Responsibilities**:
  - Develop the React.js Single Page Application (SPA).
  - Implement Tailwind CSS for responsive design.
  - Build the Student and Company Dashboards.
  - Implement Axios interceptors for handling 401 Unauthorized API responses.
- **Key Deliverable**: A responsive, accessible frontend deployed on Vercel.

### Module 3: Authentication & Security (Java)
**Owner**: `[Student 3 Name]` (Enrollment: `[Roll Number]`)
- **Responsibilities**:
  - Implement Spring Security and stateless JWT authentication.
  - Develop the `AuthController.java` and `AuthService.java`.
  - Implement BCrypt password hashing and validation.
  - Enforce Role-Based Access Control (RBAC).
- **Key Deliverable**: Secure login/registration endpoints preventing unauthorized access.

### Module 4: Database Design & Core Services (Java)
**Owner**: `[Student 4 Name]` (Enrollment: `[Roll Number]`)
- **Responsibilities**:
  - Design the MySQL ER schema and JPA Entities (`User`, `Job`, `Resume`).
  - Implement the Resume Vault file storage (BLOB) logic.
  - Develop CRUD REST APIs for Job Postings and Applications.
  - Manage the Aiven MySQL cloud database integration.
- **Key Deliverable**: A normalized database with functional JPA Repositories.

### Module 5: AI Resume Parsing & NLP Algorithms (Python)
**Owner**: `[Student 5 Name]` (Enrollment: `[Roll Number]`)
- **Responsibilities**:
  - Develop the PDF text extraction logic using `PyMuPDF`.
  - Implement rule-based NLP algorithms to extract skills and education.
  - Implement the Term Frequency-Inverse Document Frequency (TF-IDF) matching algorithm via `scikit-learn` to score resumes against jobs.
- **Key Deliverable**: The `analyze_resume` endpoint returning structured JSON intelligence.

## 3. GitHub Contribution Protocol
To meet the academic expectation of **minimum 3 commits per student per week**:
- All code must be committed to individual feature branches (e.g., `feat/auth`, `feat/ui-dashboard`).
- Team Leader will review Pull Requests before merging into `main`.
- Commit messages must be descriptive (e.g., `feat(auth): implement BCrypt password hashing`).

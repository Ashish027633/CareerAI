# Presentation Outline
**Project Title**: CareerAI — AI-Based Placement & Resume Analyzer

*This document outlines the slide-by-slide structure for the 10-15 minute PBL final presentation.*

### Slide 1: Title Slide
- **Title**: CareerAI — AI-Based Placement & Resume Analyzer
- **Team Members**: `[Names & Roll Numbers]`
- **Project Guide**: `[Guide Name]`
- **Institution**: `[College Name]`

### Slide 2: Introduction
- Briefly introduce the problem: Manual resume screening is slow, and students lack objective feedback on their resumes before applying.

### Slide 3: Problem Statement
- Bullet points on the specific pain points for students (no ATS feedback) and recruiters (too many resumes, hard to filter).

### Slide 4: Proposed Solution (CareerAI)
- Introduce CareerAI as an AI-driven placement platform.
- Key features: Automated parsing, Resume Intelligence Scoring, and TF-IDF Job Matching.

### Slide 5: System Architecture
- High-level block diagram.
- Mention the 3 pillars: React (Frontend), Java Spring Boot (Backend Gateway/DB), Python FastAPI (AI NLP Engine).

### Slide 6: Technology Stack
- Highlight: React, Tailwind CSS, Java 17, Spring Boot, Aiven MySQL, Python, PyMuPDF, Scikit-learn.
- *Note: Mention stateless JWT authentication to fulfill PBL security rubrics.*

### Slide 7: Database Design (ER Diagram)
- Show a simplified ER diagram (Users -> Profiles -> Resumes -> Applications -> Jobs).
- Explain that PDFs are stored securely as BLOBs to prevent unauthorized access.

### Slide 8: Module Implementation & Team Allocation
- Briefly list which team member built which module (UI, Auth, Database, AI, Integrations).

### Slide 9: AI Resume Analysis (How it Works)
- Explain the Python microservice workflow.
- 1) PyMuPDF extracts text. 2) Rule-based matching detects skills/education. 3) JSON payload is returned to Java.

### Slide 10: TF-IDF Job Matching
- Explain how a student's parsed resume text is mathematically compared against a company's job description using Cosine Similarity (TF-IDF).

### Slide 11: Testing & Deployment
- Briefly mention the Unit Tests (JUnit/Pytest).
- Mention live cloud deployment on Vercel and Render.

### Slide 12: Screenshots / Live Demo Transition
- Show 2-3 key screenshots (Student Dashboard, AI Score, Company Candidates).
- Transition to the live demo.

### Slide 13: Limitations & Future Scope
- **Current Limitation**: Simple TF-IDF keyword matching doesn't understand deep semantic context (e.g., "Java" vs "JavaScript").
- **Future Scope**: Integrate Large Language Models (LLMs) like OpenAI for semantic understanding.

### Slide 14: Conclusion
- Summary of how CareerAI achieves the PBL objectives by streamlining college placements.

### Slide 15: Q&A
- "Thank You! Questions?"

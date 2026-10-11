# Project Abstract
**Project Title**: CareerAI — AI-Based Placement & Resume Analyzer
**Academic Year**: 2026–27

## 1. Introduction and Background
In today's highly competitive job market, students struggle to optimize their resumes for Applicant Tracking Systems (ATS), while recruiters face an overwhelming volume of applications. Traditional college placement cells rely on manual processes for filtering candidates and matching them with relevant opportunities, leading to inefficiencies, biased screenings, and missed opportunities.

## 2. Problem Statement
The manual resume evaluation process is tedious, error-prone, and slow. Students lack actionable, immediate feedback on how their resumes align with industry expectations. Concurrently, recruiters and placement cells need an intelligent, automated method to filter, score, and rank candidates based on objective metrics (e.g., skills, education, experience) extracted directly from resumes.

## 3. Existing System and Limitations
Existing placement portals function primarily as basic job boards. They require students to manually enter exhaustive profile details and offer no intelligent analysis of uploaded resumes. Limitations include:
- No automated resume parsing or scoring.
- Absence of skill-gap analysis or feedback for students.
- Recruiters must manually download and read every resume to verify qualifications.
- High turnaround time for shortlisting candidates.

## 4. Proposed System
CareerAI is a comprehensive, AI-driven placement and resume analysis platform. The system bridges the gap between students and recruiters by providing intelligent, automated resume evaluation and job matching. 
The system features three distinct roles:
1. **Students**: Upload PDF resumes, receive instant ATS-style parsing, objective scoring, and actionable recommendations. Apply for jobs.
2. **Companies**: Post job openings, define required skills, and view automatically shortlisted/ranked candidates based on resume-to-job match percentages.
3. **Admins**: Monitor system metrics, verify company profiles, and oversee platform activity.

## 5. Objectives
- To automate the extraction of skills, education, and experience from PDF resumes using Natural Language Processing (NLP).
- To provide students with an objective "Resume Intelligence" score and actionable improvement recommendations.
- To implement a job-matching algorithm that calculates the compatibility between a student's parsed resume and a company's job requirements using Term Frequency-Inverse Document Frequency (TF-IDF).
- To provide a secure, Role-Based Access Control (RBAC) web application for placement activities.

## 6. Scope
The scope includes user registration, stateless JWT-based authentication, a student dashboard (resume vault, AI analysis, job applications), a company dashboard (job postings, candidate shortlisting, interview scheduling), and an admin oversight dashboard. 

## 7. Target Users
- **College Students/Job Seekers**: Seeking actionable feedback on resumes and applying for jobs.
- **Recruiters/Companies**: Seeking an automated way to parse, score, and rank applicants.
- **Placement Officers (Admins)**: Managing the campus recruitment ecosystem.

## 8. Technology Stack
> **Note to Mentor**: This project leverages a modern web stack. Please confirm if these variations from standard PBL guidelines (Bootstrap 5 and stateful sessions) are acceptable.
- **Frontend**: React.js with Tailwind CSS (Responsive UI).
- **Backend**: Java Spring Boot 3 (REST API, Spring Security).
- **Authentication**: Stateless JSON Web Tokens (JWT).
- **Database**: Aiven MySQL (Cloud Relational Database) via Spring Data JPA.
- **AI Microservice**: Python FastAPI, PyMuPDF (PDF parsing), Scikit-Learn (TF-IDF vectorization), and NLTK.
- **Deployment**: Vercel (Frontend), Render (Spring Boot Backend & Python AI Service).

## 9. Expected Outcomes
- Reduction in manual resume screening time by over 80%.
- Improved student resume quality through objective, automated feedback.
- Streamlined, transparent, and efficient campus placement workflow.

## 10. Keywords
Applicant Tracking System (ATS), Artificial Intelligence, TF-IDF, Natural Language Processing, Spring Boot, React, Resume Parsing, Job Matching, Placement Portal.

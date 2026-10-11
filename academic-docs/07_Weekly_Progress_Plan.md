# Ten-Week Project Plan & Work Logs
**Project Title**: CareerAI — AI-Based Placement & Resume Analyzer

## 1. Ten-Week Academic Timeline
This timeline represents the proposed sequence of activities to meet the academic evaluation requirements.

| Week | Milestone | Planned Activities | Responsible Module Owner | Deliverables / Evidence |
| :--- | :--- | :--- | :--- | :--- |
| **Week 1** | Inception & Planning | Team formation, Guide selection, Topic finalization. | Team Leader | Approved `01_Project_Abstract.md`. |
| **Week 2** | Requirements Gathering | Analyzing stakeholder needs, drafting functional/non-functional requirements. | `[Student 2]` (UI) | Approved `02_SRS.md`. |
| **Week 3** | System Design | Designing application flow, authentication sequence, and system architecture. | `[Student 3]` (Auth) | Approved `03_UML_Design.md`. |
| **Week 4** | Database & UI Design | Designing the MySQL ER schema, mapping JPA entities, and mocking UI views. | `[Student 4]` (DB) | Approved `04_Database_Design.md` & `05_UI_Design.md`. |
| **Week 5** | Core Backend & Security | Implementing Spring Boot REST APIs, JWT Auth, and BCrypt password hashing. | `[Student 3]` (Auth) | Code commits, Postman API test results. |
| **Week 6** | Frontend Development | Building React SPA, setting up Tailwind CSS, and connecting to Auth APIs. | `[Student 2]` (UI) | Code commits, functioning Login/Register UI. |
| **Week 7** | AI Service Development | Writing Python FastAPI application, PyMuPDF extraction, and rule-based logic. | `[Student 5]` (AI) | Code commits, isolated Python Pytest results. |
| **Week 8** | Integration & Job Matching | Connecting Java backend to Python AI via `x-api-key`. Implementing TF-IDF matching. | Team Leader | Integration commits, successfully parsed PDFs. |
| **Week 9** | Deployment & QA | Deploying to Render (Backend/AI) and Vercel (Frontend). Running full E2E tests. | `[Student 4]` (DB) / TL | Live URL, `08_Testing_Documentation.md`. |
| **Week 10** | Final Documentation & Viva | Compiling reports, PPT presentation, recording demo video, preparing for Viva. | All Members | Final Project Report, Presentation, Viva Guide. |

---

## 2. Weekly Work Log Template
*Instructions: Each team member must maintain a work log mapping to their GitHub commits to verify the minimum 3 commits/week requirement.*

**Week #: `[Insert 1-10]`**
**Dates:** `[Start Date]` to `[End Date]`

| Student Name | Assigned Task | Commits Made | Status | Mentor Remarks |
| :--- | :--- | :--- | :--- | :--- |
| `[TL Name]` | `[Description]` | `[Count]` | `[Completed/Pending]` | `[Blank for Guide]` |
| `[Student 2]` | `[Description]` | `[Count]` | `[Completed/Pending]` | `[Blank for Guide]` |
| `[Student 3]` | `[Description]` | `[Count]` | `[Completed/Pending]` | `[Blank for Guide]` |
| `[Student 4]` | `[Description]` | `[Count]` | `[Completed/Pending]` | `[Blank for Guide]` |
| `[Student 5]` | `[Description]` | `[Count]` | `[Completed/Pending]` | `[Blank for Guide]` |

---

## 3. Saturday Mentor Meeting Minutes (Template)
**Date:** `[Saturday Date]`
**Time:** `[Meeting Time]`
**Location/Link:** `[Venue or Meeting Link]`

**Agenda:**
1. Review progress of Week `[X]`.
2. Address integration blockers.
3. Plan tasks for Week `[X+1]`.

**Discussion & Decisions:**
- *[Record decisions regarding technology choices, UI changes, or testing strategies here.]*

**Pending Actions / Blockers:**
- *[E.g., Waiting for Render DNS propagation, fixing HTTP 500 error on AI service integration.]*

**Mentor Signature:** ____________________

# CareerAI Project Context

## Project Goal
CareerAI is an intelligent, AI-powered campus placement preparation, resume analysis, and job matching platform designed for students, recruiting companies, and institutional placement administrators. It bridges the gap between candidate resumes and modern company job descriptions through deep skill gap extraction, ATS resume scoring, job recommendations, applicant tracking, and placement analytics.

## Current Phase
PHASE 1 — FRONTEND

## Status
Frontend UI implemented and visually refined.

## Completed
- **Visual Identity & Design Tokens**: Transitioned from generic dashboard aesthetic to a bespoke, human-designed SaaS palette centered around deep dark obsidian (`#08090C`), rich burgundy/wine (`#991B32`), warm ivory highlights (`#F7F4EB`), and muted coral accents (`#E05D5D`). Centralized semantic tokens in `src/constants/themeTokens.js` and `tailwind.config.js`.
- **Branding & Intentional Typography**: Built distinctive architectural geometric monogram `BrandLogo.jsx` and standardized typography hierarchy with font-mono metadata and grounded placement copy.
- **Micro-Interactions & Motion System**: Implemented subtle button lifts (`hover:-translate-y-0.5`, `active:translate-y-0`), focus rings, card hover lift states, count-up metric animations on ATS scores, and strict `@media (prefers-reduced-motion: reduce)` support.
- **Live Horizontal Text Scroller**: Created `TextTicker.jsx` with continuous seamless loop, pause-on-hover, zero overflow, and placement pulse messages.
- **Landing Page Upgrade**: Redesigned Hero with live ATS Parser showcase, live text ticker, dual-workflow comparison (Candidate vs Recruiter), and wine/ivory CTA sections.
- **Student Dashboard Refinement**: Established Resume Score as the primary visual centerpiece; eliminated repetitive icon-number grids; structured asymmetric placement pulse, interview alert, and skill gap matrix.
- **Resume Experience & Multi-Step Analysis**: Implemented realistic staged scan states ("Scanning resume..." -> "Extracting skills..." -> "Comparing with current job demand..." -> "Analysis ready.") across resume uploads and re-analyses.
- **Recruiter Console Upgrade**: Operational pipeline command strip, candidate ranking table, and requisition management.
- **Admin Command Center**: Institutional key metrics bar, wine/coral area charts for monthly placement trends, and vertical bar charts for in-demand skills.
- **Mobile Navigation & Accessibility**: Responsive drawer with backdrop blur, body scroll locking, and Escape key dismissal.
- **Decoupled API Service Layer**: Forward-compatible service layer in `src/services/api/` (`authService`, `resumeService`, `jobService`, `applicationService`, `companyService`, `adminService`, `interviewService`, `notificationService`) ready for zero-rewrite Spring Boot connection.

## Current Task
Phase 1 visual refinement and experience upgrade complete and verified. Vite production build passing cleanly.

## Pending
- Phase 2: Java Spring Boot REST API integration (do not start yet).
- Phase 3: AI/ML skill extraction and semantic embedding matching.
- Phase 4: MySQL relational schema and JPA persistence.
- Phase 5: Security hardening, testing, and deployment.
- Phase 6: Documentation, presentation PPT, and viva defense materials.

## Next Phase
PHASE 2 — JAVA SPRING BOOT BACKEND

## Technology Stack
- **Frontend (Phase 1)**: React 18, Vite, JavaScript, Tailwind CSS, React Router v6, Lucide React, Recharts, Axios.
- **Backend (Phase 2 - Next)**: Java 21, Spring Boot 3.x, Spring Security 6, JWT, Spring Data JPA.
- **Database (Phase 4)**: MySQL / PostgreSQL relational schema.
- **AI/ML (Phase 3)**: Resume parsing, TF-IDF / vector embeddings, semantic skill extraction.

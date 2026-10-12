# Individual Contribution Report — Dev Upadhayay

**Full Name**: Dev Upadhayay
**Roll Number**: `24EARAD038` (Verified)
**Team Role**: Team Member
**Proposed Module**: Frontend Architecture, React 18 SPA, Tailwind CSS & Dashboards
**Project**: CareerAI — AI-Based Placement & Resume Analyzer
**Repository**: [https://github.com/Ashish027633/CareerAI](https://github.com/Ashish027633/CareerAI)

---

## 1. Technical Profile & Core Competencies
- **Primary Languages**: JavaScript (ES6+), HTML5, CSS3
- **Frameworks & Libraries**: React.js 18.2, Tailwind CSS 3.4, Vite, Recharts, Lucide React, Axios
- **UI/UX Tooling**: Responsive Grid/Flexbox Layouts, Custom Theme Tokens, Micro-Interactions, SVG Data Visualizations
- **Proposed Responsibilities**: Frontend Single Page Application architecture, component library development, editorial light-first styling, Student/Company/Admin dashboards, client routing, and Axios API client integration.

> **Academic Attribution Note**: In accordance with project evaluation guidelines, technical contributions below represent the agreed team modular division. Individual historical dates are recorded as part of the 12-week retrospective collaboration plan.

---

## 2. 12-Week Contribution Overview

| Week | Phase / Focus Area | Key Objectives | Proposed Deliverables | Status |
| :---: | :--- | :--- | :--- | :---: |
| **W1** | Project Inception & UI Planning | Formulate UI requirements, design goals, and user stories | User Persona Matrix, UI Goals | COMPLETED |
| **W2** | Wireframing & Design Specs | Design wireframes, component hierarchy, and design system | `05_UI_Design.md`, Wireframe Schemas | COMPLETED |
| **W3** | Frontend Foundation & Theme | Initialize React 18, Tailwind tokens, and atomic components | `frontend/src/components/common/` | COMPLETED |
| **W4** | Core Role Dashboards | Build Student, Company, and Admin dashboard views | `StudentDashboard.jsx`, `CompanyDashboard.jsx` | COMPLETED |
| **W5** | Auth Views & Validation | Build 2-column login/registration UI and client validation | `LoginPage.jsx`, `RegisterPage.jsx` | COMPLETED |
| **W6** | Profile & Job Post UI | Develop Student Profile and Recruiter Job Requisition UI | `StudentProfilePage.jsx`, `JobCreateModal.jsx` | COMPLETED |
| **W7** | Resume Vault & File UI | Build drag-and-drop resume upload zone and PDF previewer | `StudentResumePage.jsx`, File Modal | COMPLETED |
| **W8** | Resume Analysis UI | Implement radar chart, score gauge, and recommendations | `ResumeAnalysisPage.jsx`, Radar Chart | COMPLETED |
| **W9** | Job Feed & Match Breakdown | Build job cards, match percentage pills, and filter bar | `JobsPage.jsx`, `JobDetailsPage.jsx` | COMPLETED |
| **W10** | API Wireup & State Sync | Connect frontend Axios services to live backend endpoints | `services/api/`, Interceptor Wireup | COMPLETED |
| **W11** | Production UI Fixes & Polish | Fix public 401 loop, remove mock defaults, responsive polish | Commit `be0a587`, `befe52c` | COMPLETED |
| **W12** | Demo Prep & Documentation | Polish UI interactions, rehearse demo, compile UI report | Presentation Screenshots, Final Polish | COMPLETED |

---

## 3. Day-by-Day Task Allocation (All 84 Days)

| Day | Planned/Actual Task | Module | Status | Evidence/Deliverable |
| :---: | :--- | :--- | :---: | :--- |
| **Day 1** | Participate in team kick-off meeting; examine UI friction in existing placement portals | UI Research | COMPLETED | Problem Notes |
| **Day 2** | Draft user personas for Student Job Seeker, Corporate Recruiter, and Placement Officer | Requirements | COMPLETED | User Persona Drafts |
| **Day 3** | Research modern editorial light-mode aesthetics vs generic dark/AI dashboard templates | UI Design | COMPLETED | Color Palette Samples |
| **Day 4** | Map out navigation trees and user journey flows across the three primary roles | UI Architecture | COMPLETED | Navigation Flowchart |
| **Day 5** | Contribute frontend scope sections to the draft project abstract | Documentation | COMPLETED | Abstract UI Section |
| **Day 6** | Attend mentor consultation; review proposed UI design philosophy with faculty guide | Review | COMPLETED | Guide Meeting Notes |
| **Day 7** | Refine user flow requirements based on mentor feedback; plan Week 2 design sprints | Planning | COMPLETED | UI Task Backlog |
| **Day 8** | Specify client-side functional requirements: responsive views, client routing, and form validation | Requirements | COMPLETED | `02_SRS.md` UI Spec |
| **Day 9** | Create low-fidelity wireframes for Student Dashboard and Placement Command Center | UI Wireframing | COMPLETED | Wireframe Drafts |
| **Day 10** | Create low-fidelity wireframes for Job Postings catalog and ATS Resume Vault | UI Wireframing | COMPLETED | Wireframe Drafts |
| **Day 11** | Formulate component hierarchy tree for reusable buttons, cards, modals, and headers | Component Design | COMPLETED | Component Tree Spec |
| **Day 12** | Author comprehensive UI design document detailing color codes and typography scales | Documentation | COMPLETED | `05_UI_Design.md` |
| **Day 13** | Review design system tokens with team; confirm accessibility contrast ratios (WCAG AA) | Accessibility | COMPLETED | Contrast Audit Notes |
| **Day 14** | Finalize Week 2 design deliverables; prepare local Node.js and Vite development setup | Setup | COMPLETED | Environment Ready |
| **Day 15** | Configure `tailwind.config.js` with primary Burgundy (`#8B0026`) and Cream (`#F3E5D0`) tokens | Styling | COMPLETED | `tailwind.config.js` |
| **Day 16** | Scaffold React 18 Single Page Application using Vite; configure path aliases | Scaffolding | COMPLETED | `frontend/package.json` |
| **Day 17** | Develop core `Button.jsx` supporting variants (primary, outline, ghost, danger) and loading states | Component Lib | COMPLETED | `Button.jsx` |
| **Day 18** | Develop `Card.jsx`, `Input.jsx`, and `Modal.jsx` reusable UI components | Component Lib | COMPLETED | `Card.jsx`, `Input.jsx` |
| **Day 19** | Implement global navigation shell: `Navbar.jsx`, `Sidebar.jsx`, and `Footer.jsx` | Layout | COMPLETED | `frontend/src/components/layout/` |
| **Day 20** | Develop responsive mobile drawer navigation (`MobileDrawer.jsx`) for small screens | Layout | COMPLETED | `MobileDrawer.jsx` |
| **Day 21** | Test layout responsiveness across mobile (360px), tablet (768px), and desktop (1280px) | Testing | COMPLETED | Viewport Test Log |
| **Day 22** | Build high-converting `LandingPage.jsx` featuring Hero section, feature grids, and stats | Pages | COMPLETED | `LandingPage.jsx` |
| **Day 23** | Build editorial `AboutPage.jsx` and `FeaturesPage.jsx` for public informational routing | Pages | COMPLETED | `AboutPage.jsx` |
| **Day 24** | Build 2-column `LoginPage.jsx` with role tabs (Student, Recruiter, Admin) | Auth Views | COMPLETED | `LoginPage.jsx` |
| **Day 25** | Build 2-column `RegisterPage.jsx` with dynamic Student and Company registration fields | Auth Views | COMPLETED | `RegisterPage.jsx` |
| **Day 26** | Configure client-side routing tree in `AppRoutes.jsx` with `BrowserRouter` | Routing | COMPLETED | `AppRoutes.jsx` |
| **Day 27** | Create forward-compatible mock API datasets for early component prototyping | Mock Data | COMPLETED | `src/data/mock/` |
| **Day 28** | Run production build verification (`npm run build`) ensuring zero bundle errors | Testing | COMPLETED | Production Build Log |
| **Day 29** | Develop `StudentDashboard.jsx` featuring placement readiness score widget and quick stats | Dashboard | COMPLETED | `StudentDashboard.jsx` |
| **Day 30** | Develop upcoming interview reminder cards and active application status tracker widgets | Dashboard | COMPLETED | Dashboard Widgets |
| **Day 31** | Develop `CompanyDashboard.jsx` featuring active job metrics, applicant pipelines, and quick actions | Dashboard | COMPLETED | `CompanyDashboard.jsx` |
| **Day 32** | Build dynamic Job Creation requisition modal (`JobCreateModal.jsx`) with skill tag inputs | Recruiter UI | COMPLETED | Job Creation Form |
| **Day 33** | Develop `CompanyApplicantsPage.jsx` featuring candidate dossiers and shortlisting actions | Recruiter UI | COMPLETED | `CompanyApplicantsPage.jsx` |
| **Day 34** | Develop `AdminDashboard.jsx` Command Center integrating Recharts placement analytics | Admin UI | COMPLETED | `AdminDashboard.jsx` |
| **Day 35** | Build Admin student and company partner directory tables with search filters | Admin UI | COMPLETED | Admin Directory Views |
| **Day 36** | Build `StudentProfilePage.jsx` with editable forms for college, branch, CGPA, and bio | Student UI | COMPLETED | `StudentProfilePage.jsx` |
| **Day 37** | Implement dynamic skill badge tag-selector component (`SkillBadge.jsx`) | Component Lib | COMPLETED | `SkillBadge.jsx` |
| **Day 38** | Build Company Profile page displaying corporate profile, industry, and website | Recruiter UI | COMPLETED | Company Profile View |
| **Day 39** | Implement Toast notification context (`ToastContext.jsx`) for global user alerts | Context | COMPLETED | `ToastContext.jsx` |
| **Day 40** | Integrate theme constants and typography tokens into all active dashboard views | Styling | COMPLETED | UI Refinement |
| **Day 41** | Audit form validations (email pattern matching, required fields, and password bounds) | Validation | COMPLETED | Form Validation Spec |
| **Day 42** | Review Phase 1 frontend deliverables against SRS specifications | Milestone | COMPLETED | Phase 1 Verification |
| **Day 43** | Build `StudentResumePage.jsx` layout featuring master resume card and upload container | Resume UI | COMPLETED | `StudentResumePage.jsx` |
| **Day 44** | Implement drag-and-drop file upload container with visual drop-zone feedback | Resume UI | COMPLETED | Drag-and-Drop Zone |
| **Day 45** | Implement client-side PDF validation: check 10MB file limit and MIME type enforcement | Validation | COMPLETED | File Validation Helper |
| **Day 46** | Build interactive PDF inspection modal previewer (`ResumePreviewModal.jsx`) | Resume UI | COMPLETED | Preview Modal |
| **Day 47** | Build resume version action buttons: Inspect, Replace, and Delete modal confirmations | Resume UI | COMPLETED | Action Controls |
| **Day 48** | Test file upload UX: verify loading spinner animations and stage progress indicators | UX Testing | COMPLETED | Upload Stage Animation |
| **Day 49** | Review resume vault UI with team; ensure compliance with placement document guidelines | Review | COMPLETED | Vault Review Log |
| **Day 50** | Build `ResumeAnalysisPage.jsx` layout shell for AI Resume Intelligence Breakdown | Analysis UI | COMPLETED | `ResumeAnalysisPage.jsx` |
| **Day 51** | Integrate Recharts `RadarChart` component for visualizing 7-dimensional category scores | Charts | COMPLETED | Category Radar Chart |
| **Day 52** | Implement animated score counter reflecting overall ATS Readiness Score (0-100) | Micro-Interaction | COMPLETED | Score Counter Logic |
| **Day 53** | Develop detected technical skill badges grouped by category (Languages, Frameworks, Cloud) | Analysis UI | COMPLETED | Skill Tag Grid |
| **Day 54** | Build actionable resume improvement recommendations accordion component | Analysis UI | COMPLETED | Recommendation List |
| **Day 55** | Add mandatory AI transparency and evaluation disclaimer banners to analysis views | Compliance | COMPLETED | AI Disclaimer Banner |
| **Day 56** | Verify Radar chart rendering across desktop, tablet, and mobile viewports | Testing | COMPLETED | Radar Chart Test Log |
| **Day 57** | Build Student `JobsPage.jsx` featuring multi-criteria filter controls (search, job type, location) | Job UI | COMPLETED | `JobsPage.jsx` |
| **Day 58** | Develop `JobCard.jsx` displaying title, company, salary CTC, and match percentage pill | Component Lib | COMPLETED | `JobCard.jsx` |
| **Day 59** | Build `JobDetailsPage.jsx` displaying full description, eligibility status, and matched skills | Job UI | COMPLETED | `JobDetailsPage.jsx` |
| **Day 60** | Build one-click application submission flow with modal confirmation and resume check | Job UI | COMPLETED | Application Flow |
| **Day 61** | Build `RecommendedJobsPage.jsx` showcasing algorithmic candidate-to-job matching | Job UI | COMPLETED | Recommended Feed |
| **Day 62** | Build Student `ApplicationsPage.jsx` displaying full application history and timeline badges | Student UI | COMPLETED | `ApplicationsPage.jsx` |
| **Day 63** | Review job application and matching UI flows with team; prepare API integration | Review | COMPLETED | Job UI Audit |
| **Day 64** | Create centralized Axios client abstraction in `frontend/src/services/api/client.js` | API Integration | COMPLETED | `client.js` |
| **Day 65** | Configure Axios request interceptor for automated JWT Bearer token injection | API Integration | COMPLETED | Token Interceptor |
| **Day 66** | Wire `authService.js` to Spring Boot `/api/auth/login` and `/api/auth/register` endpoints | Integration | COMPLETED | `authService.js` |
| **Day 67** | Wire `studentService.js` and `companyService.js` to live Spring Boot profile controllers | Integration | COMPLETED | Profile Wireup |
| **Day 68** | Wire `resumeService.js` to live `/api/resumes/upload` and `/api/resumes/analysis` endpoints | Integration | COMPLETED | Resume Wireup |
| **Day 69** | Wire `jobService.js` and `applicationService.js` to live job CRUD and application endpoints | Integration | COMPLETED | Job Wireup |
| **Day 70** | Test end-to-end frontend API requests against local Spring Boot test instance | Testing | COMPLETED | Local E2E Log |
| **Day 71** | Audit frontend production environment variables (`VITE_API_BASE_URL`) | DevOps | COMPLETED | `.env.production` |
| **Day 72** | Configure Vercel deployment settings and initiate initial production frontend build | DevOps | COMPLETED | Vercel Deployment |
| **Day 73** | Fix Axios 401 interceptor loop on public unauthenticated landing and registration pages | Bug Fix | COMPLETED | Commit `be0a587` |
| **Day 74** | Remove hardcoded mock credentials from `LoginPage.jsx` form state | Bug Fix | COMPLETED | Commit `befe52c` |
| **Day 75** | Fix Company registration form field mapping: align `officialEmail` with backend DTO | Bug Fix | COMPLETED | Commit `befe52c` |
| **Day 76** | Update `StudentDashboard.jsx` and `CompanyDashboard.jsx` to render authentic live metrics | Polish | COMPLETED | Dashboard Polish |
| **Day 77** | Verify live Vercel frontend loading and responsiveness across mobile and desktop devices | Testing | COMPLETED | Vercel Production Test |
| **Day 78** | Capture high-resolution UI screenshots for Final Project Report and academic presentation | Documentation | COMPLETED | UI Screenshot Archive |
| **Day 79** | Author individual contribution report detailing frontend modular execution across 12 weeks | Documentation | COMPLETED | `DEV_UPADHAYAY.md` |
| **Day 80** | Prepare UI architecture and dashboard presentation slides for project slide deck | Documentation | COMPLETED | Slide Content Drafts |
| **Day 81** | Assist in reviewing Viva technical questions covering React, Tailwind CSS, and Axios | Viva Prep | COMPLETED | Viva Review Notes |
| **Day 82** | Participate in full platform mock demonstration rehearsal; test live user journeys | Rehearsal | COMPLETED | Mock Demo Test |
| **Day 83** | Final check of frontend source code formatting, dependencies, and clean Git tree | Verification | COMPLETED | Frontend Audit Log |
| **Day 84** | Final project sign-off; complete academic evaluation dossier | Final Sign-off | COMPLETED | Evaluation Ready |

---

## 4. Summary of Completed Frontend Work & Evidence
- **23 Verified Client Routes**: Built complete Single Page Application covering public landing views, multi-role auth, Student Vault, Recruiter Console, and Admin Command Center.
- **Component Library**: Created robust atomic design system (`Button`, `Card`, `Modal`, `Input`, `SkillBadge`, `StatusBadge`).
- **Data Visualizations**: Integrated Recharts Radar and Bar charts for ATS resume dimensions and placement statistics.
- **Live Deployment**: Deployed on Vercel Edge Network at `https://career-ai-orpin-kappa.vercel.app/`.

---

## 5. Learning Outcomes
1. Developed deep competence in React 18 component lifecycle, custom hooks, and context state management.
2. Mastered utility-first responsive styling with Tailwind CSS, creating tailored editorial palettes.
3. Acquired practical expertise in connecting React client architectures to enterprise Java Spring Boot backends via Axios interceptors.
4. Learned production frontend debugging: solving Axios redirect loops, handling multi-part form uploads, and rendering authentic API states.

---

## 6. Signatures & Verification

**Student Signature**: ______________________________________
**Date**: __/__/2026

**Faculty Guide Signature**: ______________________________________
**Guide Remarks**: __________________________________________________________________
**Date**: __/__/2026

# CareerAI — AI-Based Placement & Resume Analyzer

> **A human-designed, multi-role placement intelligence and ATS resume analysis platform for students, recruiters, and university placement administrators.**

---

## 🌟 Overview

**CareerAI** bridges the gap between campus hiring drives and student technical preparation. Built with an editorial light-first design aesthetic, CareerAI offers three specialized role portals:
1. **Student Portal**: Master PDF resume vault, multi-dimensional ATS scoring (82/100 benchmark), skill gap detection, match-ranked jobs, and full application lifecycle tracking.
2. **Company / Recruiter Suite**: Operational hiring console, algorithmic candidate dossiers, dynamic requisition builder, shortlisting/rejection pipelines.
3. **Admin Command Center**: Institutional placement analytics, real-time Recharts visualizations (application volumes, top technical competencies, discipline success ratios), and partner moderation.

---

## 🚀 Project Phasing Strategy

CareerAI is engineered following a structured 6-phase software engineering lifecycle:

- [x] **Phase 1: Frontend Architecture & UI/UX** *(Current Phase — Complete & Audited)*
  - React 18, Vite, Tailwind CSS, Lucide React, Recharts.
  - Light-first design tokens (Burgundy `#8B0026`, Ivory `#FFF9F2`, Cream `#F3E5D0`, Coral `#D64F63`, Dark text `#1E1B1C`).
  - Full-width, edge-to-edge layout across viewports (360px – 1920px).
  - Forward-compatible mock service layer with realistic simulated async pipelines.
- [ ] **Phase 2: Java Spring Boot Backend** *(Next Phase)*
  - Spring Boot 3.x, Spring Data JPA, Spring Security, JWT authentication.
  - RESTful API endpoints mirroring frontend service abstractions.
- [ ] **Phase 3: AI/ML Resume & Skill Extraction Engine**
  - Python NLP microservice, PDF text parsing, semantic skill embeddings, ATS scoring models.
- [ ] **Phase 4: Database & Integration**
  - MySQL relational database schema, JPA entity mappings, cross-service integration.
- [ ] **Phase 5: Testing, Security & Deployment**
  - Unit/integration testing, Docker containerization, cloud deployment.
- [ ] **Phase 6: Academic Documentation & Viva Defense**
  - Final project documentation, presentation deck, viva preparation.

---

## 🎨 Visual Identity & Design System

The platform features an intentional, warm light mode palette avoiding generic AI dashboard aesthetics:

| Token | Hex | Role |
|---|---|---|
| **Primary Brand (Burgundy)** | `#8B0026` | Primary CTAs, active indicators, brand monogram |
| **Dark Burgundy** | `#65001C` | Button hover states, high-contrast headings |
| **Canvas (Ivory)** | `#FFF9F2` | Global page body background |
| **Surface (Cream)** | `#FAF5EF` | Elevated card surfaces, command strips, table headers |
| **Surface Accent (Warm Cream)** | `#F3E5D0` | Score badges, notification pills |
| **Dark Text** | `#1E1B1C` | High-contrast body text and headings |
| **Secondary Text** | `#5F5A5C` | Subtitles, secondary table meta |
| **Coral / Rose** | `#D64F63` | Skill gap priority alerts, highlights |
| **Warning (Yellow)** | `#F3C43E` | Interview reminder banners, alerts |
| **Success (Emerald)** | `#238B68` | Placed statuses, high ATS matches (≥80%) |

---

## 📂 Project Architecture

```
CareerAI/
├── frontend/                       # Phase 1 React 18 Single-Page Application
│   ├── src/
│   │   ├── components/             # Reusable UI component library
│   │   │   ├── common/             # Button, Card, Modal, Table, Input, Select, Badges, etc.
│   │   │   ├── layout/             # Navbar, Sidebar, Footer, MobileDrawer, PageHeader
│   │   │   ├── resume/             # ResumeScoreCard, PDF inspection components
│   │   │   └── jobs/               # JobCard, filter controls
│   │   ├── constants/              # Theme tokens, navigation trees, role definitions
│   │   ├── context/                # AuthContext, ToastContext
│   │   ├── data/mock/              # Decoupled realistic mock datasets
│   │   ├── layouts/                # DashboardLayout (full-width), PublicLayout
│   │   ├── pages/
│   │   │   ├── auth/               # LoginPage, RegisterPage, ForgotPasswordPage
│   │   │   ├── public/             # LandingPage, AboutPage, FeaturesPage, Previews
│   │   │   ├── student/            # Dashboard, Profile, Resume, Analysis, Jobs, Applications, etc.
│   │   │   ├── company/            # Dashboard, Jobs, JobCreate, Applicants Dossier, Profile
│   │   │   └── admin/              # Command Center, Students, Companies, Jobs, Policy
│   │   ├── routes/                 # AppRoutes (23 verified client routes)
│   │   ├── services/api/           # REST service abstractions ready for Spring Boot
│   │   └── utils/                  # Formatters, color utilities, animation helpers
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── API_DOCUMENTATION.md            # REST API contract specification
├── ARCHITECTURE.md                 # System architecture & layer models
├── CHANGELOG.md                    # Project release notes & iteration log
├── DATABASE_SCHEMA.md              # Relational SQL schema specification
├── PROJECT_CONTEXT.md              # Project goals, tech stack, and phase constraints
├── PROJECT_STATUS.md               # Current milestone status tracker
├── TASKS.md                        # Task and sprint tracker
└── README.md                       # Repository overview
```

---

## 🛠️ Quick Start (Frontend Prototype)

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Local Run
```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Launch Vite development server
npm run dev

# 4. Access in your browser
# http://localhost:5173
```

### Production Build
```bash
npm run build
```

---

## 🔑 Authentication & Demo Role Switching

CareerAI includes an instant role-switching utility located in the top navigation bar to test all user journeys:
- **Student Persona**: Ashish Sharma (B.Tech CSE, 8.1 CGPA, 82/100 ATS Score)
- **Company Persona**: TechCorp Solutions (Recruiting Officer)
- **Admin Persona**: Central Training & Placement Cell Director

---

## 📄 License
This project is developed as part of an institutional placement intelligence initiative. All rights reserved.

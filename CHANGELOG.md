# CareerAI Changelog

All notable changes to the CareerAI project will be documented in this file.

## [2.2.0-backend-business-logic] - Unreleased
### Added (Phase 2B Java Spring Boot Business Logic)
- **Work in Progress**: Implementing full backend business logic for Student, Company, Jobs, Applications, Resumes, Interviews, Notifications, and Admin modules.

## [2.1.0-full-system-verification] - 2026-10-08
### Verified (Phase 1 and Phase 2 Readiness)
- **Phase 1 Frontend Verification**: Validated React architecture, production build (0 errors), components, light-mode CSS tokens, and routing. Simulated parallel deployment with backend on port `5173`.
- **Phase 2 Backend Verification**: Verified Spring Boot context initialization, H2 database connection & persistence, and stateless JWT token generation. Ensured successful cross-origin API integration via raw tests on port `8080`.

## [2.0.0-backend-scaffolding] - 2026-10-08
### Added (Phase 2 Java Spring Boot Backend)
- **Spring Boot 3.x Scaffolding**: Initialized `backend/` Maven project with Java 21, Spring Web, Spring Security, Spring Data JPA, H2 Database, Validation, JJWT, and Lombok.
- **Core Architecture**: Implemented standard `ApiResponse` wrapper matching frontend contract and `GlobalExceptionHandler` to translate exceptions into 401, 403, and 400 JSON standard formats.
- **Security Layer**: Configured Stateless JWT authentication (`JwtService`, `JwtAuthenticationFilter`, `SecurityConfig`) with CORS configured for `http://localhost:5173`. Established Role-based authorization (`STUDENT`, `COMPANY`, `ADMIN`).
- **Domain Entities & JPA**: Created JPA entities mapping to `DATABASE_SCHEMA.md` (`User`, `StudentProfile`, `CompanyProfile`, `Resume`, `ResumeAnalysis`, `Job`, `JobApplication`, `Interview`, `Notification`) and `StringListConverter` for JSON/Array cross-database compatibility.
- **Services & Controllers**: Stubbed REST controllers corresponding to Phase 1 frontend services (`AuthController`, `JobController`, `ResumeController`, `ApplicationController`, `InterviewController`, `AdminController`). Implemented `AuthService` with secure BCrypt registration logic.
- **Demo Data Initializer**: Created `DemoDataInitializer` (toggled via `app.seed-demo-data=true`) to seed H2 database with a deterministic subset of users, jobs, applications, and interviews for seamless frontend testing.

## [1.2.0-frontend-light-overhaul] - 2026-10-07
### Changed & Enhanced (Light Mode First, Responsive & Full Width Fix)
- **Light Mode Only Architecture**:
  - Removed all dark-first styling and theme toggles across the entire application.
  - Implemented the official warm light palette:
    - Primary Burgundy/Wine: `#8B0026`
    - Dark Burgundy: `#65001C`
    - Cream / Ivory surfaces: `#FFF9F2` (body), `#F3E5D0` (surface highlight), `#FAF5EF` (soft surface)
    - Borders: `#E8DED4`
    - Typography: `#1E1B1C` (Dark text), `#5F5A5C` (Secondary text), `#817B7E` (Muted text)
    - Rose / Coral highlights: `#D64F63`, `#E9838F`
    - Yellow attention / warning: `#F3C43E`, `#FFF1B8`
    - Success green: `#238B68`
  - Centralized tokens updated in `src/constants/themeTokens.js`, `tailwind.config.js`, and `src/index.css`.
- **Full-Screen / Width Fix Across Dashboards**:
  - Eliminated restrictive `max-w-7xl mx-auto` constraints from `DashboardLayout.jsx` and `Navbar.jsx`.
  - Replaced arbitrary column containers (`max-w-4xl`, `max-w-5xl`, `max-w-6xl`) with dynamic responsive full-width wrappers (`w-full`) across all 18 student, company, and admin views.
  - Dashboards now span edge-to-edge seamlessly on screens from 360px up to 1920px without narrow horizontal column squeezing.
- **Authentication System Overhaul**:
  - Re-architected `/login` and `/register` into editorial two-column layouts (brand showcase with live statistics on left, structured form on right).
  - Prominently integrated "Continue with Google" and "Sign up with Google" actions with an informative Phase 1 notice modal explaining backend integration timing.
  - Registration role tabs explicitly restricted to **Student** and **Company** (no public Admin registration).
  - Added new `/forgot-password` route with simulated password reset email dispatch.
  - Added "Remember Me" checkbox and "Forgot Password?" navigation link to `/login`.
- **Recharts Light Mode Visual Calibration**:
  - Refactored RadarChart (`ResumeAnalysisPage.jsx`), AreaChart, and BarChart (`AdminDashboardPage.jsx`) to render light theme cartesian grids (`#E8DED4`), dark axis labels (`#5F5A5C`), burgundy & emerald data series, and ivory tooltip callouts.
- **Micro-interactions & Responsive Ergonomics**:
  - Subtle hover lift (`-translate-y-0.5`) on primary CTAs and interactive cards.
  - Responsive mobile drawer navigation with smooth slide-out and backdrop blur.
  - Verification with `npm run build`: 0 compile errors, 0 runtime broken routes.

## [1.1.0-frontend-visual-upgrade] - 2026-10-07
### Changed & Enhanced
- **Visual Palette Overhaul**: Centralized design tokens in `themeTokens.js` and `tailwind.config.js` introducing rich burgundy/wine (`#991B32`), warm ivory highlights (`#F7F4EB`), and muted coral (`#E05D5D`).
- **Brand Geometry Monogram**: Created `BrandLogo.jsx` with distinctive architectural icon.
- **Live Text Ticker**: Implemented `TextTicker.jsx` displaying continuous placement updates.
- **Asymmetric Student Dashboard**: Redesigned `/student/dashboard` with prominent 82/100 resume score centerpiece.
- **Multi-Stage Simulated Scans**: Implemented realistic staged scan progress across upload and analysis views.

## [1.0.0-frontend] - 2026-10-07
### Added
- Root memory documentation initialized (`PROJECT_CONTEXT.md`, `PROJECT_STATUS.md`, `ARCHITECTURE.md`, `API_DOCUMENTATION.md`, `DATABASE_SCHEMA.md`, `CHANGELOG.md`, `TASKS.md`).
- Vite React frontend project initialized with React 18, React Router v6, Tailwind CSS, Lucide React, Recharts, and Axios.
- Reusable UI component atoms and molecules (`Button`, `Input`, `Select`, `Modal`, `ConfirmDialog`, `Badge`, `SkillBadge`, `StatusBadge`, `ProgressBar`, `Card`, `Table`, `SearchBar`, `Pagination`, `LoadingSpinner`, `EmptyState`, `ErrorState`).
- Toast notification system with `ToastContext`.
- Authentication state management via `AuthContext` supporting real-time role switching across Student, Company, and Admin modes.
- Public views: Landing page, About, Features, Jobs Preview, Companies Preview.
- Multi-role portals: Student, Company, and Admin dashboards with realistic mock service layer.

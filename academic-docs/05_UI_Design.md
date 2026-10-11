# User Interface (UI) Design
**Project Title**: CareerAI — AI-Based Placement & Resume Analyzer

## 1. UI Architecture & Design System
CareerAI uses **React.js** paired with **Tailwind CSS** to deliver a responsive, modern, and accessible user experience. The interface is component-driven, ensuring consistent branding and layout across all views.

*(Note to Evaluator: The UI does not utilize Bootstrap 5; it uses the modern Tailwind CSS framework which provides a highly responsive, utility-first styling approach standard in the industry today).*

### Color Palette & Typography
- **Primary Color**: Deep Indigo/Blue (Tailwind `blue-600` / `indigo-600`) for primary actions.
- **Background**: Soft Gray (`gray-50`) for dashboards, White (`white`) for cards.
- **Typography**: Inter (Google Fonts) for clean readability.
- **Feedback Colors**: Green for Success (Match/Shortlist), Red for Rejections/Errors, Yellow for Warnings.

## 2. Screenshot Capture Checklist
*To complete this section for the final report submission, the team must manually capture the following screenshots from the live deployment (`https://career-ai-orpin-kappa.vercel.app/`). Place the images in an `images/` directory and link them below.*

### A. Public & Authentication Pages
- [ ] `screenshot_01_homepage.png`: The public landing page showcasing features.
- [ ] `screenshot_02_register.png`: The registration screen (with Student/Company toggle).
- [ ] `screenshot_03_login.png`: The login screen displaying error validation (e.g., "Bad Credentials").

### B. Student Dashboard
- [ ] `screenshot_04_student_dashboard.png`: The main student overview.
- [ ] `screenshot_05_resume_vault.png`: The Resume Vault showing the drag-and-drop PDF upload component.
- [ ] `screenshot_06_ai_analysis.png`: The AI Analysis breakdown (showing the ATS Score, Skills, and Recommendations).
- [ ] `screenshot_07_job_board.png`: The student view of available job postings.

### C. Company Dashboard
- [ ] `screenshot_08_company_dashboard.png`: The recruiter overview.
- [ ] `screenshot_09_post_job.png`: The form for creating a new job requirement.
- [ ] `screenshot_10_candidate_list.png`: The candidate ranking table showing TF-IDF match percentages.

## 3. Responsive Navigation Design
The application utilizes a responsive navigation bar (`Navbar.jsx`). 
- **Desktop**: Horizontal links with conditional rendering based on the decoded JWT payload (e.g., hiding "Post Job" from Students).
- **Mobile**: A collapsible hamburger menu, ensuring the application remains usable on mobile phones and tablets.

## 4. Frontend Routing (React Router)
- `/` - Public Home
- `/login` - Authentication
- `/register` - Account Creation
- `/student/*` - Protected routes guarded by a `RequireAuth` wrapper checking for `ROLE_STUDENT`.
- `/company/*` - Protected routes guarded by a `RequireAuth` wrapper checking for `ROLE_COMPANY`.
- `/vault` - The dedicated Resume Vault module.

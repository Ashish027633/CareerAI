import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { ProtectedRoute } from './ProtectedRoute';

// Public Pages
import { LandingPage } from '../pages/public/LandingPage';
import { AboutPage } from '../pages/public/AboutPage';
import { FeaturesPage } from '../pages/public/FeaturesPage';
import { JobsPreviewPage } from '../pages/public/JobsPreviewPage';
import { CompaniesPreviewPage } from '../pages/public/CompaniesPreviewPage';

// Auth Pages
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';

// Student Pages
import { StudentDashboard } from '../pages/student/StudentDashboard';
import { StudentProfilePage } from '../pages/student/StudentProfilePage';
import { StudentResumePage } from '../pages/student/StudentResumePage';
import { ResumeAnalysisPage } from '../pages/student/ResumeAnalysisPage';
import { StudentJobsPage } from '../pages/student/StudentJobsPage';
import { JobDetailsPage } from '../pages/student/JobDetailsPage';
import { StudentApplicationsPage } from '../pages/student/StudentApplicationsPage';
import { StudentInterviewsPage } from '../pages/student/StudentInterviewsPage';
import { StudentNotificationsPage } from '../pages/student/StudentNotificationsPage';
import { StudentSettingsPage } from '../pages/student/StudentSettingsPage';

// Company Pages
import { CompanyDashboard } from '../pages/company/CompanyDashboard';
import { CompanyJobsPage } from '../pages/company/CompanyJobsPage';
import { CompanyJobCreatePage } from '../pages/company/CompanyJobCreatePage';
import { CompanyApplicantsPage } from '../pages/company/CompanyApplicantsPage';
import { CompanyProfilePage } from '../pages/company/CompanyProfilePage';
import { CompanySettingsPage } from '../pages/company/CompanySettingsPage';

// Admin Pages
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminStudentsPage } from '../pages/admin/AdminStudentsPage';
import { AdminCompaniesPage } from '../pages/admin/AdminCompaniesPage';
import { AdminJobsPage } from '../pages/admin/AdminJobsPage';
import { AdminApplicationsPage } from '../pages/admin/AdminApplicationsPage';
import { AdminSettingsPage } from '../pages/admin/AdminSettingsPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* 1. PUBLIC ROUTES */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/jobs" element={<JobsPreviewPage />} />
        <Route path="/companies" element={<CompaniesPreviewPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* 2. STUDENT PROTECTED ROUTES */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRole="student">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/student/dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="profile" element={<StudentProfilePage />} />
        <Route path="resume" element={<StudentResumePage />} />
        <Route path="resume-analysis" element={<ResumeAnalysisPage />} />
        <Route path="jobs" element={<StudentJobsPage />} />
        <Route path="jobs/:id" element={<JobDetailsPage />} />
        <Route path="applications" element={<StudentApplicationsPage />} />
        <Route path="interviews" element={<StudentInterviewsPage />} />
        <Route path="notifications" element={<StudentNotificationsPage />} />
        <Route path="settings" element={<StudentSettingsPage />} />
      </Route>

      {/* 3. COMPANY PROTECTED ROUTES */}
      <Route
        path="/company"
        element={
          <ProtectedRoute allowedRole="company">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/company/dashboard" replace />} />
        <Route path="dashboard" element={<CompanyDashboard />} />
        <Route path="jobs" element={<CompanyJobsPage />} />
        <Route path="jobs/create" element={<CompanyJobCreatePage />} />
        <Route path="jobs/:id" element={<Navigate to="applicants" replace />} />
        <Route path="jobs/:id/applicants" element={<CompanyApplicantsPage />} />
        <Route path="profile" element={<CompanyProfilePage />} />
        <Route path="settings" element={<CompanySettingsPage />} />
      </Route>

      {/* 4. ADMIN PROTECTED ROUTES */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="students" element={<AdminStudentsPage />} />
        <Route path="companies" element={<AdminCompaniesPage />} />
        <Route path="jobs" element={<AdminJobsPage />} />
        <Route path="applications" element={<AdminApplicationsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>

      {/* 5. CATCH-ALL */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

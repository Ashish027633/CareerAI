import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullPage message="Verifying session..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    // Redirect to the correct role dashboard
    const fallbackPath =
      role === 'admin'
        ? '/admin/dashboard'
        : role === 'company'
        ? '/company/dashboard'
        : '/student/dashboard';
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
};

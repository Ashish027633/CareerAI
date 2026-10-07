import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api/authService';
import { USER_ROLES } from '../constants/roles';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize mock session
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await authService.login(credentials);
      setUser(res.user);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const registerStudent = async (studentData) => {
    setLoading(true);
    try {
      const res = await authService.registerStudent(studentData);
      setUser(res.user);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const registerCompany = async (companyData) => {
    setLoading(true);
    try {
      const res = await authService.registerCompany(companyData);
      setUser(res.user);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    return await authService.googleLogin();
  };

  const forgotPassword = async (email) => {
    return await authService.forgotPassword(email);
  };

  const switchRole = async (targetRole) => {
    setLoading(true);
    try {
      const res = await authService.switchRole(targetRole);
      setUser(res.user);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    role: user?.role || USER_ROLES.STUDENT,
    isAuthenticated: !!user,
    loading,
    login,
    registerStudent,
    registerCompany,
    googleLogin,
    forgotPassword,
    switchRole,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

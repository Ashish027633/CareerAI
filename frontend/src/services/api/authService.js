import { simulateDelay } from './client';
import { MOCK_STUDENT_USER, MOCK_COMPANY_USER, MOCK_ADMIN_USER } from '../../data/mock/users';

const STORAGE_KEY = 'careerai_auth_user';

export const authService = {
  /**
   * Log in user by role or credentials
   */
  async login({ email, password, role = 'student' }) {
    await simulateDelay(350);
    let user;
    if (role === 'admin' || email.includes('admin')) {
      user = { ...MOCK_ADMIN_USER };
    } else if (role === 'company' || email.includes('recruiter') || email.includes('company')) {
      user = { ...MOCK_COMPANY_USER };
    } else {
      user = { ...MOCK_STUDENT_USER };
    }

    const token = `mock_jwt_token_${user.id}_${Date.now()}`;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    localStorage.setItem('careerai_token', token);
    return { success: true, user, token };
  },

  /**
   * Register a new student account
   */
  async registerStudent(studentData) {
    await simulateDelay(400);
    const newUser = {
      ...MOCK_STUDENT_USER,
      id: `usr_std_${Date.now()}`,
      fullName: studentData.fullName,
      email: studentData.email,
      phone: studentData.phone,
      college: studentData.college,
      branch: studentData.branch,
      graduationYear: Number(studentData.graduationYear) || 2026,
      role: 'student',
    };
    const token = `mock_jwt_token_${newUser.id}`;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    localStorage.setItem('careerai_token', token);
    return { success: true, user: newUser, token };
  },

  /**
   * Register a new company account
   */
  async registerCompany(companyData) {
    await simulateDelay(400);
    const newUser = {
      ...MOCK_COMPANY_USER,
      id: `usr_cmp_${Date.now()}`,
      companyName: companyData.companyName,
      email: companyData.officialEmail,
      industry: companyData.industry,
      website: companyData.website,
      role: 'company',
      verified: false,
    };
    const token = `mock_jwt_token_${newUser.id}`;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    localStorage.setItem('careerai_token', token);
    return { success: true, user: newUser, token };
  },

  /**
   * Google Sign-In UI mock flow
   * Clearly alerts that real Google OAuth 2.0 will connect in Phase 2 backend
   */
  async googleLogin() {
    await simulateDelay(600);
    return {
      success: false,
      isMockNotice: true,
      message: 'Google authentication will be connected during backend integration.',
    };
  },

  /**
   * Request password reset instructions
   */
  async forgotPassword(email) {
    await simulateDelay(500);
    return {
      success: true,
      message: `If an account with ${email} exists, password reset instructions have been dispatched.`,
    };
  },

  /**
   * Fast role-switcher for development & demonstration testing
   */
  async switchRole(targetRole) {
    await simulateDelay(150);
    let user;
    if (targetRole === 'admin') user = { ...MOCK_ADMIN_USER };
    else if (targetRole === 'company') user = { ...MOCK_COMPANY_USER };
    else user = { ...MOCK_STUDENT_USER };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return { success: true, user };
  },

  /**
   * Get current stored session
   */
  getCurrentUser() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse stored user', e);
    }
    // Default to student if no session exists yet
    return MOCK_STUDENT_USER;
  },

  /**
   * Log out current session
   */
  async logout() {
    await simulateDelay(150);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('careerai_token');
    return { success: true };
  },
};

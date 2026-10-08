import apiClient, { simulateDelay } from './client';
import { MOCK_STUDENT_USER, MOCK_COMPANY_USER, MOCK_ADMIN_USER } from '../../data/mock/users';

const STORAGE_KEY = 'careerai_auth_user';

export const authService = {
  /**
   * Log in user by role or credentials
   */
  async login({ email, password, role = 'student' }) {
    const response = await apiClient.post('/auth/login', { email, password });
    const { token, user } = response.data;
    
    // Normalize user role mapping for frontend UI components expecting lowercase
    if (user.role) {
      user.role = user.role.replace('ROLE_', '').toLowerCase();
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    localStorage.setItem('careerai_token', token);
    return { success: true, user, token };
  },

  /**
   * Register a new student account
   */
  async registerStudent(studentData) {
    const response = await apiClient.post('/auth/register/student', studentData);
    const { token, user } = response.data;
    
    if (user.role) {
      user.role = user.role.replace('ROLE_', '').toLowerCase();
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    localStorage.setItem('careerai_token', token);
    return { success: true, user, token };
  },

  /**
   * Register a new company account
   */
  async registerCompany(companyData) {
    const response = await apiClient.post('/auth/register/company', companyData);
    const { token, user } = response.data;
    
    if (user.role) {
      user.role = user.role.replace('ROLE_', '').toLowerCase();
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    localStorage.setItem('careerai_token', token);
    return { success: true, user, token };
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
    // Return null if no valid session exists
    return null;
  },

  /**
   * Log out current session
   */
  async logout() {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.warn('Logout API failed, proceeding with local cleanup', error);
    }
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('careerai_token');
    return { success: true };
  },
};

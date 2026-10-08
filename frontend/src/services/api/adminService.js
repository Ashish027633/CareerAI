import apiClient, { simulateDelay } from './client';
import {
  MOCK_ADMIN_METRICS,
  MOCK_ADMIN_STUDENTS,
  MOCK_ADMIN_COMPANIES,
} from '../../data/mock/adminMetrics';

let studentsList = [...MOCK_ADMIN_STUDENTS];
let companiesList = [...MOCK_ADMIN_COMPANIES];

export const adminService = {
  /**
   * Get platform-wide KPIs and chart metrics
   */
  async getMetrics() {
    const response = await apiClient.get('/admin/metrics');
    // Map backend DTO to frontend format if necessary
    // Backend returns: totalStudents, totalCompanies, totalJobs, activeJobs, totalApplications, placementRate
    // Frontend expects: totalStudents, totalCompanies, totalJobs, activeJobs, applications, placementRate, monthlyTrends
    if (response && response.data) {
      // Mock monthly trends since backend doesn't provide it yet
      response.data.monthlyTrends = MOCK_ADMIN_METRICS.monthlyTrends; 
      response.data.applications = response.data.totalApplications; // map property
    }
    return response;
  },

  /**
   * Get students directory with search & filter
   */
  async getStudents(query = '') {
    const response = await apiClient.get('/admin/students');
    // Frontend expects filtering, if the backend doesn't support query params, we filter it here for compatibility
    if (response && response.data && query) {
      const q = query.toLowerCase();
      response.data = response.data.filter(
        (s) =>
          s.fullName?.toLowerCase().includes(q) ||
          s.email?.toLowerCase().includes(q) ||
          s.branch?.toLowerCase().includes(q)
      );
    }
    return response;
  },

  /**
   * Toggle student active status
   */
  async toggleStudentStatus(studentId) {
    throw new Error('Toggle student status API not yet integrated');
  },

  /**
   * Get companies directory
   */
  async getCompanies(query = '') {
    const response = await apiClient.get('/admin/companies');
    // Frontend expects filtering
    if (response && response.data && query) {
      const q = query.toLowerCase();
      response.data = response.data.filter(
        (c) =>
          c.companyName?.toLowerCase().includes(q) ||
          c.email?.toLowerCase().includes(q) ||
          c.industry?.toLowerCase().includes(q)
      );
    }
    return response;
  },

  /**
   * Toggle company verification status
   */
  async toggleCompanyStatus(companyId) {
    throw new Error('Toggle company status API not yet integrated');
  },
};

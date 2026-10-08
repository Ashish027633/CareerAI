import apiClient from './client';

export const adminService = {
  /**
   * Get platform-wide KPIs and chart metrics
   */
  async getMetrics() {
    const response = await apiClient.get('/admin/metrics');
    if (response && response.data) {
      response.data.applications = response.data.totalApplications || 0;
      response.data.monthlyTrends = []; 
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

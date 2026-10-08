import apiClient from './client';
export const companyService = {
  /**
   * Get company dashboard metrics
   */
  async getDashboardStats() {
    const response = await apiClient.get('/company/dashboard/stats');
    return response;
  },

  async getProfile() {
    const response = await apiClient.get('/company/profile');
    return response;
  },

  /**
   * Update company profile details
   */
  async updateProfile(updatedData) {
    const response = await apiClient.put('/company/profile', updatedData);
    return response;
  },
};

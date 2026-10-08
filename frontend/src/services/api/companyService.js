import apiClient, { simulateDelay } from './client';
import { MOCK_COMPANY_APPLICANTS } from '../../data/mock/applications';

export const companyService = {
  /**
   * Get company dashboard metrics
   */
  async getDashboardStats() {
    await simulateDelay(250);
    return {
      success: true,
      data: {
        activeJobs: 8,
        totalApplicants: MOCK_COMPANY_APPLICANTS.length + 37,
        shortlisted: 18,
        interviews: 9,
        selected: 4,
      },
    };
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

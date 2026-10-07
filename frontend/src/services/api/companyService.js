import { simulateDelay } from './client';
import { MOCK_COMPANY_USER } from '../../data/mock/users';
import { MOCK_JOBS } from '../../data/mock/jobs';
import { MOCK_COMPANY_APPLICANTS } from '../../data/mock/applications';

let companyProfile = { ...MOCK_COMPANY_USER };

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

  /**
   * Get company profile details
   */
  async getProfile() {
    await simulateDelay(200);
    return { success: true, data: companyProfile };
  },

  /**
   * Update company profile details
   */
  async updateProfile(updatedData) {
    await simulateDelay(350);
    companyProfile = { ...companyProfile, ...updatedData };
    return { success: true, data: companyProfile, message: 'Company profile updated successfully' };
  },
};

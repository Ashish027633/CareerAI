import apiClient from './client';

export const studentService = {
  /**
   * Get authenticated student's profile
   */
  async getMyProfile() {
    const response = await apiClient.get('/student/profile');
    return response;
  },

  /**
   * Update student profile
   */
  async updateProfile(profileData) {
    const response = await apiClient.put('/student/profile', profileData);
    return response;
  }
};

import apiClient from './client';

export const interviewService = {
  async getMyInterviews() {
    const response = await apiClient.get('/interviews/my');
    return response;
  },

  async getMyCompanyInterviews() {
    const response = await apiClient.get('/company/interviews');
    return response;
  },

  async scheduleInterview(interviewData) {
    const response = await apiClient.post('/company/interviews', interviewData);
    return response;
  },

  async updateInterview(id, data) {
    const response = await apiClient.put(`/interviews/${id}`, data);
    return response;
  },

  async cancelInterview(id) {
    const response = await apiClient.delete(`/interviews/${id}`);
    return response;
  }
};

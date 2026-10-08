import apiClient from './client';

export const resumeService = {
  /**
   * Fetch current uploaded resume
   */
  async getResume() {
    const response = await apiClient.get('/resumes/my-resume');
    return response;
  },

  /**
   * Upload / Replace resume file
   */
  async uploadResume(file) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post('/resumes/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },

  /**
   * Delete resume
   */
  async deleteResume(id) {
    const response = await apiClient.delete(`/resumes/${id}`);
    return response;
  },

  /**
   * Get resume analysis breakdown from Spring Boot
   */
  async getAnalysis() {
    const response = await apiClient.get('/resumes/analysis');
    return response;
  },

  /**
   * Trigger AI re-analysis via Spring Boot
   */
  async reanalyze() {
    const response = await apiClient.post('/resumes/analyze');
    return response;
  },
};

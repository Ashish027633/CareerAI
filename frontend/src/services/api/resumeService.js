import apiClient, { simulateDelay } from './client';
import { MOCK_RESUME_ANALYSIS, MOCK_ACTIVE_RESUME } from '../../data/mock/resumes';

let currentResume = { ...MOCK_ACTIVE_RESUME };
let currentAnalysis = { ...MOCK_RESUME_ANALYSIS };

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
   * Get resume analysis breakdown
   */
  async getAnalysis() {
    await simulateDelay(300);
    return { success: true, data: currentAnalysis };
  },

  /**
   * Trigger AI re-analysis
   */
  async reanalyze() {
    await simulateDelay(700);
    currentAnalysis = {
      ...currentAnalysis,
      overallScore: 84,
      analyzedAt: new Date().toISOString(),
    };
    return { success: true, data: currentAnalysis, message: 'Resume re-analyzed with updated parameters' };
  },
};

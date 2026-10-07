import { simulateDelay } from './client';
import { MOCK_ACTIVE_RESUME, MOCK_RESUME_ANALYSIS } from '../../data/mock/resumes';

let currentResume = { ...MOCK_ACTIVE_RESUME };
let currentAnalysis = { ...MOCK_RESUME_ANALYSIS };

export const resumeService = {
  /**
   * Fetch current uploaded resume
   */
  async getResume() {
    await simulateDelay(250);
    return { success: true, data: currentResume };
  },

  /**
   * Upload / Replace resume file
   */
  async uploadResume(file) {
    await simulateDelay(600);
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
    currentResume = {
      id: `res_${Date.now()}`,
      fileName: file.name,
      fileSize: `${sizeInMB} MB`,
      fileSizeBytes: file.size,
      fileType: file.type || 'application/pdf',
      uploadedAt: new Date().toISOString(),
      status: 'Ready & Analyzed',
      version: 'v2.5',
      downloadUrl: '#',
    };
    return { success: true, data: currentResume, message: 'Resume uploaded and processed successfully' };
  },

  /**
   * Delete resume
   */
  async deleteResume() {
    await simulateDelay(300);
    currentResume = null;
    return { success: true, message: 'Resume removed successfully' };
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

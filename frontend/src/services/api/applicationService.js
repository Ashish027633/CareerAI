import apiClient from './client';

export const applicationService = {
  /**
   * Get student's submitted applications
   */
  async getMyApplications() {
    const response = await apiClient.get('/applications/my');
    return response;
  },

  /**
   * Submit new job application
   */
  async applyForJob(job, customNote = '') {
    const response = await apiClient.post(`/jobs/${job.id}/apply`, { notes: customNote });
    return response;
  },

  /**
   * Get applicants for a specific company job
   */
  async getApplicantsByJobId(jobId) {
    const response = await apiClient.get(`/company/jobs/${jobId}/applicants`);
    return response;
  },

  /**
   * Update applicant status (Shortlist, Reject, Interview, etc.)
   */
  async updateApplicantStatus(applicantId, status) {
    const response = await apiClient.patch(`/company/applications/${applicantId}/status`, { status });
    return response;
  },
};

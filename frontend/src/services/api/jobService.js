import apiClient from './client';

export const jobService = {
  /**
   * Get list of active jobs with filtering and search
   */
  async getJobs(filters = {}) {
    // The backend /api/jobs currently doesn't support query params filtering out-of-the-box in Phase 2B.
    // We will fetch all and filter in frontend for now, or just send params if backend supports it.
    const response = await apiClient.get('/jobs', { params: filters });
    
    // Some frontend UI components expect data and total.
    if (response && response.data) {
      let results = response.data;
      
      // Perform frontend filtering if backend didn't (temporary fallback for Phase 2C)
      if (filters.search) {
        const q = filters.search.toLowerCase();
        results = results.filter(
          (j) =>
            j.title?.toLowerCase().includes(q) ||
            j.companyName?.toLowerCase().includes(q)
        );
      }
      if (filters.location && filters.location !== 'all') {
        results = results.filter((j) => j.location?.toLowerCase().includes(filters.location.toLowerCase()));
      }
      
      response.data = results;
      response.total = results.length;
    }
    
    return response;
  },

  /**
   * Get a single job by ID
   */
  async getJobById(id) {
    const response = await apiClient.get(`/jobs/${id}`);
    return response;
  },
  
  /**
   * Get jobs created by current company
   */
  async getCompanyJobs() {
    const response = await apiClient.get('/company/jobs');
    return response;
  },

  /**
   * Create a new job posting (Company action)
   */
  async createJob(newJobData) {
    const response = await apiClient.post('/company/jobs', newJobData);
    return response;
  },

  /**
   * Update existing job posting
   */
  async updateJob(id, updatedFields) {
    const response = await apiClient.put(`/company/jobs/${id}`, updatedFields);
    return response;
  },

  /**
   * Toggle job status (Active / Paused)
   */
  async toggleJobStatus(id, currentStatus) {
    // Since we don't have a specific PATCH status endpoint in backend Phase 2B,
    // we use the PUT update endpoint with the toggled status.
    const updatedFields = { isActive: !currentStatus };
    const response = await apiClient.put(`/company/jobs/${id}`, updatedFields);
    return response;
  },

  /**
   * Delete job posting
   */
  async deleteJob(id) {
    const response = await apiClient.delete(`/company/jobs/${id}`);
    return response;
  },
};

import { simulateDelay } from './client';
import { MOCK_JOBS } from '../../data/mock/jobs';

let jobsDatabase = [...MOCK_JOBS];

export const jobService = {
  /**
   * Get list of jobs with filtering and search
   */
  async getJobs(filters = {}) {
    await simulateDelay(250);
    let results = [...jobsDatabase];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.requiredSkills.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (filters.location && filters.location !== 'all') {
      results = results.filter((j) =>
        j.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.jobType && filters.jobType !== 'all') {
      results = results.filter((j) => j.jobType.toLowerCase() === filters.jobType.toLowerCase());
    }

    if (filters.minMatch) {
      results = results.filter((j) => j.matchPercentage >= Number(filters.minMatch));
    }

    if (filters.skill && filters.skill !== 'all') {
      results = results.filter((j) =>
        j.requiredSkills.some((s) => s.toLowerCase() === filters.skill.toLowerCase())
      );
    }

    if (filters.sortBy === 'match') {
      results.sort((a, b) => b.matchPercentage - a.matchPercentage);
    } else if (filters.sortBy === 'recent') {
      results.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    } else if (filters.sortBy === 'salary') {
      results.sort((a, b) => b.salaryMax - a.salaryMax);
    }

    return { success: true, data: results, total: results.length };
  },

  /**
   * Get a single job by ID
   */
  async getJobById(id) {
    await simulateDelay(200);
    const job = jobsDatabase.find((j) => j.id === id);
    if (!job) {
      return { success: false, error: 'Job not found' };
    }
    return { success: true, data: job };
  },

  /**
   * Create a new job posting (Company action)
   */
  async createJob(newJobData) {
    await simulateDelay(400);
    const created = {
      ...newJobData,
      id: `job_${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
      active: true,
      applicantCount: 0,
      matchPercentage: Math.floor(Math.random() * 20) + 75,
      matchedSkills: newJobData.requiredSkills?.slice(0, 3) || [],
      missingSkills: newJobData.requiredSkills?.slice(3) || [],
    };
    jobsDatabase.unshift(created);
    return { success: true, data: created, message: 'Job listing posted successfully' };
  },

  /**
   * Update existing job posting
   */
  async updateJob(id, updatedFields) {
    await simulateDelay(350);
    const idx = jobsDatabase.findIndex((j) => j.id === id);
    if (idx === -1) return { success: false, error: 'Job not found' };

    jobsDatabase[idx] = { ...jobsDatabase[idx], ...updatedFields };
    return { success: true, data: jobsDatabase[idx], message: 'Job updated successfully' };
  },

  /**
   * Toggle job status (Active / Paused)
   */
  async toggleJobStatus(id) {
    await simulateDelay(250);
    const idx = jobsDatabase.findIndex((j) => j.id === id);
    if (idx === -1) return { success: false, error: 'Job not found' };

    jobsDatabase[idx].active = !jobsDatabase[idx].active;
    return {
      success: true,
      data: jobsDatabase[idx],
      message: `Job ${jobsDatabase[idx].active ? 'activated' : 'deactivated'} successfully`,
    };
  },

  /**
   * Delete job posting
   */
  async deleteJob(id) {
    await simulateDelay(300);
    jobsDatabase = jobsDatabase.filter((j) => j.id !== id);
    return { success: true, message: 'Job listing deleted successfully' };
  },
};

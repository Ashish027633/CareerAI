import { simulateDelay } from './client';
import { MOCK_STUDENT_APPLICATIONS, MOCK_COMPANY_APPLICANTS } from '../../data/mock/applications';

let studentApplications = [...MOCK_STUDENT_APPLICATIONS];
let companyApplicants = [...MOCK_COMPANY_APPLICANTS];

export const applicationService = {
  /**
   * Get student's submitted applications
   */
  async getMyApplications() {
    await simulateDelay(250);
    return { success: true, data: [...studentApplications] };
  },

  /**
   * Submit new job application
   */
  async applyForJob(job, customNote = '') {
    await simulateDelay(450);

    const existing = studentApplications.find((a) => a.jobId === job.id);
    if (existing) {
      return { success: false, error: 'You have already applied for this position' };
    }

    const newApp = {
      id: `app_${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      companyLogo: job.companyLogo,
      location: job.location,
      appliedDate: new Date().toISOString().split('T')[0],
      matchPercentage: job.matchPercentage,
      resumeScore: 82,
      status: 'Applied',
      timeline: [
        { step: 'Applied', date: new Date().toISOString().split('T')[0], completed: true, current: true },
        { step: 'Under Review', date: null, completed: false },
        { step: 'Shortlisted', date: null, completed: false },
        { step: 'Interview', date: null, completed: false },
        { step: 'Selected', date: null, completed: false },
      ],
      notes: customNote || 'Application received by recruitment team.',
    };

    studentApplications.unshift(newApp);

    // Also add to company applicants pool for demo consistency
    companyApplicants.unshift({
      id: `app_cand_${Date.now()}`,
      jobId: job.id,
      candidateName: 'Ashish Sharma',
      candidateEmail: 'ashish.sharma@college.edu',
      college: 'National Institute of Engineering & Technology',
      branch: 'Computer Science & Engineering',
      graduationYear: 2026,
      cgpa: 8.1,
      resumeScore: 82,
      matchPercentage: job.matchPercentage,
      skills: job.matchedSkills || ['Java', 'Spring Boot', 'MySQL'],
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Applied',
      resumeUrl: '#',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    });

    return { success: true, data: newApp, message: 'Application submitted successfully!' };
  },

  /**
   * Get applicants for a specific company job
   */
  async getApplicantsByJobId(jobId) {
    await simulateDelay(250);
    const applicants = companyApplicants.filter((a) => !jobId || a.jobId === jobId);
    return { success: true, data: applicants };
  },

  /**
   * Update applicant status (Shortlist, Reject, Interview, etc.)
   */
  async updateApplicantStatus(applicantId, status) {
    await simulateDelay(300);
    const idx = companyApplicants.findIndex((a) => a.id === applicantId);
    if (idx !== -1) {
      companyApplicants[idx].status = status;
      // Also sync student app if it's Ashish
      if (companyApplicants[idx].candidateName.includes('Ashish')) {
        const studentIdx = studentApplications.findIndex((s) => s.jobId === companyApplicants[idx].jobId);
        if (studentIdx !== -1) {
          studentApplications[studentIdx].status = status;
        }
      }
      return { success: true, data: companyApplicants[idx], message: `Status updated to ${status}` };
    }
    return { success: false, error: 'Applicant record not found' };
  },
};

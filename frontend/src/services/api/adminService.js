import { simulateDelay } from './client';
import {
  MOCK_ADMIN_METRICS,
  MOCK_ADMIN_STUDENTS,
  MOCK_ADMIN_COMPANIES,
} from '../../data/mock/adminMetrics';

let studentsList = [...MOCK_ADMIN_STUDENTS];
let companiesList = [...MOCK_ADMIN_COMPANIES];

export const adminService = {
  /**
   * Get platform-wide KPIs and chart metrics
   */
  async getMetrics() {
    await simulateDelay(250);
    return { success: true, data: MOCK_ADMIN_METRICS };
  },

  /**
   * Get students directory with search & filter
   */
  async getStudents(query = '') {
    await simulateDelay(200);
    let list = [...studentsList];
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.branch.toLowerCase().includes(q)
      );
    }
    return { success: true, data: list, total: list.length };
  },

  /**
   * Toggle student active status
   */
  async toggleStudentStatus(studentId) {
    await simulateDelay(250);
    const idx = studentsList.findIndex((s) => s.id === studentId);
    if (idx !== -1) {
      studentsList[idx].status = studentsList[idx].status === 'Active' ? 'Flagged' : 'Active';
      return { success: true, data: studentsList[idx] };
    }
    return { success: false, error: 'Student not found' };
  },

  /**
   * Get companies directory
   */
  async getCompanies(query = '') {
    await simulateDelay(200);
    let list = [...companiesList];
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.industry.toLowerCase().includes(q)
      );
    }
    return { success: true, data: list, total: list.length };
  },

  /**
   * Toggle company verification status
   */
  async toggleCompanyStatus(companyId) {
    await simulateDelay(250);
    const idx = companiesList.findIndex((c) => c.id === companyId);
    if (idx !== -1) {
      companiesList[idx].status =
        companiesList[idx].status === 'Verified' ? 'Suspended' : 'Verified';
      return { success: true, data: companiesList[idx] };
    }
    return { success: false, error: 'Company not found' };
  },
};

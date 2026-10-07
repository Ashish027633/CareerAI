import { simulateDelay } from './client';
import { MOCK_INTERVIEWS } from '../../data/mock/interviews';

let interviews = [...MOCK_INTERVIEWS];

export const interviewService = {
  async getMyInterviews() {
    await simulateDelay(200);
    return { success: true, data: [...interviews] };
  },

  async scheduleInterview(interviewData) {
    await simulateDelay(350);
    const created = {
      ...interviewData,
      id: `int_${Date.now()}`,
      status: 'Upcoming',
    };
    interviews.unshift(created);
    return { success: true, data: created, message: 'Interview scheduled successfully' };
  },
};

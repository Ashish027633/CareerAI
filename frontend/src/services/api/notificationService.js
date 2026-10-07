import { simulateDelay } from './client';
import { MOCK_NOTIFICATIONS } from '../../data/mock/notifications';

let notificationsList = [...MOCK_NOTIFICATIONS];

export const notificationService = {
  async getNotifications() {
    await simulateDelay(200);
    return { success: true, data: [...notificationsList] };
  },

  async markAsRead(id) {
    await simulateDelay(150);
    const item = notificationsList.find((n) => n.id === id);
    if (item) item.read = true;
    return { success: true, data: [...notificationsList] };
  },

  async markAllAsRead() {
    await simulateDelay(200);
    notificationsList.forEach((n) => (n.read = true));
    return { success: true, data: [...notificationsList] };
  },
};

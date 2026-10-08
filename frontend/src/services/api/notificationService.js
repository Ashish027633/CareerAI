import apiClient from './client';

export const notificationService = {
  async getNotifications() {
    const response = await apiClient.get('/notifications');
    return response;
  },

  async markAsRead(id) {
    const response = await apiClient.patch(`/notifications/${id}/read`);
    return response;
  },

  async markAllAsRead() {
    const response = await apiClient.patch('/notifications/read-all');
    return response;
  },
};

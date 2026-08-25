export type NotificationData = {
  title?: string;
  message?: string;
  description?: string;
  body?: string;
  action_url?: string;
  action_label?: string;
  [key: string]: unknown;
};

export type UserNotification = {
  id: string;
  type: string;
  data: NotificationData;
  created_at: string;
};

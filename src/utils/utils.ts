import { NOTIFICATION_TYPES, NotificationInfoType } from '@UI';

export const showError = (
  err: unknown,
  notificationHandler: (notification: NotificationInfoType) => void,
) => {
  let msg = 'Unknown error';
  if (err instanceof Error) msg = err.message;

  console.error(err);
  notificationHandler({
    message: msg,
    type: NOTIFICATION_TYPES.error,
  });
};

import { ValuesType } from "../../utils/types";

export const NOTIFICATION_TYPES = {
  success: "success",
  error: "error",
  info: "info",
  warning: "warning",
} as const;

type NotificationType = ValuesType<typeof NOTIFICATION_TYPES>;

export type SnackbarStateType = {
  open: boolean;
  message: string;
  type: NotificationType;
};

export type NotificationInfoType = Omit<SnackbarStateType, "open">;

import { Alert, Snackbar } from "@mui/material";
import { SnackbarStateType } from "./types";

type NotificationsProps = {
  snackbarState: SnackbarStateType;
  onClose: () => void;
};

export function Notifications({ snackbarState, onClose }: NotificationsProps) {
  return (
    <Snackbar
      open={snackbarState.open}
      onClose={onClose}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
      sx={{ maxWidth: "500px" }}
    >
      <Alert severity={snackbarState.type} onClose={onClose} variant="filled">
        {snackbarState.message}
      </Alert>
    </Snackbar>
  );
}

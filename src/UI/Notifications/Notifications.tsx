import { Alert, Snackbar } from '@mui/material';
import { useNotificationsContext } from '@store';

export function Notifications() {
  const { snackbarState, hideNotification } = useNotificationsContext();
  return (
    <Snackbar
      open={snackbarState.open}
      onClose={hideNotification}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      sx={{ maxWidth: '500px' }}>
      <Alert
        severity={snackbarState.type}
        onClose={hideNotification}
        variant="filled">
        {snackbarState.message}
      </Alert>
    </Snackbar>
  );
}

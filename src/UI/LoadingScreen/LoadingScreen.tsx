import { Backdrop, CircularProgress } from '@mui/material';

export function LoadingScreen() {
  return (
    <Backdrop open invisible>
      <CircularProgress disableShrink />
    </Backdrop>
  );
}

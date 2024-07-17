import { ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';
import { theme } from '../theme';
import { GeometryStore } from './GeometryContext';
import { NotificationsStore } from './NotificationsContext';

type GlobalStoreProps = {
  children: ReactNode | ReactNode[];
};

export function GlobalStore({ children }: GlobalStoreProps) {
  return (
    <ThemeProvider theme={theme}>
      <GeometryStore>
        <NotificationsStore>{children}</NotificationsStore>
      </GeometryStore>
    </ThemeProvider>
  );
}

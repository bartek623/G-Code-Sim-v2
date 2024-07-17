import {
  Divider,
  DrawerProps as MuiDrawerProps,
  Drawer as MuiDrawer,
} from '@mui/material';
import { ReactNode } from 'react';

import { DrawerHeader } from './DrawerHeader';

type DrawerProps = MuiDrawerProps & {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  label: string;
  onModalOpen: () => void;
};

export function Drawer({
  isOpen,
  onClose,
  children,
  label,
  onModalOpen,
  ...restDrawerProps
}: DrawerProps) {
  return (
    <MuiDrawer open={isOpen} onClose={onClose} {...restDrawerProps}>
      <DrawerHeader onClose={onClose} label={label} onModalOpen={onModalOpen} />
      <Divider />
      {children}
    </MuiDrawer>
  );
}

import { ReactNode } from "react";
import {
  Divider,
  DrawerProps as MUIDrawerProps,
  Drawer as MuiDrawer,
} from "@mui/material";

import { DrawerHeader } from "./DrawerHeader";

type DrawerProps = MUIDrawerProps & {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  label: string;
};

export function Drawer({
  isOpen,
  onClose,
  children,
  label,
  ...restDrawerProps
}: DrawerProps) {
  return (
    <MuiDrawer open={isOpen} onClose={onClose} {...restDrawerProps}>
      <DrawerHeader onClose={onClose} label={label} />
      <Divider />
      {children}
    </MuiDrawer>
  );
}

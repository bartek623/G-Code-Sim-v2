import { Divider, Drawer as MuiDrawer, TextFieldProps } from "@mui/material";
import { DrawerBtns } from "./DrawerBtns";
import { useRef } from "react";
import { CloseBtn } from "../UI";
import { DrawerTextField } from "./DrawerTextField";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Drawer({ isOpen, onClose }: DrawerProps) {
  const textFieldRef = useRef<TextFieldProps>(null);

  return (
    <MuiDrawer open={isOpen} variant="persistent">
      <CloseBtn onClose={onClose} />
      <Divider />
      <DrawerTextField textFieldRef={textFieldRef} />
      <DrawerBtns />
    </MuiDrawer>
  );
}

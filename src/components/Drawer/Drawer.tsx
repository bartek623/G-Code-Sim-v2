import { Divider, Drawer as MuiDrawer, TextFieldProps } from "@mui/material";
import { DrawerBtns } from "./DrawerBtns";
import { useRef } from "react";
import { CloseBtn } from "../UI";
import { DrawerTextField } from "./DrawerTextField";
import { convertProgramToLinesData } from "./utils";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Drawer({ isOpen, onClose }: DrawerProps) {
  const textFieldRef = useRef<TextFieldProps>(null);

  const runProgramHandler = () => {
    const program = textFieldRef.current?.value as string;
    const linesData = convertProgramToLinesData(program);

    if (!linesData) return;

    console.log(linesData);
  };

  return (
    <MuiDrawer open={isOpen} variant="persistent">
      <CloseBtn onClose={onClose} />
      <Divider />
      <DrawerTextField textFieldRef={textFieldRef} />
      <DrawerBtns onRun={runProgramHandler} />
    </MuiDrawer>
  );
}

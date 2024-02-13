import { Divider, Drawer as MuiDrawer, TextFieldProps } from "@mui/material";
import { DrawerBtns } from "./DrawerBtns";
import { useRef } from "react";
import { DrawerTextField } from "./DrawerTextField";
import { convertProgramToLinesData } from "./utils";
import { LineDataType } from "../../utils/types";
import { currentToolPosition } from "../../store/canvasStore";
import { DrawerHeader } from "./DrawerHeader";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  setLinesData: (data: LineDataType[]) => void;
};

export function Drawer({ isOpen, onClose, setLinesData }: DrawerProps) {
  const textFieldRef = useRef<TextFieldProps>(null);

  const runProgramHandler = () => {
    const program = textFieldRef.current?.value as string;
    const linesData = convertProgramToLinesData(program.trim());

    if (!linesData) return;

    currentToolPosition.x = 0;
    currentToolPosition.y = 0;
    setLinesData(linesData);
  };

  return (
    <MuiDrawer open={isOpen} variant="persistent">
      <DrawerHeader onClose={onClose} />
      <Divider />
      <DrawerTextField textFieldRef={textFieldRef} />
      <DrawerBtns onRun={runProgramHandler} />
    </MuiDrawer>
  );
}

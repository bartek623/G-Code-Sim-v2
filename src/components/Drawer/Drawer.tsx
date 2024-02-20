import { useRef } from "react";
import { Divider, Drawer as MuiDrawer, TextFieldProps } from "@mui/material";

import { DrawerBtns } from "./DrawerBtns";
import { DrawerHeader } from "./DrawerHeader";
import { DrawerTextField } from "./DrawerTextField";
import { convertProgramToLinesData } from "./utils";
import { LineDataType } from "../../utils/types";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  setLinesData: (data: LineDataType[]) => void;
  setShowGeo: (callback: (show: boolean) => boolean) => void;
};

export function Drawer({
  isOpen,
  onClose,
  setLinesData,
  setShowGeo,
}: DrawerProps) {
  const textFieldRef = useRef<TextFieldProps>(null);

  const runProgramHandler = () => {
    const program = textFieldRef.current?.value as string;
    const linesData = convertProgramToLinesData(program.trim());

    if (!linesData) return;

    setLinesData(linesData);
  };

  const toggleGeoHandler = () => {
    setShowGeo((prev) => !prev);
  };

  return (
    <MuiDrawer open={isOpen} variant="persistent">
      <DrawerHeader onClose={onClose} />
      <Divider />
      <DrawerTextField textFieldRef={textFieldRef} />
      <DrawerBtns onRun={runProgramHandler} onShowGeo={toggleGeoHandler} />
    </MuiDrawer>
  );
}

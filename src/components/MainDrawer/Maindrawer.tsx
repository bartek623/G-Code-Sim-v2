import { useRef, useState } from "react";
import { TextFieldProps } from "@mui/material";

import { Drawer } from "../UI/Drawer";
import { LineDataType } from "../../utils/types";
import { Subdrawer, subdrawerState } from "../Subdrawer";
import { convertProgramToLinesData } from "./utils";
import { DrawerTextField } from "./DrawerTextField";
import { DrawerBtns } from "./DrawerBtns";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  setLinesData: (data: LineDataType[]) => void;
  setShowGeo: (callback: (show: boolean) => boolean) => void;
  showGeo: boolean;
};

export function Maindrawer({
  isOpen,
  onClose,
  setLinesData,
  setShowGeo,
  showGeo,
}: DrawerProps) {
  const [subdrawer, setSubdrawer] = useState<subdrawerState>(undefined);
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

  const saveSubHandler = () => {
    setSubdrawer("save");
  };

  const loadSubHandler = () => {
    setSubdrawer("load");
  };

  const closeSubHandler = () => {
    setSubdrawer(undefined);
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      label="GCodeSim"
      variant="persistent"
    >
      <DrawerTextField textFieldRef={textFieldRef} />
      <DrawerBtns
        onRun={runProgramHandler}
        onShowGeo={toggleGeoHandler}
        showGeo={showGeo}
        onSubSave={saveSubHandler}
        onSubLoad={loadSubHandler}
      />
      <Subdrawer state={subdrawer} onClose={closeSubHandler} />
    </Drawer>
  );
}

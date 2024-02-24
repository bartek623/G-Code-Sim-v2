import { useRef, useState } from "react";
import { TextFieldProps } from "@mui/material";

import { Drawer } from "../../UI";
import { LineDataType } from "../../utils/types";
import { Subdrawer } from "../Subdrawer";
import { convertProgramToLinesData } from "./utils";
import { DrawerTextField } from "./DrawerTextField";
import { DrawerBtns } from "./DrawerBtns";
import {
  MAINDRAWER_LABEL,
  SUBDRAWER_DEFAULT,
  SUBDRAWER_MODES,
  subdrawerModesType,
  subdrawerState,
} from "./constants";
import {
  NOTIFICATION_TYPES,
  NotificationInfoType,
} from "../../UI/Notifications";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  setLinesData: (data: LineDataType[]) => void;
  setShowGeo: (callback: (show: boolean) => boolean) => void;
  showGeo: boolean;
  pushNotification: (notification: NotificationInfoType) => void;
};

export function Maindrawer({
  isOpen,
  onClose,
  setLinesData,
  setShowGeo,
  showGeo,
  pushNotification,
}: DrawerProps) {
  const [subdrawer, setSubdrawer] = useState<subdrawerState>(SUBDRAWER_DEFAULT);
  const textFieldRef = useRef<TextFieldProps>(null);

  const runProgramHandler = () => {
    const program = textFieldRef.current?.value as string;
    const linesData = convertProgramToLinesData(program.trim());

    if (!linesData) return;

    setLinesData(linesData);
  };

  const toggleGeoHandler = () => {
    setShowGeo((prev) => {
      const msg = `${prev ? "Hiding" : "Showing"} model`;
      pushNotification({ message: msg, type: NOTIFICATION_TYPES.info });

      return !prev;
    });
  };

  const openSubHandler = (mode: subdrawerModesType) => {
    setSubdrawer({ open: true, mode: SUBDRAWER_MODES[mode] });
  };

  const closeSubHandler = () => {
    setSubdrawer((prev) => ({ ...prev, open: false }));
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      label={MAINDRAWER_LABEL}
      variant="persistent"
    >
      <DrawerTextField textFieldRef={textFieldRef} />
      <DrawerBtns
        onRun={runProgramHandler}
        onShowGeo={toggleGeoHandler}
        showGeo={showGeo}
        onSubOpen={openSubHandler}
      />
      <Subdrawer
        state={subdrawer}
        onClose={closeSubHandler}
        textFieldRef={textFieldRef}
        pushNotification={pushNotification}
      />
    </Drawer>
  );
}

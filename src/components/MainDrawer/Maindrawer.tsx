import { useEffect, useRef, useState } from "react";
import { TextFieldProps } from "@mui/material";

import { Drawer } from "../../UI";
import { LineDataType } from "../../utils/types";
import { Subdrawer } from "../Subdrawer";
import {
  addLinesNumbering,
  convertProgramToLinesData,
  removeLinesNumbering,
} from "./utils";
import { DrawerTextField } from "./DrawerTextField";
import { MainDrawerBtns } from "./MainDrawerBtns";
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
import { showError } from "../../utils/utils";
import { InfoModal } from "./InfoModal";

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
  const [openModal, setOpenModal] = useState(false);
  const [subdrawer, setSubdrawer] = useState<subdrawerState>(SUBDRAWER_DEFAULT);
  const [numberLines, setNumberLines] = useState(false);
  const textFieldRef = useRef<TextFieldProps>(null);

  useEffect(() => {
    if (!textFieldRef.current?.value) return;
    const program = textFieldRef.current.value as string;

    textFieldRef.current.value = numberLines
      ? addLinesNumbering(program)
      : removeLinesNumbering(program);
  });

  const runProgramHandler = () => {
    try {
      if (!textFieldRef.current?.value) return;

      const program = textFieldRef.current.value as string;

      const showWarning = (message: string) => {
        pushNotification({ message, type: NOTIFICATION_TYPES.warning });
      };

      const linesData = convertProgramToLinesData(program.trim(), showWarning);

      if (!linesData) return;

      setLinesData(linesData);
    } catch (err) {
      showError(err, pushNotification);
      setLinesData([]);
    }
  };

  const toggleNumberingHandler = () => {
    setNumberLines((prev) => {
      const msg = `${prev ? "Hiding" : "Showing"} lines numbering`;
      pushNotification({ message: msg, type: NOTIFICATION_TYPES.info });

      return !prev;
    });
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

  const openModalHandler = () => {
    setOpenModal(true);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      label={MAINDRAWER_LABEL}
      variant="persistent"
      onModalOpen={openModalHandler}
    >
      <DrawerTextField textFieldRef={textFieldRef} />
      <MainDrawerBtns
        isNumbered={numberLines}
        onToggleNumbering={toggleNumberingHandler}
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
        onRun={runProgramHandler}
      />
      <InfoModal isOpen={openModal} onClose={closeModalHandler} />
    </Drawer>
  );
}

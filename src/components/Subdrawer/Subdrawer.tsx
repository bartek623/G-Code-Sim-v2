import { RefObject, useState } from "react";
import { TextFieldProps } from "@mui/material";

import {
  SUBDRAWER_LABEL,
  SUBDRAWER_MODES,
  subdrawerState,
} from "../MainDrawer/constants";
import { Drawer, NotificationInfoType } from "../../UI";
import { Save } from "./Save";
import { Load } from "./Load";
import { SaveInfoModal } from "./SaveInfoModal";
import { LoadInfoModal } from "./LoadInfoModal";

type SubdrawerProps = {
  state: subdrawerState;
  onClose: () => void;
  textFieldRef: RefObject<TextFieldProps>;
  pushNotification: (notification: NotificationInfoType) => void;
  onRun: () => void;
};

export function Subdrawer({
  state,
  onClose,
  textFieldRef,
  pushNotification,
  onRun,
}: SubdrawerProps) {
  const [openModal, setOpenModal] = useState(false);

  const openModalHandler = () => {
    setOpenModal(true);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  return (
    <Drawer
      label={SUBDRAWER_LABEL[state.mode]}
      onClose={onClose}
      isOpen={state.open}
      onModalOpen={openModalHandler}
    >
      {state.mode === SUBDRAWER_MODES.save && (
        <>
          <Save
            program={(textFieldRef.current?.value as string).trim()}
            onClose={onClose}
            pushNotification={pushNotification}
          />
          <SaveInfoModal isOpen={openModal} onClose={closeModalHandler} />
        </>
      )}
      {state.mode === SUBDRAWER_MODES.load && (
        <>
          <Load
            textFieldRef={textFieldRef}
            onClose={onClose}
            pushNotification={pushNotification}
            onRun={onRun}
          />
          <LoadInfoModal isOpen={openModal} onClose={closeModalHandler} />
        </>
      )}
    </Drawer>
  );
}

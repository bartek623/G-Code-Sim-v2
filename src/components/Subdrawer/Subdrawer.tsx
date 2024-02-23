import { RefObject } from "react";
import { TextFieldProps } from "@mui/material";

import {
  SUBDRAWER_LABEL,
  SUBDRAWER_MODES,
  subdrawerState,
} from "../MainDrawer/constants";
import { Drawer } from "../UI/Drawer";
import { SubdrawerSave } from "./SubdrawerSave";
import { SubdrawerLoad } from "./SubdrawerLoad";

type SubdrawerProps = {
  state: subdrawerState;
  onClose: () => void;
  textFieldRef: RefObject<TextFieldProps>;
};

export function Subdrawer({ state, onClose, textFieldRef }: SubdrawerProps) {
  return (
    <Drawer
      label={SUBDRAWER_LABEL[state.mode]}
      onClose={onClose}
      isOpen={state.open}
    >
      {state.mode === SUBDRAWER_MODES.save && (
        <SubdrawerSave textFieldRef={textFieldRef} onClose={onClose} />
      )}
      {state.mode === SUBDRAWER_MODES.load && (
        <SubdrawerLoad textFieldRef={textFieldRef} onClose={onClose} />
      )}
    </Drawer>
  );
}

import { RefObject } from "react";
import {
  SUBDRAWER_LABEL,
  SUBDRAWER_MODES,
  subdrawerState,
} from "../MainDrawer/constants";
import { Drawer } from "../UI/Drawer";
import { SubdrawerSave } from "./SubdrawerSave";
import { TextFieldProps } from "@mui/material";

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
        <SubdrawerSave textFieldRef={textFieldRef} />
      )}
    </Drawer>
  );
}

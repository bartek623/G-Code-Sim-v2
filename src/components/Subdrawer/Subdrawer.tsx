import { subdrawerState } from "../MainDrawer/constants";
import { Drawer } from "../UI/Drawer";

type SubdrawerProps = {
  state: subdrawerState;
  onClose: () => void;
};

export function Subdrawer({ state, onClose }: SubdrawerProps) {
  return (
    <Drawer label={state.label} onClose={onClose} isOpen={state.open}>
      asd
    </Drawer>
  );
}

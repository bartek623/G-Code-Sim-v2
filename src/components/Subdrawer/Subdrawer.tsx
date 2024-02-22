import { Drawer } from "../UI/Drawer";

export type subdrawerState = undefined | "save" | "load";

type SubdrawerProps = {
  state: subdrawerState;
  onClose: () => void;
};

export function Subdrawer({ state, onClose }: SubdrawerProps) {
  const label = state
    ? state[0].toUpperCase() + state.slice(1) + " program"
    : "";

  return (
    <Drawer label={label} onClose={onClose} isOpen={!!state}>
      asd
    </Drawer>
  );
}

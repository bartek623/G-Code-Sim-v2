import {
  FormatListNumbered,
  PlayArrow,
  Save,
  Upload,
  ViewInAr,
} from "@mui/icons-material";
import { SUBDRAWER_MODES, subdrawerModesType } from "./constants";
import { DrawerBtn } from "../../UI/Btns/DrawerBtn";
import { DrawerBtnContainer } from "../../UI/Drawer/DrawerBtnContainer";

type DrawerBtnsProps = {
  isNumbered: boolean;
  onToggleNumbering: () => void;
  onRun: () => void;
  onShowGeo: () => void;
  showGeo: boolean;
  onSubOpen: (mode: subdrawerModesType) => void;
};

export function MainDrawerBtns({
  isNumbered,
  onToggleNumbering,
  onRun,
  onShowGeo,
  showGeo,
  onSubOpen,
}: DrawerBtnsProps) {
  const onSaveHandler = () => {
    onSubOpen(SUBDRAWER_MODES.save);
  };

  const onLoadHandler = () => {
    onSubOpen(SUBDRAWER_MODES.load);
  };

  return (
    <DrawerBtnContainer padding={1} paddingX={3}>
      <DrawerBtn
        tooltip="Toggle numbering"
        onClick={onToggleNumbering}
        variant={isNumbered ? "outlined" : "contained"}
      >
        <FormatListNumbered />
      </DrawerBtn>

      <DrawerBtn
        tooltip="Show 3D model"
        onClick={onShowGeo}
        variant={showGeo ? "outlined" : "contained"}
      >
        <ViewInAr />
      </DrawerBtn>

      <DrawerBtn tooltip="Save program" onClick={onSaveHandler}>
        <Save />
      </DrawerBtn>

      <DrawerBtn tooltip="Load program" onClick={onLoadHandler}>
        <Upload />
      </DrawerBtn>

      <DrawerBtn tooltip="Run program" onClick={onRun}>
        <PlayArrow />
      </DrawerBtn>
    </DrawerBtnContainer>
  );
}

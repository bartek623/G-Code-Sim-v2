import {
  PlayArrow,
  Save,
  Upload,
  ViewInAr,
  ViewInArOutlined,
} from "@mui/icons-material";
import { SUBDRAWER_MODES, subdrawerModesType } from "./constants";
import { DrawerBtn } from "../../UI/Btns/DrawerBtn";
import { DrawerBtnContainer } from "../../UI/Drawer/DrawerBtnContainer";

type DrawerBtnsProps = {
  onRun: () => void;
  onShowGeo: () => void;
  showGeo: boolean;
  onSubOpen: (mode: subdrawerModesType) => void;
};

export function MainDrawerBtns({
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
      <DrawerBtn tooltip="Save program" onClick={onSaveHandler}>
        <Save />
      </DrawerBtn>

      <DrawerBtn tooltip="Load program" onClick={onLoadHandler}>
        <Upload />
      </DrawerBtn>

      <DrawerBtn tooltip="Show 3D model" onClick={onShowGeo}>
        {showGeo ? <ViewInArOutlined /> : <ViewInAr />}
      </DrawerBtn>

      <DrawerBtn tooltip="Run program" onClick={onRun}>
        <PlayArrow />
      </DrawerBtn>
    </DrawerBtnContainer>
  );
}

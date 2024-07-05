import {
  Add,
  Folder,
  FormatListNumbered,
  PlayArrow,
  Remove,
  Save,
  Upload,
  ViewInAr,
} from "@mui/icons-material";
import { SUBDRAWER_MODES, subdrawerModesType } from "./constants";
import { DrawerBtn } from "../../UI/Btns/DrawerBtn";
import { DrawerBtnContainer } from "../../UI/Drawer/DrawerBtnContainer";
import { ListMenu } from "../../UI/Btns/ListMenuBtn";

type DrawerBtnsProps = {
  onAddNumbering: () => void;
  onRemoveNumbering: () => void;
  onRun: () => void;
  onShowGeo: () => void;
  showGeo: boolean;
  onSubOpen: (mode: subdrawerModesType) => void;
};

export function MainDrawerBtns({
  onAddNumbering,
  onRemoveNumbering,
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
    <DrawerBtnContainer padding={1} paddingX={3} overflow="auto">
      <ListMenu
        tooltip="Add/remove lines numbering"
        listItems={[
          { action: onAddNumbering, icon: <Add />, text: "Add" },
          {
            action: onRemoveNumbering,
            icon: <Remove />,
            text: "Remove",
          },
        ]}
      >
        <FormatListNumbered />
      </ListMenu>

      <DrawerBtn
        tooltip="Show 3D model"
        onClick={onShowGeo}
        variant={showGeo ? "outlined" : "contained"}
      >
        <ViewInAr />
      </DrawerBtn>

      <ListMenu
        tooltip="Save/load program"
        listItems={[
          { action: onSaveHandler, icon: <Save />, text: "Save" },
          { action: onLoadHandler, icon: <Upload />, text: "Load" },
        ]}
      >
        <Folder />
      </ListMenu>

      <DrawerBtn tooltip="Run program" onClick={onRun}>
        <PlayArrow />
      </DrawerBtn>
    </DrawerBtnContainer>
  );
}

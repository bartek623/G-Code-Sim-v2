import {
  Add,
  FileDownload,
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
import { RefObject } from "react";
import { Group } from "three";
import { STLExporter } from "three/examples/jsm/Addons.js";

type DrawerBtnsProps = {
  onAddNumbering: () => void;
  onRemoveNumbering: () => void;
  onRun: () => void;
  onShowGeo: () => void;
  showGeo: boolean;
  onSubOpen: (mode: subdrawerModesType) => void;
  meshRef: RefObject<Group>;
};

export function MainDrawerBtns({
  onAddNumbering,
  onRemoveNumbering,
  onRun,
  onShowGeo,
  showGeo,
  onSubOpen,
  meshRef,
}: DrawerBtnsProps) {
  const onSaveHandler = () => {
    onSubOpen(SUBDRAWER_MODES.save);
  };

  const onLoadHandler = () => {
    onSubOpen(SUBDRAWER_MODES.load);
  };

  const onExportSTL = () => {
    if (!meshRef.current) return;

    const exporter = new STLExporter();
    const result = exporter.parse(meshRef.current);

    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "GCodeModel.stl";
    link.click();
    link.remove();
  };

  return (
    <DrawerBtnContainer padding={1} paddingX={3}>
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

      <DrawerBtn
        disabled={!showGeo}
        tooltip="Export model to .stl file"
        onClick={onExportSTL}
      >
        <FileDownload />
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

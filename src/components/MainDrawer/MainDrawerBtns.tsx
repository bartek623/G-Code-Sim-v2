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
import { DrawerBtn, DrawerBtnContainer, ListMenuBtn } from "@UI";
import { STLExporter } from "three/examples/jsm/Addons.js";
import { useGeometryContext } from "@store";

type DrawerBtnsProps = {
  onAddNumbering: () => void;
  onRemoveNumbering: () => void;
  onRun: () => void;
  onShowGeo: () => void;
  onSubOpen: (mode: subdrawerModesType) => void;
};

export function MainDrawerBtns({
  onAddNumbering,
  onRemoveNumbering,
  onRun,
  onShowGeo,
  onSubOpen,
}: DrawerBtnsProps) {
  const { geometryRef, showGeometry } = useGeometryContext();

  const onSaveHandler = () => {
    onSubOpen(SUBDRAWER_MODES.save);
  };

  const onLoadHandler = () => {
    onSubOpen(SUBDRAWER_MODES.load);
  };

  const onExportSTL = () => {
    if (!geometryRef.current) return;

    const exporter = new STLExporter();
    const result = exporter.parse(geometryRef.current);

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
      <ListMenuBtn
        tooltip="Add/remove lines numbering"
        listItems={[
          {
            action: onAddNumbering,
            icon: <Add />,
            text: "Add",
          },
          {
            action: onRemoveNumbering,
            icon: <Remove />,
            text: "Remove",
          },
        ]}
      >
        <FormatListNumbered />
      </ListMenuBtn>

      <DrawerBtn
        tooltip="Show 3D model"
        onClick={onShowGeo}
        variant={showGeometry ? "outlined" : "contained"}
      >
        <ViewInAr />
      </DrawerBtn>

      <DrawerBtn
        disabled={!showGeometry}
        tooltip="Export model to .stl file"
        onClick={onExportSTL}
      >
        <FileDownload />
      </DrawerBtn>

      <ListMenuBtn
        tooltip="Save/load program"
        listItems={[
          { action: onSaveHandler, icon: <Save />, text: "Save" },
          { action: onLoadHandler, icon: <Upload />, text: "Load" },
        ]}
      >
        <Folder />
      </ListMenuBtn>

      <DrawerBtn tooltip="Run program" onClick={onRun}>
        <PlayArrow />
      </DrawerBtn>
    </DrawerBtnContainer>
  );
}

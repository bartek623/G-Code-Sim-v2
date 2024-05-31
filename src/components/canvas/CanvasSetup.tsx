import { Ref } from "react";

import { CameraControls, Environment, Grid } from "@react-three/drei";
import {
  AMBIENT_LIGHT_INTENSITY,
  DARK_GREY,
  DIRECT_LIGHT_POS,
  DIRECT_LIGHT_POS2,
  GRID_CELL_SIZE,
  GRID_CELL_THICKNESS,
  GRID_FADE_DISTANCE,
  GRID_FADE_STRENGTH,
  GRID_POSITION,
  GRID_ROTATION,
  GRID_SECTION_SIZE,
  LIGHT_GREY,
} from "./constants";

type CanvasSetupProps = {
  cameraControlsRef: Ref<CameraControls>;
};

export function CanvasSetup({ cameraControlsRef }: CanvasSetupProps) {
  return (
    <>
      <ambientLight color={"#000"} intensity={AMBIENT_LIGHT_INTENSITY} />
      <directionalLight position={DIRECT_LIGHT_POS} />
      <directionalLight position={DIRECT_LIGHT_POS2} />
      <Grid
        infiniteGrid
        side={2}
        rotation={GRID_ROTATION}
        position={GRID_POSITION}
        cellSize={GRID_CELL_SIZE}
        cellThickness={GRID_CELL_THICKNESS}
        cellColor={LIGHT_GREY}
        sectionSize={GRID_SECTION_SIZE}
        sectionColor={DARK_GREY}
        fadeStrength={GRID_FADE_STRENGTH}
        fadeDistance={GRID_FADE_DISTANCE}
      />
      <CameraControls ref={cameraControlsRef} />
      <Environment preset="studio" />
    </>
  );
}

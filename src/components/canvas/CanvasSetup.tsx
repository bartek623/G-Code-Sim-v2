import { Ref } from "react";

import { CameraControls } from "@react-three/drei";
import {
  AMBIENT_LIGHT_INTENSITY,
  DARK_GREY,
  DIRECT_LIGHT_POS,
  DIRECT_LIGHT_POS2,
  GRID_DIV,
  GRID_ROTATION,
  GRID_SIZE,
  LIGHT_GREY,
} from "./constants";

type CanvasSetupProps = {
  cameraControlsRef: Ref<CameraControls>;
};

export function CanvasSetup({ cameraControlsRef }: CanvasSetupProps) {
  return (
    <>
      <ambientLight intensity={AMBIENT_LIGHT_INTENSITY} />
      <directionalLight position={DIRECT_LIGHT_POS} />
      <directionalLight position={DIRECT_LIGHT_POS2} />
      <gridHelper
        args={[GRID_SIZE, GRID_DIV, DARK_GREY, LIGHT_GREY]}
        rotation={GRID_ROTATION}
        position={[0, 0, -0.001]}
      />
      <CameraControls ref={cameraControlsRef} />
    </>
  );
}

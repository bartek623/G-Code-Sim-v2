import { useRef } from "react";

import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";

import { CanvasSetup } from "./CanvasSetup";
import { LineElement } from "./LineElement";
import { ResetBtn } from "@UI";
import { DEFAULT_CAMERA_POS } from "./constants";

export function CanvasThreeD() {
  const cameraControlsRef = useRef<CameraControls>(null!);

  const cameraResetHandler = () => {
    cameraControlsRef.current.reset(true);
  };

  return (
    <>
      <Canvas camera={{ position: DEFAULT_CAMERA_POS }}>
        <CanvasSetup cameraControlsRef={cameraControlsRef} />
        <LineElement />
      </Canvas>
      <ResetBtn onClick={cameraResetHandler} />
    </>
  );
}

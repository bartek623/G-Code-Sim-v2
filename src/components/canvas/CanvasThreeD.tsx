import { RefObject, useRef } from "react";

import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";

import { CanvasSetup } from "./CanvasSetup";
import { LineElement } from "./LineElement";
import { ResetBtn } from "../../UI";
import { LineDataType } from "../../utils/types";
import { DEFAULT_CAMERA_POS } from "./constants";
import { Group } from "three";

type CanvasThreeDProps = {
  linesData: LineDataType[];
  showGeo: boolean;
  groupRef: RefObject<Group>;
};

export function CanvasThreeD({
  linesData,
  showGeo,
  groupRef,
}: CanvasThreeDProps) {
  const cameraControlsRef = useRef<CameraControls>(null!);

  const cameraResetHandler = () => {
    cameraControlsRef.current.reset(true);
  };

  return (
    <>
      <Canvas camera={{ position: DEFAULT_CAMERA_POS }}>
        <CanvasSetup cameraControlsRef={cameraControlsRef} />
        <LineElement
          linesData={linesData}
          showGeometry={showGeo}
          groupRef={groupRef}
        />
      </Canvas>
      <ResetBtn onClick={cameraResetHandler} />
    </>
  );
}

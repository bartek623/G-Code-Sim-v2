import { useMemo, useRef } from "react";

import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";

import { CanvasSetup } from "./CanvasSetup";
import { LineElement } from "./LineElement";
import { ResetBtn } from "../../UI";
import { LineDataType } from "../../utils/types";
import { DEFAULT_CAMERA_POS } from "./constants";

type CanvasThreeDProps = {
  linesData: LineDataType[];
  showGeo: boolean;
};

export function CanvasThreeD({ linesData, showGeo }: CanvasThreeDProps) {
  const cameraControlsRef = useRef<CameraControls>(null!);

  const cameraResetHandler = () => {
    cameraControlsRef.current.reset(true);
  };

  const LineElements = useMemo(
    () =>
      !!linesData.length && (
        <LineElement linesData={linesData} showGeometry={showGeo} />
      ),
    [linesData, showGeo]
  );

  return (
    <>
      <Canvas camera={{ position: DEFAULT_CAMERA_POS }}>
        <CanvasSetup cameraControlsRef={cameraControlsRef} />
        {LineElements}
      </Canvas>
      <ResetBtn onClick={cameraResetHandler} />
    </>
  );
}

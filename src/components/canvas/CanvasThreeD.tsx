import { useMemo, useRef } from "react";

import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";

import { CanvasSetup } from "./CanvasSetup";
import { LineElement } from "./LineElement";
import { ResetBtn } from "../../UI";
import { LineDataType } from "../../utils/types";

type CanvasThreeDProps = {
  linesData: LineDataType[];
  showGeo: boolean;
};

export function CanvasThreeD({ linesData, showGeo }: CanvasThreeDProps) {
  const cameraControlsRef = useRef<CameraControls>(null!);

  const cameraResetHandler = () => {
    cameraControlsRef.current.reset(true);
  };

  const LineElements = useMemo(() => {
    return linesData.length > 0 ? (
      <LineElement linesData={linesData} showGeometry={showGeo} />
    ) : (
      <></>
    );
  }, [linesData, showGeo]);

  return (
    <>
      <Canvas>
        <CanvasSetup cameraControlsRef={cameraControlsRef} />
        {LineElements}
      </Canvas>
      <ResetBtn onClick={cameraResetHandler} />
    </>
  );
}

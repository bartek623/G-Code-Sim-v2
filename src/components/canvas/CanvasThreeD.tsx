import { useMemo, useRef } from "react";

import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";

import { CanvasSetup } from "./CanvasSetup";
import { LineElement } from "./LineElement";
import { ResetBtn } from "../../UI";
import { LineDataType } from "../../utils/types";
import { resetToolPosition } from "../../store/canvasStore";

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
    resetToolPosition();
    return linesData.map((lineData) => (
      <LineElement key={Math.random()} {...lineData} showGeometry={showGeo} />
    ));
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

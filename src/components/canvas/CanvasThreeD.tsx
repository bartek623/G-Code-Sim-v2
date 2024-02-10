import { useRef } from "react";

import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";

import { CanvasSetup } from "./CanvasSetup";
import { LineElement } from "./LineElement";
import { ResetBtn } from "../UI";
import { LineDataType } from "../../utils/types";

type CanvasThreeDProps = {
  linesData: LineDataType[];
};

export function CanvasThreeD({ linesData }: CanvasThreeDProps) {
  const cameraControlsRef = useRef<CameraControls>(null!);
  const currentToolPos = { x: 0, y: 0 };

  const cameraResetHandler = () => {
    cameraControlsRef.current.reset(true);
  };

  const LineElements = linesData.map((el) => {
    const preparedElement = (
      <LineElement key={Math.random()} {...el} start={{ ...currentToolPos }} />
    );
    currentToolPos.x = el.end.x;
    currentToolPos.y = el.end.y;
    return preparedElement;
  });

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

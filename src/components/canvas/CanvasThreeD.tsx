import { useMemo, useRef } from "react";

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

  const cameraResetHandler = () => {
    cameraControlsRef.current.reset(true);
  };

  const LineElements = useMemo(
    () =>
      linesData.map((el) => {
        const preparedElement = <LineElement key={Math.random()} {...el} />;
        return preparedElement;
      }),
    [linesData]
  );

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

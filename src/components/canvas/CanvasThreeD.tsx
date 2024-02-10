import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { useRef } from "react";
import { LineElement } from "./LineElement";
import {
  AMBIENT_LIGHT_INTENSITY,
  DIRECT_LIGHT_POS,
  GRID_DIV,
  GRID_ROTATION,
  GRID_SIZE,
  DARK_GREY,
  LIGHT_GREY,
} from "./constants";
import { LineDataType } from "../../utils/types";
import { ResetBtn } from "../UI";

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
        <ambientLight intensity={AMBIENT_LIGHT_INTENSITY} />
        <directionalLight position={DIRECT_LIGHT_POS} />
        <gridHelper
          args={[GRID_SIZE, GRID_DIV, DARK_GREY, LIGHT_GREY]}
          rotation={GRID_ROTATION}
        />
        {LineElements}
        <CameraControls ref={cameraControlsRef} />
      </Canvas>
      <ResetBtn onClick={cameraResetHandler} />
    </>
  );
}

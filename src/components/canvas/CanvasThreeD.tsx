import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { useRef } from "react";
import { Button, styled } from "@mui/material";
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

const StyledBtn = styled(Button)`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 999;
`;

export function CanvasThreeD() {
  const cameraControlsRef = useRef<CameraControls>(null!);
  const currentToolPos = { x: 0, y: 0 };

  //mocked data
  const data: LineDataType[] = [
    {
      type: "line",
      end: { x: 2, y: 2 },
    },
    {
      type: "arc1",
      end: { x: 4, y: 4 },
      offset: { x: 2, y: 0 },
    },
    {
      type: "line",
      end: { x: 7, y: 4 },
    },
  ];

  const cameraResetHandler = () => {
    cameraControlsRef.current.reset(true);
  };

  const LineElements = data.map((el) => {
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
      <StyledBtn onClick={cameraResetHandler}>reset</StyledBtn>
    </>
  );
}

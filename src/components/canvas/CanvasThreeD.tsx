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

const StyledBtn = styled(Button)`
  position: absolute;
  bottom: 0;
  right: 0;
`;

export function CanvasThreeD() {
  const cameraControlsRef = useRef<CameraControls>(null!);

  const cameraResetHandler = () => {
    cameraControlsRef.current.reset(true);
  };

  return (
    <>
      <Canvas>
        <ambientLight intensity={AMBIENT_LIGHT_INTENSITY} />
        <directionalLight position={DIRECT_LIGHT_POS} />
        <gridHelper
          args={[GRID_SIZE, GRID_DIV, DARK_GREY, LIGHT_GREY]}
          rotation={GRID_ROTATION}
        />
        <LineElement type="line" start={[0, 0]} end={[2, 2]} />
        <LineElement
          type="arc"
          start={[2, 2]}
          end={[3, 0]}
          xOffset={0}
          yOffset={-2}
        />
        <CameraControls ref={cameraControlsRef} />
      </Canvas>
      <StyledBtn onClick={cameraResetHandler}>reset</StyledBtn>
    </>
  );
}

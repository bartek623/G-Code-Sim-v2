import { Canvas } from "@react-three/fiber";
import { MeshBox } from "./MeshBox";
import { CameraControls } from "@react-three/drei";
import { useRef } from "react";
import { Button, styled } from "@mui/material";
import {
  AMBIENT_LIGHT_INTENSITY,
  CAMERA_DEFAULT_POS,
  DIRECT_LIGHT_POS,
  GRID_COLOR1,
  GRID_COLOR2,
  GRID_DIV,
  GRID_SIZE,
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
      <Canvas camera={{ position: CAMERA_DEFAULT_POS }}>
        <ambientLight intensity={AMBIENT_LIGHT_INTENSITY} />
        <directionalLight position={DIRECT_LIGHT_POS} />
        <gridHelper args={[GRID_SIZE, GRID_DIV, GRID_COLOR1, GRID_COLOR2]} />
        <MeshBox />
        <CameraControls ref={cameraControlsRef} />
      </Canvas>
      <StyledBtn onClick={cameraResetHandler}>Reset</StyledBtn>
    </>
  );
}

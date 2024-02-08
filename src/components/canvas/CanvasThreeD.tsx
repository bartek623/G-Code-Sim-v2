import { Canvas } from "@react-three/fiber";
import { MeshBox } from "./MeshBox";
import { CameraControls } from "@react-three/drei";

export function CanvasThreeD() {
  return (
    <Canvas>
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 1, 5]} />
      <axesHelper />
      <MeshBox />
      <CameraControls />
    </Canvas>
  );
}

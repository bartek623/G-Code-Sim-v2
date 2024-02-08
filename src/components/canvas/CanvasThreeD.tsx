import { Canvas } from "@react-three/fiber";
import { MeshBox } from "./MeshBox";
import { CameraControls } from "@react-three/drei";

export function CanvasThreeD() {
  return (
    <Canvas camera={{ position: [0, -10, 0] }}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 1, 5]} />
      <gridHelper args={[100, 200, "#777", "#ddd"]} />
      <MeshBox />
      <CameraControls />
    </Canvas>
  );
}

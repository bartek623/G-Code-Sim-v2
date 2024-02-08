import { Canvas } from "@react-three/fiber";
import { MeshBox } from "./MeshBox";

export function CanvasThreeD() {
  return (
    <Canvas>
      <ambientLight intensity={0.1} />
      <directionalLight color="blue" position={[0, 0, 5]} />
      <MeshBox />
    </Canvas>
  );
}

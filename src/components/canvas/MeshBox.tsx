import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { useRef } from "react";

export function MeshBox() {
  const meshRef = useRef<Mesh>(null!);

  useFrame(() => {
    meshRef.current.rotation.x += 0.005;
    meshRef.current.rotation.y -= 0.002;
    meshRef.current.rotation.z += 0.001;
  });

  return (
    <mesh ref={meshRef} position={[3, 0, 0]}>
      <boxGeometry args={[1, 2, 3]} />
      <meshStandardMaterial />
    </mesh>
  );
}

import { LatheGeometry, Vector2 } from "three";
import { GEO_ROTATIONS } from "./constants";

type PointsToGeometryProps = {
  pointsData: Vector2[];
};

export function PointsToGeometry({ pointsData }: PointsToGeometryProps) {
  const rotatedPoints = pointsData.map((p) =>
    p.rotateAround(new Vector2(0, 0), Math.PI / 2)
  );

  const geometry = new LatheGeometry(rotatedPoints, GEO_ROTATIONS).rotateZ(
    -Math.PI / 2
  );

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial />
    </mesh>
  );
}

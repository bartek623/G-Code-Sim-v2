import { BackSide, BufferAttribute, BufferGeometry, Vector3 } from "three";
import { ConvexGeometry } from "three/examples/jsm/Addons.js";

type PointsToGeometryProps = {
  pointsData: number[][];
};

export function PointsToGeometry({ pointsData }: PointsToGeometryProps) {
  const axis = new Vector3(1, 0, 0);
  const basePoints = pointsData.map((p) => new Vector3(p[0], p[1], p[2]));
  const rotations = 100;
  const points = [...basePoints];

  for (let i = 1; i <= rotations; i++) {
    const angle = (i * 2 * Math.PI) / rotations;
    const rotatedPoints = basePoints
      .map((p) => {
        if (!p.y) return;
        return p.clone().applyAxisAngle(axis, angle);
      })
      .filter((p) => p);

    points.push(...(rotatedPoints as Vector3[]));
  }

  const geometry = new ConvexGeometry(points);

  // const pointsGeometry = new BufferGeometry();
  // const vertices = points.map((p) => [p.x, p.y, p.z]).flat();
  // pointsGeometry.setAttribute(
  //   "position",
  //   new BufferAttribute(new Float32Array(vertices), 3)
  // );

  return (
    <>
      {
        <mesh geometry={geometry}>
          <meshStandardMaterial />
        </mesh>
      }
      {
        // <points geometry={pointsGeometry}>
        //   <pointsMaterial size={0.01} color="black" />
        // </points>
      }
    </>
  );
}

import { BufferGeometry, EllipseCurve } from "three";

type ArcProps = {
  currentPos: number[];
  finalPos: number[];
};

export function Arc({ currentPos, finalPos }: ArcProps) {
  const radius = Math.sqrt(
    (finalPos[0] - currentPos[0]) ** 2 + (finalPos[1] - currentPos[1]) ** 2
  );
  const curve = new EllipseCurve(2, 0, radius, radius);
  const points = curve.getPoints(10);
  const geometry = new BufferGeometry().setFromPoints(points);

  return (
    <line>
      <lineBasicMaterial />
    </line>
  );
}

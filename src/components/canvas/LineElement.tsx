import { Vector2 } from "three";
import { LINE_TYPE, LineDataType } from "../../utils/types";
import { PointsToGeometry } from "./PointsToGeometry";
import { getCurvePoints } from "./utils";
import { Line } from "@react-three/drei";

type LineElementProps = LineDataType & {
  showGeometry: boolean;
};

export function LineElement(props: LineElementProps) {
  const { type, start, end, showGeometry } = props;
  let points: Vector2[] = [
    new Vector2(start.x, start.y),
    new Vector2(end.x, end.y),
  ];

  if (type === LINE_TYPE.ARC) {
    const { center, counterClockwise } = props;
    points = getCurvePoints(start, end, center, counterClockwise);
  }

  const isDashed = type === LINE_TYPE.POSITIONING;

  return (
    <>
      <Line
        points={points}
        color={isDashed ? "blue" : "red"}
        dashed={isDashed}
        dashSize={0.08}
        gapSize={0.03}
      />
      {showGeometry && !isDashed && (
        <PointsToGeometry pointsData={points.map((p) => [p.x, p.y, 0])} />
      )}
    </>
  );
}

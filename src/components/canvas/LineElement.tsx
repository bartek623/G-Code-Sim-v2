import { useLayoutEffect, useRef } from "react";
import { Vector2 } from "three";
import { LINE_TYPE, LineDataType } from "../../utils/types";
import { PointsToGeometry } from "./PointsToGeometry";
import { getCurvePoints } from "./utils";

type LineElementProps = LineDataType & {
  showGeometry: boolean;
};

export function LineElement(props: LineElementProps) {
  const { type, start, end, showGeometry } = props;
  const lineRef = useRef(null!);
  let points: Vector2[] = [
    new Vector2(start.x, start.y),
    new Vector2(end.x, end.y),
  ];

  if (type === LINE_TYPE.ARC) {
    const { center, counterClockwise } = props;
    points = getCurvePoints(start, end, center, counterClockwise);
  }

  useLayoutEffect(() => {
    if (!lineRef.current) return;

    //@ts-expect-error there is currently no type for line ref
    lineRef.current.geometry.setFromPoints(
      points.map((point) => new Vector2(...point))
    );
    // @ts-expect-error as above
    if (type === LINE_TYPE.POSITIONING) lineRef.current.computeLineDistances();
  });

  const isDashed = type === LINE_TYPE.POSITIONING;

  return (
    <>
      <line ref={lineRef}>
        <bufferGeometry />
        {isDashed ? (
          <lineDashedMaterial color="blue" dashSize={0.08} gapSize={0.03} />
        ) : (
          <lineBasicMaterial color="red" />
        )}
      </line>
      {showGeometry && !isDashed && (
        <PointsToGeometry pointsData={points.map((p) => [p.x, p.y, 0])} />
      )}
    </>
  );
}

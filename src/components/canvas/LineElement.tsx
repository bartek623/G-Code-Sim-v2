import { useLayoutEffect, useRef } from "react";
import { EllipseCurve, Vector2 } from "three";

type LineProps =
  | {
      type: "line";
      start: number[];
      end: number[];
    }
  | {
      type: "arc";
      start: number[];
      end: number[];
      xOffset: number;
      yOffset: number;
    };

export function LineElement(props: LineProps) {
  const { type, start, end } = props;
  const lineRef = useRef(null!);
  let points: Vector2[] = [new Vector2(...start), new Vector2(...end)];

  if (type === "arc") {
    const { xOffset, yOffset } = props;
    const centerX = start[0] + xOffset;
    const centerY = start[1] + yOffset;

    const dirFactorStart = (start[1] - centerY) / (start[0] - centerX);
    const dirFactorEnd = (end[1] - centerY) / (end[0] - centerX);
    const angleStart = Math.atan(dirFactorStart);
    const angleEnd = Math.atan(dirFactorEnd);
    const radius = Math.sqrt(
      (centerX - start[0]) ** 2 + (centerY - start[1]) ** 2
    );

    const isObtuseStart = centerX > start[0];
    const isObtuseEnd = centerX > end[0];

    const curve = new EllipseCurve(
      centerX,
      centerY,
      radius,
      radius,
      isObtuseStart ? angleStart + Math.PI : angleStart,
      isObtuseEnd ? angleEnd + Math.PI : angleEnd,
      true
    );
    points = curve.getPoints(50);
  }

  useLayoutEffect(() => {
    if (!lineRef.current) return;

    //@ts-expect-error there is currently no type for line ref
    lineRef.current.geometry.setFromPoints(
      points.map((point) => new Vector2(...point))
    );
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial color="red" />
    </line>
  );
}

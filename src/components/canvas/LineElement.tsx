import { useLayoutEffect, useRef } from "react";
import { EllipseCurve, Vector2 } from "three";
import { LineDataType } from "../../utils/types";
import { currentToolPosition } from "../../store/canvasStore";

type LineElementProps = LineDataType;

export function LineElement(props: LineElementProps) {
  const { type, end } = props;
  const start = { ...currentToolPosition };
  const lineRef = useRef(null!);
  let points: Vector2[] = [
    new Vector2(start.x, start.y),
    new Vector2(end.x, end.y),
  ];

  if (type === "arc1") {
    const { offset } = props;
    const center = {
      x: start.x + offset.x,
      y: start.y + offset.y,
    };
    console.log(
      Math.sqrt((center.x - start.x) ** 2 + (center.y - start.y) ** 2)
    );

    const dirFactorStart = (start.y - center.y) / (start.x - center.x);
    const dirFactorEnd = (end.y - center.y) / (end.x - center.x);
    const angleStart = Math.atan(dirFactorStart);
    const angleEnd = Math.atan(dirFactorEnd);
    const radius = Math.sqrt(
      (center.x - start.x) ** 2 + (center.y - start.y) ** 2
    );

    const isObtuseStart = center.x > start.x;
    const isObtuseEnd = center.x > end.x;

    const curve = new EllipseCurve(
      center.x,
      center.y,
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

  const lastPoint = points.at(-1) as Vector2;
  currentToolPosition.x = lastPoint.x;
  currentToolPosition.y = lastPoint.y;

  if (type === "positioning") return;

  return (
    <line ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial color="red" />
    </line>
  );
}

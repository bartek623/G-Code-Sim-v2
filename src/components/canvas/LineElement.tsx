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
    const radius = Math.sqrt(
      (start[0] + xOffset - start[0]) ** 2 +
        (start[1] + yOffset - start[1]) ** 2
    );
    const curve = new EllipseCurve(0, 0, radius, radius, 0, Math.PI);
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

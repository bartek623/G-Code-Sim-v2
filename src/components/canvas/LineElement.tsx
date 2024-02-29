import { useLayoutEffect, useRef } from "react";
import { Vector2 } from "three";
import { LINE_TYPE, LineDataType } from "../../utils/types";
import { currentToolPosition } from "../../store/canvasStore";
import { PointsToGeometry } from "./PointsToGeometry";
import { getCurvePoints } from "./utils";
import { NotificationInfoType } from "../../UI";
import { showError } from "../../utils/utils";

type LineElementProps = LineDataType & {
  showGeometry: boolean;
  pushNotification: (notification: NotificationInfoType) => void;
};

export function LineElement(props: LineElementProps) {
  const { type, end, showGeometry, pushNotification } = props;
  const start = { ...currentToolPosition };
  const lineRef = useRef(null!);
  let points: Vector2[] = [
    new Vector2(start.x, start.y),
    new Vector2(end.x, end.y),
  ];

  if (type === LINE_TYPE.ARC1) {
    const { offset, counterClockwise } = props;
    const center = {
      x: start.x + offset.x,
      y: start.y + offset.y,
    };

    points = getCurvePoints(start, end, center, counterClockwise);
  }

  if (type === LINE_TYPE.ARC2) {
    try {
      const { radius, counterClockwise } = props;
      const distanceBetweenPointsSquared =
        (end.x - start.x) ** 2 + (end.y - start.y) ** 2;
      const diameterSquared = 4 * radius ** 2;
      const center = { x: 0, y: 0 };

      if (diameterSquared < distanceBetweenPointsSquared) {
        throw new Error("No solutions for given radius");
      } else if (diameterSquared > distanceBetweenPointsSquared) {
        const xMid = (end.x + start.x) / 2;
        const yMid = (end.y + start.y) / 2;

        center.x =
          xMid -
          (radius ** 2 - distanceBetweenPointsSquared / 4) ** 0.5 *
            ((start.y - end.y) / distanceBetweenPointsSquared ** 0.5);
        center.y =
          yMid -
          (radius ** 2 - distanceBetweenPointsSquared / 4) ** 0.5 *
            ((end.x - start.x) / distanceBetweenPointsSquared ** 0.5);
      } else {
        center.x = (end.x + start.x) / 2;
        center.y = (end.y + start.y) / 2;
      }

      points = getCurvePoints(start, end, center, counterClockwise);
    } catch (err) {
      showError(err, pushNotification);
    }
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

  if (type === LINE_TYPE.POSITIONING) return;

  return (
    <>
      <line ref={lineRef}>
        <bufferGeometry />
        <lineBasicMaterial color="red" />
      </line>
      {showGeometry && (
        <PointsToGeometry pointsData={points.map((p) => [p.x, p.y, 0])} />
      )}
    </>
  );
}

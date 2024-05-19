import { EllipseCurve } from "three";
import { CURVE_POINTS } from "./constants";
import { PointType } from "../../utils/types";

export const getCurvePoints = (
  start: PointType,
  end: PointType,
  center: PointType,
  aClockwise: boolean | undefined
) => {
  const angleStart = Math.atan2(start.y - center.y, start.x - center.x);
  const angleEnd = Math.atan2(end.y - center.y, end.x - center.x);

  const radius1 = Math.sqrt(
    (center.x - start.x) ** 2 + (center.y - start.y) ** 2
  );
  const radius2 = Math.sqrt((center.x - end.x) ** 2 + (center.y - end.y) ** 2);

  return new EllipseCurve(
    center.x,
    center.y,
    radius1,
    radius2,
    angleStart + angleEnd,
    angleEnd + angleEnd,
    !aClockwise,
    -angleEnd
  ).getPoints(CURVE_POINTS);
};

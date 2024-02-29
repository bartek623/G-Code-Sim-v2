import { EllipseCurve } from "three";
import { CURVE_POINTS } from "./constants";
import { PointType } from "../../utils/types";

export const getCurvePoints = (
  start: PointType,
  end: PointType,
  center: PointType,
  aClockwise: boolean | undefined
) => {
  const dirFactorStart = (start.y - center.y) / (start.x - center.x);
  const dirFactorEnd = (end.y - center.y) / (end.x - center.x);
  const angleStart = Math.atan(dirFactorStart);
  const angleEnd = Math.atan(dirFactorEnd);
  const radius = Math.sqrt(
    (center.x - start.x) ** 2 + (center.y - start.y) ** 2
  );

  const isObtuseStart = center.x > start.x;
  const isObtuseEnd = center.x > end.x;

  return new EllipseCurve(
    center.x,
    center.y,
    radius,
    radius,
    isObtuseStart ? angleStart + Math.PI : angleStart,
    isObtuseEnd ? angleEnd + Math.PI : angleEnd,
    !aClockwise
  ).getPoints(CURVE_POINTS);
};

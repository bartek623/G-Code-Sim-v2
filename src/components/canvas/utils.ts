import { EllipseCurve } from "three";
import { CURVE_POINTS } from "./constants";
import { LINE_TYPE, LineDataType } from "../../utils/types";

export const getCurvePoints = (lineData: LineDataType) => {
  if (lineData.type !== LINE_TYPE.ARC)
    return { curvePoints: [], curveLength: 0 };

  const { start, end, center, counterClockwise } = lineData;
  const angleStart = Math.atan2(start.y - center.y, start.x - center.x);
  const angleEnd = Math.atan2(end.y - center.y, end.x - center.x);

  const radius = Math.sqrt(
    (center.x - start.x) ** 2 + (center.y - start.y) ** 2
  );

  const curve = new EllipseCurve(
    center.x,
    center.y,
    radius,
    radius,
    angleStart + angleEnd,
    angleEnd + angleEnd,
    !counterClockwise,
    -angleEnd
  );

  return {
    curvePoints: curve.getPoints(CURVE_POINTS),
    curveLength: curve.getLength(),
  };
};

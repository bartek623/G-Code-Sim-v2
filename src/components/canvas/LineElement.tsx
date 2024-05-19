import { Vector2 } from "three";
import { LINE_TYPE, LineDataType } from "../../utils/types";
import { PointsToGeometry } from "./PointsToGeometry";
import { getCurvePoints } from "./utils";
import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import {
  DASH_SIZE,
  GAP_SIZE,
  LINE_ANIMATION_RATE,
  LINE_COLOR,
  POSITION_LINE_COLOR,
} from "./constants";

type LineElementProps = {
  linesData: LineDataType[];
  showGeometry: boolean;
};

export function LineElement({ linesData, showGeometry }: LineElementProps) {
  const points: Vector2[] = [];
  const linesDashed: Vector2[][] = [];
  const lineRef = useRef(null!);
  let approximateLength = 0;

  linesData.forEach((lineData) => {
    const { type, start, end } = lineData;
    const startPoint = new Vector2(start.x, start.y);
    const endPoint = new Vector2(end.x, end.y);

    if (type === LINE_TYPE.POSITIONING) {
      linesDashed.push([startPoint, endPoint]);

      approximateLength += startPoint.distanceTo(endPoint);
    } else if (type === LINE_TYPE.ARC) {
      const { curvePoints, curveLength } = getCurvePoints(lineData);
      points.push(...curvePoints);

      approximateLength += curveLength;
    } else {
      points.push(...[startPoint, endPoint]);

      approximateLength += startPoint.distanceTo(endPoint);
    }
  });

  // Line animation
  useEffect(() => {
    //dont rerun animation on showgeometry
    if (showGeometry) return;
    //@ts-expect-error there is currently no type for line ref
    lineRef.current.material.dashSize = 0;
  });

  useFrame(() => {
    //@ts-expect-error there is currently no type for line ref
    if (lineRef.current.material.dashSize >= approximateLength) return;
    //@ts-expect-error as above
    lineRef.current.material.dashSize += LINE_ANIMATION_RATE;
  });

  return (
    <>
      <Line
        ref={lineRef}
        points={points}
        color={LINE_COLOR}
        dashed
        gapSize={approximateLength}
      />
      {linesDashed.map((line) => (
        <Line
          key={Math.random()}
          points={line}
          color={POSITION_LINE_COLOR}
          dashed
          dashSize={DASH_SIZE}
          gapSize={GAP_SIZE}
        />
      ))}
      {showGeometry && (
        <PointsToGeometry pointsData={points.map((p) => [p.x, p.y, 0])} />
      )}
    </>
  );
}

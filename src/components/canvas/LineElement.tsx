import { Group, Vector2 } from "three";
import { LINE_TYPE, LineDataType } from "../../utils/types";
import { getCurvePoints, lineAnimation } from "./utils";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { LineSegment } from "./LineSegment";
import { LineElementType } from "./types";
import { LINE_ANIMATION_RATE } from "./constants";

type LineElementProps = {
  linesData: LineDataType[];
  showGeometry: boolean;
};

export function LineElement({ linesData, showGeometry }: LineElementProps) {
  const geometryPoints: Vector2[] = [];
  const lines: LineElementType[] = [];
  const groupRef = useRef<Group>(null!);

  let animationLength = 0;
  let animationProgress = 0;

  linesData.forEach((lineData) => {
    const { type, start, end } = lineData;
    const startPoint = new Vector2(start.x, start.z);
    const endPoint = new Vector2(end.x, end.z);

    if (type === LINE_TYPE.ARC) {
      const { curvePoints, curveLength } = getCurvePoints(lineData);
      geometryPoints.push(...curvePoints);

      lines.push({
        points: curvePoints,
        lineLength: curveLength,
        initProgress: animationLength,
        endProgress: animationLength + curveLength,
        positioning: false,
      });

      animationLength += curveLength;
    } else {
      if (type !== LINE_TYPE.POSITIONING)
        geometryPoints.push(...[startPoint, endPoint]);

      const lineLength = startPoint.distanceTo(endPoint);
      lines.push({
        points: [startPoint, endPoint],
        lineLength,
        initProgress: animationLength,
        endProgress: animationLength + lineLength,
        positioning: type === LINE_TYPE.POSITIONING,
      });

      animationLength += lineLength;
    }
  });

  useFrame(() => {
    if (animationProgress > animationLength) return;

    const rate = animationLength / LINE_ANIMATION_RATE;

    groupRef.current.children
      .filter((object) => object.type === "Line2")
      .forEach(lineAnimation(lines, animationProgress, rate));

    animationProgress += rate;
  });

  return (
    <group ref={groupRef}>
      {lines.map((line) => {
        return (
          <LineSegment
            key={Math.random()}
            showGeometry={showGeometry}
            line={line}
          />
        );
      })}
    </group>
  );
}

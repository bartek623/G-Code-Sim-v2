import { Group, Object3D, Vector2 } from "three";
import { LINE_TYPE, LineDataType } from "../../utils/types";
import { getCurvePoints } from "./utils";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { DASH_SIZE, GAP_SIZE, LINE_ANIMATION_RATE } from "./constants";
import { LineSegment } from "./LineSegment";
import { LineElementType } from "./types";

type LineElementProps = {
  linesData: LineDataType[];
  showGeometry: boolean;
};

export function LineElement({ linesData, showGeometry }: LineElementProps) {
  const geometryPoints: Vector2[] = [];
  const lines: LineElementType[] = [];
  const groupRef = useRef<Group>(null!);
  let approximateLength = 0;

  linesData.forEach((lineData) => {
    const { type, start, end } = lineData;
    const startPoint = new Vector2(start.x, start.y);
    const endPoint = new Vector2(end.x, end.y);

    if (type === LINE_TYPE.ARC) {
      const { curvePoints, curveLength } = getCurvePoints(lineData);
      geometryPoints.push(...curvePoints);

      lines.push({
        points: curvePoints,
        length: curveLength,
        initProgress: approximateLength,
        endProgress: approximateLength + curveLength,
        positioning: false,
      });

      approximateLength += curveLength;
    } else {
      if (type !== LINE_TYPE.POSITIONING)
        geometryPoints.push(...[startPoint, endPoint]);

      const length = startPoint.distanceTo(endPoint);
      lines.push({
        points: [startPoint, endPoint],
        length,
        initProgress: approximateLength,
        endProgress: approximateLength + length,
        positioning: type === LINE_TYPE.POSITIONING,
      });

      approximateLength += length;
    }
  });

  let animationProgress = 0;
  useFrame(() => {
    if (animationProgress >= approximateLength) return;

    groupRef.current.children
      .filter((object) => object.type === "Line2")
      .forEach((line: Object3D, i: number) => {
        if (
          lines[i].initProgress > animationProgress ||
          lines[i].endProgress < animationProgress
        )
          return;

        //@ts-expect-error three js types error
        const lineMaterial = line.material;

        lineMaterial.dashSize = animationProgress - lines[i].initProgress;

        if (lines[i].endProgress <= animationProgress + LINE_ANIMATION_RATE) {
          lineMaterial.dashSize = lines[i].length;

          if (lines[i].positioning) {
            lineMaterial.dashSize = DASH_SIZE;
            lineMaterial.gapSize = GAP_SIZE;
          }
        }
      });

    animationProgress += LINE_ANIMATION_RATE;
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

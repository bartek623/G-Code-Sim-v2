import { useFrame } from '@react-three/fiber';
import { useGeometryContext } from '@store';
import { LINE_TYPE } from '@utils';
import { Vector2 } from 'three';
import { LINE_ANIMATION_RATE } from './constants';
import { LineSegment } from './LineSegment';
import { LineElementType } from './types';
import { getCurrentPoint, getCurvePoints, lineAnimation } from './utils';
import { Dispatch, memo } from 'react';
import { LatheDispatchType } from './CanvasThreeD';

type LineElementProps = {
  updateLathePoints: Dispatch<Partial<LatheDispatchType>>;
};

export const LineElement = ({ updateLathePoints }: LineElementProps) => {
  const { geometryRef, lines: linesData } = useGeometryContext();
  const geometryPoints: Vector2[] = [];
  const lines: LineElementType[] = [];

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

  updateLathePoints({ type: 'clear' });

  useFrame(() => {
    if (animationProgress > animationLength || !lines.length) return;

    const currentPoint = getCurrentPoint(geometryPoints, animationProgress);
    updateLathePoints({
      type: 'add',
      payload: currentPoint.clone(),
    });

    const rate = animationLength / LINE_ANIMATION_RATE;

    geometryRef.current?.children
      .filter((object) => object.type === 'Line2')
      .forEach(lineAnimation(lines, animationProgress, rate));

    animationProgress += rate;
  });

  return (
    <group ref={geometryRef}>
      {lines.map((line) => {
        return <LineSegment key={Math.random()} line={line} />;
      })}
    </group>
  );
};

export const LineElementMemo = memo(LineElement);

import { Cylinder, Lathe, Line, Plane, Points } from '@react-three/drei';
import { DoubleSide, Vector2 } from 'three';
import { LatheStateType } from './CanvasThreeD';
import { GEO_ROTATIONS, STEEL_COLOR } from './constants';
import { useGeometryContext } from '@/store';
import { PointType } from '@/utils';
import { prepareLathePoint } from './utils';

type MaterialShapeProps = {
  latheState: LatheStateType;
};

type StartingPointProps = {
  position: PointType;
};

type TwoDViewProps = {
  radius: number;
  length: number;
  currentLength: number;
  offsetX: number;
};

type ThreeDViewProps = { points: Vector2[] } & TwoDViewProps;

function ThreeDView({
  radius,
  length,
  currentLength,
  offsetX,
  points,
}: ThreeDViewProps) {
  const cappedPoints = points.flatMap((point) => {
    if (point.x > length) return [];

    return point.y > radius
      ? [prepareLathePoint(new Vector2(point.x, radius))]
      : [prepareLathePoint(point)];
  });

  if (!points.find((point) => point.x <= 0))
    cappedPoints.unshift(prepareLathePoint(new Vector2(0, radius)));

  cappedPoints.unshift(prepareLathePoint(new Vector2(0, 0)));

  if (!points.find((point) => point.x >= length))
    cappedPoints.push(
      prepareLathePoint(new Vector2(points.at(-1)?.x || length, radius)),
      prepareLathePoint(new Vector2(length, radius)),
    );

  cappedPoints.push(prepareLathePoint(new Vector2(length, 0)));

  console.log(points.toSorted((p1, p2) => p1.x - p2.x).map((p) => p.x));

  return (
    <>
      {points.length > 2 && (
        <Lathe
          args={[cappedPoints, GEO_ROTATIONS]}
          rotation={[0, 0, -Math.PI / 2]}>
          <meshStandardMaterial
            color={STEEL_COLOR}
            roughness={0.5}
            metalness={1}
            side={DoubleSide}
          />
        </Lathe>
      )}
      {/* <Cylinder
        args={[radius, radius, length]}
        rotation={[0, 0, Math.PI / 2]}
        position={[length / 2, 0, 0]}>
        <meshStandardMaterial
          color={STEEL_COLOR}
          roughness={0.5}
          metalness={1}
        />
      </Cylinder> */}
    </>
  );
}

function TwoDView({ radius, length, currentLength, offsetX }: TwoDViewProps) {
  const cylinderOutlinePoints = [
    new Vector2(0, 0),
    new Vector2(0, radius),
    new Vector2(length, radius),
    new Vector2(length, 0),
  ];

  return (
    <>
      {offsetX <= length && (
        <Plane
          args={[currentLength, radius, Math.round(length / 2), 1]}
          position={[currentLength / 2 + offsetX, radius / 2, 0]}>
          <meshBasicMaterial color={STEEL_COLOR} wireframe side={DoubleSide} />
        </Plane>
      )}
      <Line points={cylinderOutlinePoints} color={STEEL_COLOR} />
    </>
  );
}

function StartingPoint({ position }: StartingPointProps) {
  return (
    <Points positions={new Float32Array([position.x, position.z, 0])}>
      <pointsMaterial size={0.1} color={'green'} />
    </Points>
  );
}

export function MaterialShape({ latheState }: MaterialShapeProps) {
  const { cylinderSize, showGeometry, startingPoint } = useGeometryContext();

  const cylinderLength = cylinderSize.length - latheState.currentX;

  if (!cylinderSize.radius || !cylinderSize.length) return;

  return (
    <>
      {showGeometry && (
        <ThreeDView
          radius={cylinderSize.radius}
          length={cylinderSize.length}
          currentLength={cylinderLength}
          offsetX={latheState.currentX}
          points={latheState.points}
        />
      )}
      {!showGeometry && (
        <TwoDView
          radius={cylinderSize.radius}
          length={cylinderSize.length}
          currentLength={cylinderLength}
          offsetX={latheState.currentX}
        />
      )}
      <StartingPoint position={startingPoint} />
    </>
  );
}

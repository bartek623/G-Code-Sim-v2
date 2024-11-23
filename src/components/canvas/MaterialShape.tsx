import { Cylinder, Lathe, Line, Plane, Points } from '@react-three/drei';
import { DoubleSide, Vector2 } from 'three';
import { LatheStateType } from './CanvasThreeD';
import { GEO_ROTATIONS, STEEL_COLOR } from './constants';
import { useGeometryContext } from '@/store';
import { PointType } from '@/utils';

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

type ThreeDViewProps = { points: Vector2[] } & Omit<TwoDViewProps, 'length'>;

function ThreeDView({
  radius,
  currentLength,
  offsetX,
  points,
}: ThreeDViewProps) {
  return (
    <>
      {points.length > 2 && (
        <Lathe args={[points, GEO_ROTATIONS]} rotation={[0, 0, -Math.PI / 2]}>
          <meshStandardMaterial
            color={STEEL_COLOR}
            roughness={0.5}
            metalness={1}
            side={DoubleSide}
          />
        </Lathe>
      )}
      {currentLength > 0 && (
        <Cylinder
          args={[radius, radius, currentLength]}
          rotation={[0, 0, Math.PI / 2]}
          position={[currentLength / 2 + offsetX, 0, 0]}>
          <meshStandardMaterial
            color={STEEL_COLOR}
            roughness={0.5}
            metalness={1}
          />
        </Cylinder>
      )}
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

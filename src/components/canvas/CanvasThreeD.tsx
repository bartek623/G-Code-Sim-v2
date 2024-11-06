import { CameraControls, Cylinder, Lathe } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ResetBtn } from '@UI';
import { useReducer, useRef } from 'react';

import { CanvasSetup } from './CanvasSetup';
import { DEFAULT_CAMERA_POS, GEO_ROTATIONS } from './constants';
import { LineElementMemo } from './LineElement';
import { DoubleSide, Vector2 } from 'three';

const CYLINDER = {
  radius: 1,
  length: 3,
};

export type LatheDispatchType = {
  type: 'add' | 'clear';
  payload: Vector2 | undefined;
};

const reducer = function (
  state: { points: Vector2[]; currentX: number },
  action: Partial<LatheDispatchType>,
) {
  switch (action.type) {
    case 'add':
      if (!action.payload) return state;
      if (action.payload.x > CYLINDER.length)
        return {
          ...state,
          points: [
            ...state.points,
            new Vector2(state.currentX, 0).rotateAround(
              new Vector2(0, 0),
              Math.PI / 2,
            ),
          ],
        };
      const point = new Vector2(
        action.payload.x,
        action.payload.y > CYLINDER.radius ? CYLINDER.radius : action.payload.y,
      );
      return {
        currentX: action.payload.x,
        points: [
          ...state.points,
          point.rotateAround(new Vector2(0, 0), Math.PI / 2),
        ],
      };
    case 'clear':
      return { points: [], currentX: 0 };
    default:
      return state;
  }
};

export default function CanvasThreeD() {
  const cameraControlsRef = useRef<CameraControls>(null!);
  const [latheState, latheDispatch] = useReducer(reducer, {
    points: [],
    currentX: 0,
  });

  const cameraResetHandler = () => {
    cameraControlsRef.current.reset(true);
  };

  const cylinderLength = CYLINDER.length - latheState.currentX;
  console.log(cylinderLength);

  return (
    <>
      <Canvas camera={{ position: DEFAULT_CAMERA_POS }}>
        {latheState.points.length > 2 && (
          <Lathe
            args={[latheState.points, GEO_ROTATIONS]}
            rotation={[0, 0, -Math.PI / 2]}>
            <meshStandardMaterial
              color="#888"
              roughness={0.5}
              metalness={1}
              side={DoubleSide}
            />
          </Lathe>
        )}
        {cylinderLength - 0.01 > 0 && (
          <Cylinder
            args={[CYLINDER.radius, CYLINDER.radius, cylinderLength]}
            rotation={[0, 0, Math.PI / 2]}
            position={[cylinderLength / 2 + latheState.currentX, 0, 0]}>
            <meshStandardMaterial color="#888" roughness={0.5} metalness={1} />
          </Cylinder>
        )}
        <CanvasSetup cameraControlsRef={cameraControlsRef} />
        <LineElementMemo updateLathePoints={latheDispatch} />
      </Canvas>
      <ResetBtn onClick={cameraResetHandler} />
    </>
  );
}

import { CameraControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ResetBtn } from '@UI';
import { useReducer, useRef } from 'react';

import { Vector2 } from 'three';
import { CanvasSetup } from './CanvasSetup';
import { DEFAULT_CAMERA_POS } from './constants';
import { LineElementMemo } from './LineElement';
import { MaterialShape } from './MaterialShape';

export type LatheDispatchType = {
  type: 'add' | 'clear';
  payload?: Vector2;
};

export type LatheStateType = { points: Vector2[]; currentX: number };

const latheInitialState = {
  points: [],
  currentX: 0,
};

const latheReducer = function (
  state: LatheStateType,
  action: LatheDispatchType,
) {
  switch (action.type) {
    case 'add':
      if (!action.payload) return state;
      return {
        currentX: action.payload.x,
        points: [...state.points, action.payload],
      };
    case 'clear':
      return latheInitialState;
  }
};

export default function CanvasThreeD() {
  const cameraControlsRef = useRef<CameraControls>(null!);
  const [latheState, latheDispatch] = useReducer(
    latheReducer,
    latheInitialState,
  );

  const cameraResetHandler = () => {
    cameraControlsRef.current.reset(true);
  };

  return (
    <>
      <Canvas camera={{ position: DEFAULT_CAMERA_POS }}>
        <CanvasSetup cameraControlsRef={cameraControlsRef} />
        <LineElementMemo updateLathePoints={latheDispatch} />
        <MaterialShape latheState={latheState} />
      </Canvas>
      <ResetBtn onClick={cameraResetHandler} />
    </>
  );
}

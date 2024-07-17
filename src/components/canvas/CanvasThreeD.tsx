import { CameraControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ResetBtn } from '@UI';
import { useRef } from 'react';

import { CanvasSetup } from './CanvasSetup';
import { DEFAULT_CAMERA_POS } from './constants';
import { LineElement } from './LineElement';

export function CanvasThreeD() {
  const cameraControlsRef = useRef<CameraControls>(null!);

  const cameraResetHandler = () => {
    cameraControlsRef.current.reset(true);
  };

  return (
    <>
      <Canvas camera={{ position: DEFAULT_CAMERA_POS }}>
        <CanvasSetup cameraControlsRef={cameraControlsRef} />
        <LineElement />
      </Canvas>
      <ResetBtn onClick={cameraResetHandler} />
    </>
  );
}

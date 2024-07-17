import { Vector2 } from 'three';

export type LineElementType = {
  points: Vector2[];
  lineLength: number;
  initProgress: number;
  endProgress: number;
  positioning: boolean;
};

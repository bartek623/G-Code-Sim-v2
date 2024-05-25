import { Vector2 } from "three";

export type LineElementType = {
  points: Vector2[];
  length: number;
  initProgress: number;
  endProgress: number;
  positioning: boolean;
};

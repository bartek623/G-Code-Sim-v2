export type LineType =
  | {
      type: "positioning";
    }
  | {
      type: "line";
    }
  | {
      type: "arc1";
      offset: { x: number; y: number };
    }
  | {
      type: "arc2";
      radius: number;
    };

export type LineDataType = LineType & { end: { x: number; y: number } };

export type LineElementType = LineDataType & {
  start: { x: number; y: number };
};

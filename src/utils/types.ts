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
      counterClockwise?: boolean;
    }
  | {
      type: "arc2";
      radius: number;
      counterClockwise?: boolean;
    };

export type LineDataType = LineType & {
  end: { x: number; y: number };
};

export type LineElementType = LineDataType & {
  start: { x: number; y: number };
};

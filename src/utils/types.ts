export const LINE_TYPE = {
  POSITIONING: "positioning",
  LINE: "line",
  ARC1: "arc1",
  ARC2: "arc2",
} as const;

export type ValuesType<T> = T[keyof T];

export type LinesType =
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

export type LineDataType = LinesType & {
  end: { x: number; y: number };
};

export type LineElementType = LineDataType & {
  start: { x: number; y: number };
};

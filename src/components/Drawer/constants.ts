export const TEXT_FIELD_BACKGROUND = "#282c34";
export const TEXT_FIELD_COLOR = "#abb2bf";

export const GCODE_CMD = {
  G: "G",
  X: "X",
  Y: "Y",
  I: "I",
  J: "J",
} as const;

export const GCODE = {
  POSITIONING: "00",
  LINE: "01",
  ARC: "02",
  COUNTERCLOCKWISE_ARC: "03",
} as const;

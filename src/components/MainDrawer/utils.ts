import { LineDataType, LINE_TYPE, ValuesType } from "../../utils/types";
import { GCODE, GCODE_CMD } from "./constants";

type LineType = ValuesType<typeof LINE_TYPE> | undefined;
type LineData = { type: LineType; counterClockwise?: boolean };

const getLineType = (code: string): LineData => {
  switch (code) {
    case GCODE.POSITIONING:
      return { type: LINE_TYPE.POSITIONING };
    case GCODE.LINE:
      return { type: LINE_TYPE.LINE };
    case GCODE.ARC:
      return { type: LINE_TYPE.ARC1 };
    case GCODE.COUNTERCLOCKWISE_ARC:
      return { type: LINE_TYPE.ARC1, counterClockwise: true };
    default:
      return { type: undefined };
  }
};

type LineDataTempType = {
  type?: LineType;
  end: { x?: number; y?: number };
  offset: { x?: number; y?: number };
  radius?: number;
  counterClockwise?: boolean;
};

const arcCheck = (data: LineDataTempType, line: number, radiusMode = false) => {
  let error = false;
  if (data.type !== LINE_TYPE.ARC1 && data.type !== LINE_TYPE.ARC2)
    error = true;

  if (radiusMode) {
    if (data.offset.x || data.offset.y) error = true;
  } else {
    if (data.radius) error = true;
  }

  if (error) throw new Error(`Wrong command usage [${line}]`);
};

export const convertProgramToLinesData = (
  program: string
): LineDataType[] | undefined => {
  const programLines = program.split("\n");

  const linesData: LineDataType[] = programLines.map((line, i) => {
    const lineData: LineDataTempType = {
      type: undefined,
      end: {},
      offset: {},
    };
    const singleCommands = line.split(" ");

    if (singleCommands[0][0] !== GCODE_CMD.G)
      throw new Error(`Wrong command line [${i}]`);

    singleCommands.forEach((command) => {
      const code = command[0];
      const value = +command.slice(1);
      switch (code) {
        case GCODE_CMD.G: {
          const lineInfo = getLineType(command.slice(1));
          lineData.type = lineInfo.type;
          lineData.counterClockwise = lineInfo.counterClockwise;
          break;
        }
        case GCODE_CMD.X:
          lineData.end.x = value;
          break;
        case GCODE_CMD.Y:
          lineData.end.y = value;
          break;
        case GCODE_CMD.I:
          arcCheck(lineData, i);
          lineData.offset.x = value;
          break;
        case GCODE_CMD.J:
          arcCheck(lineData, i);
          lineData.offset.y = value;
          break;
        case GCODE_CMD.R:
          arcCheck(lineData, i);
          lineData.type = LINE_TYPE.ARC2;
          lineData.radius = value;
          break;
      }
    });

    if (!lineData.type) throw new Error(`Wrong GCODE [${i}]`);
    if (lineData.end.x === undefined)
      throw new Error(`Element X is not specified [${i}]`);
    if (lineData.end.y === undefined)
      throw new Error(`Element Y is not specified [${i}]`);

    if (lineData.type === LINE_TYPE.ARC1) {
      if (lineData.offset.x === undefined && lineData.offset.y === undefined)
        throw new Error(`Element I and J or R is not specified [${i}]`);
      if (lineData.offset.x === undefined)
        throw new Error(`Element I is not specified [${i}]`);
      if (lineData.offset.y === undefined)
        throw new Error(`Element J is not specified [${i}]`);
    }

    return lineData as LineDataType;
  });

  return linesData;
};

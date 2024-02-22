import { LineDataType, LINE_TYPE, ValuesType } from "../../utils/types";
import { GCODE, GCODE_CMD } from "../UI/Drawer/constants";

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
      return { type: LINE_TYPE.ARC2, counterClockwise: true };
    default:
      return { type: undefined };
  }
};

type LineDataTempType = {
  type?: LineType;
  end: { x?: number; y?: number };
  offset: { x?: number; y?: number };
  counterClockwise?: boolean;
};

export const convertProgramToLinesData = (
  program: string
): LineDataType[] | undefined => {
  try {
    const programLines = program.split("\n");

    const linesData: LineDataType[] = programLines.map((line, i) => {
      const lineData: LineDataTempType = {
        type: LINE_TYPE.POSITIONING,
        end: {},
        offset: {},
      };
      const singleCommands = line.split(" ");

      if (singleCommands[0][0] !== GCODE_CMD.G)
        throw new Error(`Wrong command line [${i}]`);

      singleCommands.forEach((command) => {
        switch (command[0]) {
          case GCODE_CMD.G: {
            const lineInfo = getLineType(command.slice(1));
            lineData.type = lineInfo.type;
            lineData.counterClockwise = lineInfo.counterClockwise;
            break;
          }
          case GCODE_CMD.X:
            lineData.end.x = +command.slice(1);
            break;
          case GCODE_CMD.Y:
            lineData.end.y = +command.slice(1);
            break;
          case GCODE_CMD.I:
            if (lineData.type !== LINE_TYPE.ARC1)
              throw new Error(`Wrong command usage [${i}]`);
            lineData.offset.x = +command.slice(1);
            break;
          case GCODE_CMD.J:
            if (lineData.type !== LINE_TYPE.ARC1)
              throw new Error(`Wrong command usage [${i}]`);
            lineData.offset.y = +command.slice(1);
            break;
        }
      });

      if (!lineData.type) throw new Error("Wrong GCODE");
      if (lineData.end.x === undefined)
        throw new Error("Not given x argument of last line point");
      if (lineData.end.y === undefined)
        throw new Error("Not given y argument of last line point");

      const isArc =
        lineData.type === LINE_TYPE.ARC1 || lineData.type === LINE_TYPE.ARC2;
      if (isArc) {
        if (lineData.offset.x === undefined)
          throw new Error("Not given x argument of offset for center of arc");
        if (lineData.offset.y === undefined)
          throw new Error("Not given y argument of offset for center of arc");
      }

      return lineData as LineDataType;
    });

    return linesData;
  } catch (err) {
    console.error(err);
  }
};

import {
  LineDataType,
  LINE_TYPE,
  PointType,
  LineType,
} from "../../utils/types";
import { ERROR_MSG, GCODE, GCODE_CMD } from "./constants";

type LineData = { type: LineType; counterClockwise?: boolean };

const getLineType = (code: number, errorMsg: string): LineData => {
  switch (code) {
    case GCODE.POSITIONING:
      return { type: LINE_TYPE.POSITIONING };
    case GCODE.LINE:
      return { type: LINE_TYPE.LINE };
    case GCODE.ARC:
      return { type: LINE_TYPE.ARC };
    case GCODE.COUNTERCLOCKWISE_ARC:
      return { type: LINE_TYPE.ARC, counterClockwise: true };
    default:
      throw new Error(errorMsg);
  }
};

const getCenterWithRadius = (
  radius: number,
  start: PointType,
  end: PointType,
  dir: 1 | -1,
  errorMsg: string
) => {
  const distanceBetweenPointsSquared =
    (end.x - start.x) ** 2 + (end.z - start.z) ** 2;
  const diameterSquared = 4 * radius ** 2;
  const center = { x: 0, z: 0 };

  if (diameterSquared < distanceBetweenPointsSquared) {
    throw new Error(errorMsg);
  } else if (diameterSquared > distanceBetweenPointsSquared) {
    const xMid = (end.x + start.x) / 2;
    const yMid = (end.z + start.z) / 2;

    const sign = (radius / Math.abs(radius)) * dir;

    center.x =
      xMid -
      (radius ** 2 - distanceBetweenPointsSquared / 4) ** 0.5 *
        ((start.z - end.z) / distanceBetweenPointsSquared ** 0.5) *
        sign;
    center.z =
      yMid -
      (radius ** 2 - distanceBetweenPointsSquared / 4) ** 0.5 *
        ((end.x - start.x) / distanceBetweenPointsSquared ** 0.5) *
        sign;
  } else {
    center.x = (end.x + start.x) / 2;
    center.z = (end.z + start.z) / 2;
  }

  return center;
};

type TempPoint = { x: unknown; z: unknown };

export const convertProgramToLinesData = (
  program: string,
  warningFn: (msg: string) => void = () => {}
): LineDataType[] | undefined => {
  const programLines = program.trim().split("\n");
  const currentToolPosition: PointType = { x: 0, z: 0 };
  const prevLineValues = {
    x: 0,
    z: 0,
    r: 0,
    i: 0,
    j: 0,
    n: 0,
  };

  const linesData: LineDataType[] = programLines.map((line) => {
    const start: PointType = { ...currentToolPosition };
    let type: LineType | undefined;
    const end: PointType = { x: prevLineValues.x, z: prevLineValues.z };
    const center: TempPoint = { x: undefined, z: undefined };
    let counterClockwise = false;
    let radius: number | undefined;
    let lineNumber: number | undefined;

    const commandLine = line.trim();
    const singleCommands = commandLine.split(" ");

    if (!commandLine.includes("N")) {
      lineNumber = prevLineValues.n =
        Math.ceil((prevLineValues.n + 1) / 10) * 10;
    }

    const errorMsg = (msg: string) => `[N${lineNumber}] ${msg}`;

    singleCommands.forEach((command) => {
      const code = command[0];
      const value = +command.slice(1);

      switch (code) {
        case GCODE_CMD.N:
          lineNumber = prevLineValues.n = Math.round(value);
          break;
        case GCODE_CMD.G: {
          const lineInfo = getLineType(value, errorMsg(ERROR_MSG.G));
          type = lineInfo.type;
          counterClockwise = !!lineInfo.counterClockwise;
          break;
        }
        case GCODE_CMD.X:
          if (value < 0) throw new Error(errorMsg(ERROR_MSG.Xnegative));
          end.x = prevLineValues.x = value;
          break;
        case GCODE_CMD.Z:
          if (value < 0) throw new Error(errorMsg(ERROR_MSG.Znegative));
          end.z = prevLineValues.z = value;
          break;
        case GCODE_CMD.I:
          if (type !== LINE_TYPE.ARC)
            throw new Error(errorMsg(ERROR_MSG.Itype));
          center.x = prevLineValues.i = start.x + value;
          break;
        case GCODE_CMD.J:
          if (type !== LINE_TYPE.ARC)
            throw new Error(errorMsg(ERROR_MSG.Jtype));
          center.z = prevLineValues.j = start.z + value;
          break;
        case GCODE_CMD.R:
          if (type !== LINE_TYPE.ARC)
            throw new Error(errorMsg(ERROR_MSG.Rtype));
          radius = prevLineValues.r = value;
          break;
        default:
          warningFn(ERROR_MSG.unknownCommand + command);
          break;
      }
    });

    if (!type) throw new Error(errorMsg(ERROR_MSG.line));

    if (type === LINE_TYPE.ARC) {
      if (center.x === undefined && center.z === undefined) {
        if (!radius) {
          warningFn(errorMsg(ERROR_MSG.IJRmissing));
          radius = prevLineValues.r;
        }

        const dir = counterClockwise ? -1 : 1;
        const calculatedCenter = getCenterWithRadius(
          radius,
          start,
          end,
          dir,
          errorMsg(ERROR_MSG.noRsolution)
        );
        center.x = calculatedCenter.x;
        center.z = calculatedCenter.z;
      } else {
        if (radius) warningFn(ERROR_MSG.Roverrided);

        if (center.x === undefined) center.x = start.x + prevLineValues.i;
        if (center.z === undefined) center.z = start.z + prevLineValues.j;
      }
    }

    currentToolPosition.x = end.x as number;
    currentToolPosition.z = end.z as number;

    if (type === LINE_TYPE.ARC) {
      const lineData: LineDataType = {
        type,
        start,
        end,
        center: center as PointType,
        counterClockwise,
      };
      return lineData;
    } else if (type === LINE_TYPE.LINE || type === LINE_TYPE.POSITIONING) {
      const lineData: LineDataType = {
        type,
        start,
        end,
      };
      return lineData;
    } else throw new Error(errorMsg(ERROR_MSG.command));
  });

  return linesData;
};

export const addLinesNumbering = (program: string) => {
  let currentLineNumber = 0;
  const withComments = program
    .trim()
    .split("\n")
    .map((line): string => {
      if (line.includes("N")) {
        currentLineNumber =
          Number(/N\w+/.exec(line)?.at(0)?.slice(1)) || currentLineNumber;
        return line;
      } else {
        currentLineNumber = Math.ceil((currentLineNumber + 1) / 10) * 10;
        return `N${currentLineNumber} ${line.trim()}`;
      }
    })
    .join("\n");

  return withComments;
};

export const removeLinesNumbering = (program: string) => {
  const withoutComments = program
    .trim()
    .split("\n")
    .map((line) =>
      line
        .split(" ")
        .filter((cmd) => !cmd.includes("N"))
        .join(" ")
    )
    .join("\n");

  return withoutComments;
};

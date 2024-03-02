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
    (end.x - start.x) ** 2 + (end.y - start.y) ** 2;
  const diameterSquared = 4 * radius ** 2;
  const center = { x: 0, y: 0 };

  if (diameterSquared < distanceBetweenPointsSquared) {
    throw new Error(errorMsg);
  } else if (diameterSquared > distanceBetweenPointsSquared) {
    const xMid = (end.x + start.x) / 2;
    const yMid = (end.y + start.y) / 2;

    const sign = (radius / Math.abs(radius)) * dir;

    center.x =
      xMid -
      (radius ** 2 - distanceBetweenPointsSquared / 4) ** 0.5 *
        ((start.y - end.y) / distanceBetweenPointsSquared ** 0.5) *
        sign;
    center.y =
      yMid -
      (radius ** 2 - distanceBetweenPointsSquared / 4) ** 0.5 *
        ((end.x - start.x) / distanceBetweenPointsSquared ** 0.5) *
        sign;
  } else {
    center.x = (end.x + start.x) / 2;
    center.y = (end.y + start.y) / 2;
  }

  return center;
};

type TempPoint = { x: unknown; y: unknown };

export const convertProgramToLinesData = (
  program: string,
  warningFn: (msg: string) => void = () => {}
): LineDataType[] | undefined => {
  const programLines = program.split("\n");
  const currentToolPosition = { x: 0, y: 0 };

  const linesData: LineDataType[] = programLines.map((line, i) => {
    const start: PointType = { ...currentToolPosition };
    let type: unknown = undefined;
    const end: TempPoint = { x: undefined, y: undefined };
    const center: TempPoint = { x: undefined, y: undefined };
    let counterClockwise = false;
    let radius = 0;

    const singleCommands = line.split(" ");

    const errorMsg = (msg: string) => `[${i}] ${msg}`;

    if (singleCommands[0][0] !== GCODE_CMD.G)
      throw new Error(errorMsg(ERROR_MSG.line));

    singleCommands.forEach((command) => {
      const code = command[0];
      const value = +command.slice(1);

      switch (code) {
        case GCODE_CMD.G: {
          const lineInfo = getLineType(value, errorMsg(ERROR_MSG.G));
          type = lineInfo.type;
          counterClockwise = !!lineInfo.counterClockwise;
          break;
        }
        case GCODE_CMD.X:
          if (value < 0) throw new Error(errorMsg(ERROR_MSG.Xnegative));
          end.x = value;
          break;
        case GCODE_CMD.Y:
          if (value < 0) throw new Error(errorMsg(ERROR_MSG.Ynegative));
          end.y = value;
          break;
        case GCODE_CMD.I:
          if (type !== LINE_TYPE.ARC)
            throw new Error(errorMsg(ERROR_MSG.Itype));
          center.x = start.x + value;
          break;
        case GCODE_CMD.J:
          if (type !== LINE_TYPE.ARC)
            throw new Error(errorMsg(ERROR_MSG.Jtype));
          center.y = start.y + value;
          break;
        case GCODE_CMD.R:
          if (type !== LINE_TYPE.ARC)
            throw new Error(errorMsg(ERROR_MSG.Rtype));
          radius = value;
          break;
      }
    });

    if (end.x === undefined) throw new Error(errorMsg(ERROR_MSG.Xmissing));
    else if (end.y === undefined) throw new Error(errorMsg(ERROR_MSG.Ymissing));

    // * from now end object is type of PointType so it is safe to use as PointType

    if (radius) {
      if (center.x !== undefined || center.y !== undefined)
        warningFn(errorMsg(ERROR_MSG.Roverrides));

      const dir = counterClockwise ? -1 : 1;
      const calculatedCenter = getCenterWithRadius(
        radius,
        start,
        end as PointType,
        dir,
        errorMsg(ERROR_MSG.noRsolution)
      );
      center.x = calculatedCenter.x;
      center.y = calculatedCenter.y;
    }

    if (
      type === LINE_TYPE.ARC &&
      (center.x === undefined || center.y === undefined)
    )
      throw new Error(errorMsg(ERROR_MSG.IJRmissing));

    currentToolPosition.x = end.x as number;
    currentToolPosition.y = end.y as number;

    if (type === LINE_TYPE.ARC) {
      const lineData: LineDataType = {
        type: type,
        start,
        end: end as PointType,
        center: center as PointType,
        counterClockwise,
      };
      return lineData;
    } else if (type === LINE_TYPE.LINE || type === LINE_TYPE.POSITIONING) {
      const lineData: LineDataType = {
        type: type,
        start,
        end: end as PointType,
      };
      return lineData;
    } else throw new Error(errorMsg(ERROR_MSG.command));
  });

  return linesData;
};

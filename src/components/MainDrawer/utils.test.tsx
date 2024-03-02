import { LINE_TYPE } from "../../utils/types";
import { ERROR_MSG } from "./constants";
import { convertProgramToLinesData } from "./utils";

describe("gcode interpreter testing", () => {
  test("positioning", () => {
    const programString = "G00 X1 Y3";
    expect(convertProgramToLinesData(programString)).toStrictEqual([
      {
        type: LINE_TYPE.POSITIONING,
        start: { x: 0, y: 0 },
        end: { x: 1, y: 3 },
      },
    ]);
  });

  test("straight line", () => {
    const programString = "G01 X1 Y1";
    expect(convertProgramToLinesData(programString)).toStrictEqual([
      { type: LINE_TYPE.LINE, start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
    ]);
  });

  test("arc with radius", () => {
    const programString1 = "G02 X1 Y1 R1";
    expect(convertProgramToLinesData(programString1)).toStrictEqual([
      {
        type: LINE_TYPE.ARC,
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
        counterClockwise: false,
        center: { x: 1, y: 0 },
      },
    ]);

    const programString2 = "G02 X1 Y1 R-1";
    expect(convertProgramToLinesData(programString2)).toStrictEqual([
      {
        type: LINE_TYPE.ARC,
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
        counterClockwise: false,
        center: { x: 0, y: 1 },
      },
    ]);
  });

  test("arc with radius counterclockwise", () => {
    const programString1 = "G03 X1 Y1 R1";
    expect(convertProgramToLinesData(programString1)).toStrictEqual([
      {
        type: LINE_TYPE.ARC,
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
        counterClockwise: true,
        center: { x: 0, y: 1 },
      },
    ]);

    const programString2 = "G03 X1 Y1 R-1";
    expect(convertProgramToLinesData(programString2)).toStrictEqual([
      {
        type: LINE_TYPE.ARC,
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
        counterClockwise: true,
        center: { x: 1, y: 0 },
      },
    ]);
  });

  test("arc with offset", () => {
    const programString1 = "G02 X1 Y1 I1 J0";
    expect(convertProgramToLinesData(programString1)).toStrictEqual([
      {
        type: LINE_TYPE.ARC,
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
        counterClockwise: false,
        center: { x: 1, y: 0 },
      },
    ]);

    const programString2 = "G02 X2 Y2 I0 J1";
    expect(convertProgramToLinesData(programString2)).toStrictEqual([
      {
        type: LINE_TYPE.ARC,
        start: { x: 0, y: 0 },
        end: { x: 2, y: 2 },
        counterClockwise: false,
        center: { x: 0, y: 1 },
      },
    ]);
  });

  test("arc with offset counterclockwise", () => {
    const programString1 = "G03 X1 Y1 I1 J0";
    expect(convertProgramToLinesData(programString1)).toStrictEqual([
      {
        type: LINE_TYPE.ARC,
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
        counterClockwise: true,
        center: { x: 1, y: 0 },
      },
    ]);

    const programString2 = "G03 X2 Y2 I0 J1";
    expect(convertProgramToLinesData(programString2)).toStrictEqual([
      {
        type: LINE_TYPE.ARC,
        start: { x: 0, y: 0 },
        end: { x: 2, y: 2 },
        counterClockwise: true,
        center: { x: 0, y: 1 },
      },
    ]);
  });
});

describe("gcode interpreter error throwing", () => {
  test("wrong gcode", () => {
    const programString = "G020 X1 Y1";

    expect(() => {
      convertProgramToLinesData(programString);
    }).toThrow("[0] " + ERROR_MSG.G);
  });

  test("wrong command", () => {
    const programString = "X1 Y1 G01";

    expect(() => {
      convertProgramToLinesData(programString);
    }).toThrow("[0] " + ERROR_MSG.line);
  });

  test("unexpected arc arguments", () => {
    const programString1 = "G01 X1 Y1 I1 J1";

    expect(() => {
      convertProgramToLinesData(programString1);
    }).toThrow("[0] " + ERROR_MSG.Itype);

    const programString2 = "G01 X1 Y1 J1";

    expect(() => {
      convertProgramToLinesData(programString2);
    }).toThrow("[0] " + ERROR_MSG.Jtype);

    const programString3 = "G00 X1 Y1 R1";

    expect(() => {
      convertProgramToLinesData(programString3);
    }).toThrow("[0] " + ERROR_MSG.Rtype);
  });

  test("missing arguments", () => {
    const programString1 = "G01 Y1";

    expect(() => {
      convertProgramToLinesData(programString1);
    }).toThrow("[0] " + ERROR_MSG.Xmissing);

    const programString2 = "G01 X1 ";

    expect(() => {
      convertProgramToLinesData(programString2);
    }).toThrow("[0] " + ERROR_MSG.Ymissing);

    const programString3 = "G03 X1 Y1";

    expect(() => {
      convertProgramToLinesData(programString3);
    }).toThrow("[0] " + ERROR_MSG.IJRmissing);
  });
});

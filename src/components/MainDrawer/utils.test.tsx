import { LINE_TYPE } from "../../utils/types";
import { ERROR_MSG } from "./constants";
import {
  addLinesNumbering,
  convertProgramToLinesData,
  removeLinesNumbering,
} from "./utils";

const getErrorMsg = (msg: string) => "[N10] " + msg;

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
    }).toThrow(getErrorMsg(ERROR_MSG.G));
  });

  test("wrong command", () => {
    const programString = "X1 Y1";

    expect(() => {
      convertProgramToLinesData(programString);
    }).toThrow(getErrorMsg(ERROR_MSG.line));
  });

  test("unexpected arc arguments", () => {
    const programString1 = "G01 X1 Y1 I1 J1";

    expect(() => {
      convertProgramToLinesData(programString1);
    }).toThrow(getErrorMsg(ERROR_MSG.Itype));

    const programString2 = "G01 X1 Y1 J1";

    expect(() => {
      convertProgramToLinesData(programString2);
    }).toThrow(getErrorMsg(ERROR_MSG.Jtype));

    const programString3 = "G00 X1 Y1 R1";

    expect(() => {
      convertProgramToLinesData(programString3);
    }).toThrow(getErrorMsg(ERROR_MSG.Rtype));
  });

  test("negative arguments", () => {
    const programString1 = "G01 X-1 Y1";

    expect(() => {
      convertProgramToLinesData(programString1);
    }).toThrow(getErrorMsg(ERROR_MSG.Xnegative));

    const programString2 = "G02 X1 Y-1 I1 J1";

    expect(() => {
      convertProgramToLinesData(programString2);
    }).toThrow(getErrorMsg(ERROR_MSG.Ynegative));
  });

  test("invalid radius", () => {
    const programString = "G02 X2 Y2 R1";

    expect(() => {
      convertProgramToLinesData(programString);
    }).toThrow(getErrorMsg(ERROR_MSG.noRsolution));
  });
});

describe("adding lines numbering to program", () => {
  test("without numbering", () => {
    const program =
      "G01 X0 Y.5\nG02 X.5 Y1 R.5\nG01 X1 Y1\nG03 X4 Y1 R5\nG01 X4.5 Y1\nG02 X5 Y.5 J-.5\nG01 X5 Y0";
    const numberedProgram =
      "N10 G01 X0 Y.5\nN20 G02 X.5 Y1 R.5\nN30 G01 X1 Y1\nN40 G03 X4 Y1 R5\nN50 G01 X4.5 Y1\nN60 G02 X5 Y.5 J-.5\nN70 G01 X5 Y0";

    expect(addLinesNumbering(program)).toMatch(numberedProgram);
  });

  test("with numbering", () => {
    const program =
      "N10 G01 X0 Y.5\nN15 G02 X.5 Y1 R.5\nN20 G01 X1 Y1\nN30 G03 X4 Y1 R5\nN40 G01 X4.5 Y1\nN50 G02 X5 Y.5 J-.5\nN60 G01 X5 Y0";

    expect(addLinesNumbering(program)).toMatch(program);
  });

  test("with partly numbered", () => {
    const program =
      "G01 X0 Y.5\nN15 G02 X.5 Y1 R.5\nG01 X1 Y1\nN30 G03 X4 Y1 R5\nG01 X4.5 Y1\nN45 G02 X5 Y.5 J-.5\nG01 X5 Y0";
    const numberedProgram =
      "N10 G01 X0 Y.5\nN15 G02 X.5 Y1 R.5\nN20 G01 X1 Y1\nN30 G03 X4 Y1 R5\nN40 G01 X4.5 Y1\nN45 G02 X5 Y.5 J-.5\nN50 G01 X5 Y0";

    expect(addLinesNumbering(program)).toMatch(numberedProgram);
  });
});

describe("removing lines numbering from program", () => {
  test("without numbering", () => {
    const program =
      "G01 X0 Y.5\nG02 X.5 Y1 R.5\nG01 X1 Y1\nG03 X4 Y1 R5\nG01 X4.5 Y1\nG02 X5 Y.5 J-.5\nG01 X5 Y0";

    expect(removeLinesNumbering(program)).toMatch(program);
  });

  test("with numbering", () => {
    const program =
      "N10 G01 X0 Y.5\nN15 G02 X.5 Y1 R.5\nN20 G01 X1 Y1\nN30 G03 X4 Y1 R5\nN40 G01 X4.5 Y1\nN50 G02 X5 Y.5 J-.5\nN60 G01 X5 Y0";
    const unnumberedProgram =
      "G01 X0 Y.5\nG02 X.5 Y1 R.5\nG01 X1 Y1\nG03 X4 Y1 R5\nG01 X4.5 Y1\nG02 X5 Y.5 J-.5\nG01 X5 Y0";

    expect(removeLinesNumbering(program)).toMatch(unnumberedProgram);
  });

  test("with partly numbered", () => {
    const program =
      "G01 X0 Y.5\nN15 G02 X.5 Y1 R.5\nG01 X1 Y1\nN30 G03 X4 Y1 R5\nG01 X4.5 Y1\nN45 G02 X5 Y.5 J-.5\nG01 X5 Y0";
    const unnumberedProgram =
      "G01 X0 Y.5\nG02 X.5 Y1 R.5\nG01 X1 Y1\nG03 X4 Y1 R5\nG01 X4.5 Y1\nG02 X5 Y.5 J-.5\nG01 X5 Y0";

    expect(removeLinesNumbering(program)).toMatch(unnumberedProgram);
  });
});

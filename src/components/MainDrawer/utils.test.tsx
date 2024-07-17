import { LINE_TYPE } from '@utils';
import { ERROR_MSG } from './constants';
import {
  addLinesNumbering,
  convertProgramToLinesData,
  removeLinesNumbering,
} from './utils';

const getErrorMsg = (msg: string) => '[N10] ' + msg;

describe('#convertProgramToLinesData - gcode interpreter testing', () => {
  test('positioning', () => {
    const programString = 'G00 X1 Z3';
    expect(convertProgramToLinesData(programString)).toStrictEqual([
      {
        type: LINE_TYPE.POSITIONING,
        start: { x: 0, z: 0 },
        end: { x: 1, z: 3 },
      },
    ]);
  });

  test('straight line', () => {
    const programString = 'G01 X1 Z1';
    expect(convertProgramToLinesData(programString)).toStrictEqual([
      { type: LINE_TYPE.LINE, start: { x: 0, z: 0 }, end: { x: 1, z: 1 } },
    ]);
  });

  test('arc with radius', () => {
    const programString1 = 'G02 X1 Z1 R1';
    expect(convertProgramToLinesData(programString1)).toStrictEqual([
      {
        type: LINE_TYPE.ARC,
        start: { x: 0, z: 0 },
        end: { x: 1, z: 1 },
        counterClockwise: false,
        center: { x: 1, z: 0 },
      },
    ]);

    const programString2 = 'G02 X1 Z1 R-1';
    expect(convertProgramToLinesData(programString2)).toStrictEqual([
      {
        type: LINE_TYPE.ARC,
        start: { x: 0, z: 0 },
        end: { x: 1, z: 1 },
        counterClockwise: false,
        center: { x: 0, z: 1 },
      },
    ]);
  });

  test('arc with radius counterclockwise', () => {
    const programString1 = 'G03 X1 Z1 R1';
    expect(convertProgramToLinesData(programString1)).toStrictEqual([
      {
        type: LINE_TYPE.ARC,
        start: { x: 0, z: 0 },
        end: { x: 1, z: 1 },
        counterClockwise: true,
        center: { x: 0, z: 1 },
      },
    ]);

    const programString2 = 'G03 X1 Z1 R-1';
    expect(convertProgramToLinesData(programString2)).toStrictEqual([
      {
        type: LINE_TYPE.ARC,
        start: { x: 0, z: 0 },
        end: { x: 1, z: 1 },
        counterClockwise: true,
        center: { x: 1, z: 0 },
      },
    ]);
  });

  test('arc with offset', () => {
    const programString1 = 'G02 X1 Z1 I1 K0';
    expect(convertProgramToLinesData(programString1)).toStrictEqual([
      {
        type: LINE_TYPE.ARC,
        start: { x: 0, z: 0 },
        end: { x: 1, z: 1 },
        counterClockwise: false,
        center: { x: 1, z: 0 },
      },
    ]);

    const programString2 = 'G02 X2 Z2 I0 K1';
    expect(convertProgramToLinesData(programString2)).toStrictEqual([
      {
        type: LINE_TYPE.ARC,
        start: { x: 0, z: 0 },
        end: { x: 2, z: 2 },
        counterClockwise: false,
        center: { x: 0, z: 1 },
      },
    ]);
  });

  test('arc with offset counterclockwise', () => {
    const programString1 = 'G03 X1 Z1 I1 K0';
    expect(convertProgramToLinesData(programString1)).toStrictEqual([
      {
        type: LINE_TYPE.ARC,
        start: { x: 0, z: 0 },
        end: { x: 1, z: 1 },
        counterClockwise: true,
        center: { x: 1, z: 0 },
      },
    ]);

    const programString2 = 'G03 X2 Z2 I0 K1';
    expect(convertProgramToLinesData(programString2)).toStrictEqual([
      {
        type: LINE_TYPE.ARC,
        start: { x: 0, z: 0 },
        end: { x: 2, z: 2 },
        counterClockwise: true,
        center: { x: 0, z: 1 },
      },
    ]);
  });
});

describe('#convertProgramToLinesData - gcode interpreter error throwing', () => {
  test('wrong gcode', () => {
    const programString = 'G020 X1 Z1';

    expect(() => {
      convertProgramToLinesData(programString);
    }).toThrow(getErrorMsg(ERROR_MSG.G));
  });

  test('wrong command', () => {
    const programString = 'X1 Z1';

    expect(() => {
      convertProgramToLinesData(programString);
    }).toThrow(getErrorMsg(ERROR_MSG.line));
  });

  test('unexpected arc arguments', () => {
    const programString1 = 'G01 X1 Z1 I1 K1';

    expect(() => {
      convertProgramToLinesData(programString1);
    }).toThrow(getErrorMsg(ERROR_MSG.Itype));

    const programString2 = 'G01 X1 Z1 K1';

    expect(() => {
      convertProgramToLinesData(programString2);
    }).toThrow(getErrorMsg(ERROR_MSG.Ktype));

    const programString3 = 'G00 X1 Z1 R1';

    expect(() => {
      convertProgramToLinesData(programString3);
    }).toThrow(getErrorMsg(ERROR_MSG.Rtype));
  });

  test('negative arguments', () => {
    const programString1 = 'G01 X-1 Z1';

    expect(() => {
      convertProgramToLinesData(programString1);
    }).toThrow(getErrorMsg(ERROR_MSG.Xnegative));

    const programString2 = 'G02 X1 Z-1 I1 K1';

    expect(() => {
      convertProgramToLinesData(programString2);
    }).toThrow(getErrorMsg(ERROR_MSG.Znegative));
  });

  test('invalid radius', () => {
    const programString = 'G02 X2 Z2 R1';

    expect(() => {
      convertProgramToLinesData(programString);
    }).toThrow(getErrorMsg(ERROR_MSG.noRsolution));
  });
});

describe('#addLinesNumbering', () => {
  test('without numbering', () => {
    const program =
      'G01 X0 Z.5\nG02 X.5 Z1 R.5\nG01 X1 Z1\nG03 X4 Z1 R5\nG01 X4.5 Z1\nG02 X5 Z.5 K-.5\nG01 X5 Z0';
    const numberedProgram =
      'N10 G01 X0 Z.5\nN20 G02 X.5 Z1 R.5\nN30 G01 X1 Z1\nN40 G03 X4 Z1 R5\nN50 G01 X4.5 Z1\nN60 G02 X5 Z.5 K-.5\nN70 G01 X5 Z0';

    expect(addLinesNumbering(program)).toMatch(numberedProgram);
  });

  test('with numbering', () => {
    const program =
      'N10 G01 X0 Z.5\nN15 G02 X.5 Z1 R.5\nN20 G01 X1 Z1\nN30 G03 X4 Z1 R5\nN40 G01 X4.5 Z1\nN50 G02 X5 Z.5 K-.5\nN60 G01 X5 Z0';

    expect(addLinesNumbering(program)).toMatch(program);
  });

  test('with partly numbered', () => {
    const program =
      'G01 X0 Z.5\nN15 G02 X.5 Z1 R.5\nG01 X1 Z1\nN30 G03 X4 Z1 R5\nG01 X4.5 Z1\nN45 G02 X5 Z.5 K-.5\nG01 X5 Z0';
    const numberedProgram =
      'N10 G01 X0 Z.5\nN15 G02 X.5 Z1 R.5\nN20 G01 X1 Z1\nN30 G03 X4 Z1 R5\nN40 G01 X4.5 Z1\nN45 G02 X5 Z.5 K-.5\nN50 G01 X5 Z0';

    expect(addLinesNumbering(program)).toMatch(numberedProgram);
  });
});

describe('#removeLinesNumbering', () => {
  test('without numbering', () => {
    const program =
      'G01 X0 Z.5\nG02 X.5 Z1 R.5\nG01 X1 Z1\nG03 X4 Z1 R5\nG01 X4.5 Z1\nG02 X5 Z.5 K-.5\nG01 X5 Z0';

    expect(removeLinesNumbering(program)).toMatch(program);
  });

  test('with numbering', () => {
    const program =
      'N10 G01 X0 Z.5\nN15 G02 X.5 Z1 R.5\nN20 G01 X1 Z1\nN30 G03 X4 Z1 R5\nN40 G01 X4.5 Z1\nN50 G02 X5 Z.5 K-.5\nN60 G01 X5 Z0';
    const unnumberedProgram =
      'G01 X0 Z.5\nG02 X.5 Z1 R.5\nG01 X1 Z1\nG03 X4 Z1 R5\nG01 X4.5 Z1\nG02 X5 Z.5 K-.5\nG01 X5 Z0';

    expect(removeLinesNumbering(program)).toMatch(unnumberedProgram);
  });

  test('with partly numbered', () => {
    const program =
      'G01 X0 Z.5\nN15 G02 X.5 Z1 R.5\nG01 X1 Z1\nN30 G03 X4 Z1 R5\nG01 X4.5 Z1\nN45 G02 X5 Z.5 K-.5\nG01 X5 Z0';
    const unnumberedProgram =
      'G01 X0 Z.5\nG02 X.5 Z1 R.5\nG01 X1 Z1\nG03 X4 Z1 R5\nG01 X4.5 Z1\nG02 X5 Z.5 K-.5\nG01 X5 Z0';

    expect(removeLinesNumbering(program)).toMatch(unnumberedProgram);
  });
});

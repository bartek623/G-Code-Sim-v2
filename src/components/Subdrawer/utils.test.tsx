import { savedType } from './types';
import { isProgramObjectValid, readUploadedFile } from './utils';

const validProgram: savedType = {
  title: 'title',
  code: '123',
  date: 0,
};
// eslint-disable-next-line
const invalidProgram: any = {
  title: 'title',
  code: 123,
  date: '0',
};

describe('#isProgramObjectValid', () => {
  test('valid program validation', () => {
    expect(isProgramObjectValid(validProgram, [])).toStrictEqual(validProgram);
  });

  test('valid program with unnecessary fields validation', () => {
    const bonusFields = {
      test: '',
      field: 12,
      true: false,
    };

    expect(
      isProgramObjectValid({ ...validProgram, ...bonusFields }, []),
    ).toStrictEqual(validProgram);
  });

  test('invalid program object types validation', () => {
    expect(isProgramObjectValid(invalidProgram, [])).toBeUndefined();
  });

  test('valid program object with occupied title validation', () => {
    expect(isProgramObjectValid(validProgram, [validProgram])).toBeUndefined();
  });
});

describe('#readUploadedFile', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('read valid file', async () => {
    const validProgram2: savedType = {
      ...validProgram,
      title: 'test2',
      date: 1,
    };

    const programsString = JSON.stringify([validProgram, validProgram2]);

    const originalText = File.prototype.text;

    File.prototype.text = jest
      .fn()
      .mockImplementation(() => Promise.resolve(programsString));

    const file = new File([programsString], 'file.json');

    expect(await readUploadedFile(file, [])).toStrictEqual({
      newPrograms: [validProgram2, validProgram],
      skipped: 0,
    });

    File.prototype.text = originalText;
  });

  test('read valid file, skip invalid program', async () => {
    const programsString = JSON.stringify([validProgram, invalidProgram]);

    const originalText = File.prototype.text;

    File.prototype.text = jest
      .fn()
      .mockImplementation(() => Promise.resolve(programsString));

    const file = new File([programsString], 'file.json');

    expect(await readUploadedFile(file, [])).toStrictEqual({
      newPrograms: [validProgram],
      skipped: 1,
    });

    File.prototype.text = originalText;
  });

  test('read valid file, skip duplicated program', async () => {
    const programsString = JSON.stringify([validProgram, validProgram]);

    const originalText = File.prototype.text;

    File.prototype.text = jest
      .fn()
      .mockImplementation(() => Promise.resolve(programsString));

    const file = new File([programsString], 'file.json');

    expect(await readUploadedFile(file, [])).toStrictEqual({
      newPrograms: [validProgram],
      skipped: 1,
    });

    File.prototype.text = originalText;
  });

  test('read valid file, skip already saved program', async () => {
    const validProgram2: savedType = {
      ...validProgram,
      title: 'test2',
      date: 1,
    };

    const programsString = JSON.stringify([validProgram, validProgram2]);

    const originalText = File.prototype.text;

    File.prototype.text = jest
      .fn()
      .mockImplementation(() => Promise.resolve(programsString));

    const file = new File([programsString], 'file.json');

    await expect(readUploadedFile(file, [validProgram])).resolves.toStrictEqual(
      {
        newPrograms: [validProgram2, validProgram],
        skipped: 1,
      },
    );

    File.prototype.text = originalText;
  });
});

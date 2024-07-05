import { SAVED_TYPE, savedKeyType, savedType, savedValuesType } from "./types";

const savedKey = "saved-programs";

// This is saved element by default, created only if local storage was empty
const defaultElement: savedType = {
  title: "DEFAULT MOCKUP ELEMENT",
  code: "G02 X1 Z1 R1\nG01 X4 Z1\nG02 X5 Z0 J-1",
  date: Date.now(),
};

export const setSavedStorage = (programsToSave: savedType[]) => {
  localStorage.setItem(savedKey, JSON.stringify(programsToSave));
};

export const getSavedStorage = () => {
  const savedString = localStorage.getItem(savedKey);
  const saved: savedType[] = savedString
    ? JSON.parse(savedString)
    : [defaultElement];

  return saved;
};

export const isProgramObjectValid = (
  program: savedType,
  currPrograms: savedType[]
): savedType | undefined => {
  const validProgram: Record<string, savedValuesType> = {};

  for (const key in SAVED_TYPE) {
    const typedKey = key as savedKeyType;
    if (typeof program[typedKey] !== typeof SAVED_TYPE[typedKey])
      return undefined;

    validProgram[typedKey] = program[typedKey];
  }

  if (currPrograms.some((currProgram) => currProgram.title === program.title))
    return undefined;

  return validProgram as savedType;
};

export const readUploadedFile = async (
  file: File,
  currPrograms: savedType[]
) => {
  let skipped = 0;
  const newPrograms = [...currPrograms];

  const data = await file.text();
  const uploadedPrograms: savedType[] = JSON.parse(data);

  uploadedPrograms.forEach((newProgram) => {
    const validProgram = isProgramObjectValid(newProgram, newPrograms);

    if (!validProgram) return ++skipped;

    newPrograms.push(validProgram);
  });

  newPrograms.sort((a, b) => b.date - a.date);

  return { newPrograms, skipped };
};

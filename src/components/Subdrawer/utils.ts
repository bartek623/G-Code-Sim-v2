import { savedType } from "./types";

const savedKey = "saved-programs";

// This is saved element by default, created only if local storage was empty
const defaultElement: savedType = {
  title: "DEFAULT MOCKUP ELEMENT",
  code: "G02 X1 Y1 R1\nG01 X4 Y1\nG02 X5 Y0 J-1",
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

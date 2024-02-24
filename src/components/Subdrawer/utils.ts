import { savedType } from "./types";

const savedKey = "saved-programs";

export const setSavedStorage = (programsToSave: savedType[]) => {
  localStorage.setItem(savedKey, JSON.stringify(programsToSave));
};

export const getSavedStorage = () => {
  const savedString = localStorage.getItem(savedKey);
  const saved: savedType[] = savedString ? JSON.parse(savedString) : [];

  return saved;
};

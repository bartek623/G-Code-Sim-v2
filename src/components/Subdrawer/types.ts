import { ValuesType } from "@utils";

export const SAVED_TYPE = {
  title: String(),
  code: String(),
  date: Number(),
};

export type savedType = typeof SAVED_TYPE;

export type savedKeyType = keyof savedType;
export type savedValuesType = ValuesType<typeof SAVED_TYPE>;

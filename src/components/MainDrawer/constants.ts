import { ValuesType } from "../../utils/types";

export const MAINDRAWER_LABEL = "GCodeSim";

export const SUBDRAWER_MODES = {
  save: "save",
  load: "load",
  none: "none",
} as const;

export type subdrawerModesType = ValuesType<typeof SUBDRAWER_MODES>;

export const SUBDRAWER_LABEL: Record<subdrawerModesType, string> = {
  save: "Save your program",
  load: "Load saved program",
  none: "",
};

export type subdrawerState = {
  open: boolean;
  mode: subdrawerModesType;
};

export const SUBDRAWER_DEFAULT: subdrawerState = {
  open: false,
  mode: SUBDRAWER_MODES.none,
};

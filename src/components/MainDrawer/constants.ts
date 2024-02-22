import { ValuesType } from "../../utils/types";

export const MAINDRAWER_LABEL = "GCodeSim";

export const SUBDRAWER_LABEL = {
  save: "Save your program",
  load: "Load saved program",
  none: "",
} as const;

export type subdrawerLabelType = ValuesType<typeof SUBDRAWER_LABEL>;

export type subdrawerState = {
  open: boolean;
  label: subdrawerLabelType;
};

export const SUBDRAWER_DEFAULT: subdrawerState = {
  open: false,
  label: "",
};

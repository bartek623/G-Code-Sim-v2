import { LineDataType } from "../../utils/types";

type LineType = "positioning" | "line" | "arc1" | "arc2" | undefined;
const getLineType = (code: string): LineType => {
  switch (code) {
    case "00":
      return "positioning";
    case "01":
      return "line";
    case "02":
      return "arc1";
    case "03":
      return "arc1";
  }
};

type LineDataTempType = {
  type?: LineType;
  end: { x?: number; y?: number };
  offset: { x?: number; y?: number };
};

export const convertProgramToLinesData = (
  program: string
): LineDataType[] | undefined => {
  try {
    const programLines = program.split("\n");

    const linesData: LineDataType[] = programLines.map((line, i) => {
      const lineData: LineDataTempType = { end: {}, offset: {} };
      const singleCommands = line.split(" ");

      if (singleCommands[0][0] !== "G")
        throw new Error(`Wrong command line [${i}]`);

      singleCommands.forEach((command) => {
        switch (command[0]) {
          case "G":
            lineData.type = getLineType(command.slice(1));
            break;
          case "X":
            lineData.end.x = +command.slice(1);
            break;
          case "Y":
            lineData.end.y = +command.slice(1);
            break;
          case "I":
            if (lineData.type !== "arc1")
              throw new Error(`Wrong command usage [${i}]`);
            lineData.offset.x = +command.slice(1);
            break;
          case "J":
            if (lineData.type !== "arc1")
              throw new Error(`Wrong command usage [${i}]`);
            lineData.offset.y = +command.slice(1);
            break;
        }
      });

      return lineData as LineDataType;
    });

    return linesData;
  } catch (err) {
    console.error(err);
  }
};

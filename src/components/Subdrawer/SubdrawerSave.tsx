import {
  Button,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
  styled,
} from "@mui/material";
import { RefObject, useRef } from "react";

const StyledContainer = styled(Stack)`
  margin: ${({ theme }) => theme.spacing(1.5)};
  gap: ${({ theme }) => theme.spacing(3)};
  height: 100%;
  overflow-y: hidden;
`;

const StyledInput = styled(TextField)`
  width: 100%;
`;

const StyledTypography = styled(Typography)`
  background-color: #f2f2f2;
  color: #7a7a7a;
  border-radius: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(1)};
  white-space: pre-wrap;
  overflow-y: auto;
`;

const StyledButton = styled(Button)`
  margin-top: auto;
`;

type SubdrawerSaveProps = {
  textFieldRef: RefObject<TextFieldProps>;
};

export function SubdrawerSave({ textFieldRef }: SubdrawerSaveProps) {
  const inputRef = useRef<TextFieldProps>(null);
  const program = textFieldRef.current?.value as string;

  const saveHandler = () => {
    type dataType = {
      title: string;
      code: string;
      date: number;
    };

    try {
      const data: dataType = {
        title: inputRef.current?.value as string,
        code: program,
        date: Date.now(),
      };

      const currentProgramsString = localStorage.getItem("saved-programs");
      const currentPrograms: dataType[] = currentProgramsString
        ? JSON.parse(currentProgramsString)
        : [];

      if (currentPrograms.some((el: dataType) => el.title === data.title))
        throw new Error("Given title is already taken");

      currentPrograms.push(data);

      localStorage.setItem("saved-programs", JSON.stringify(currentPrograms));
      console.log(currentPrograms);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <StyledContainer>
      <StyledInput label="title" variant="standard" inputRef={inputRef} />
      <StyledTypography paragraph>{program}</StyledTypography>
      <StyledButton variant="contained" onClick={saveHandler}>
        Save
      </StyledButton>
    </StyledContainer>
  );
}

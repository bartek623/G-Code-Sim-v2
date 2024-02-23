import {
  Button,
  TextField,
  TextFieldProps,
  Typography,
  styled,
} from "@mui/material";
import { RefObject, useRef } from "react";
import { SubdrawerContainer } from "./SubdrawerContentContainer";
import { savedType } from "./types";

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
  onClose: () => void;
};

export function SubdrawerSave({ textFieldRef, onClose }: SubdrawerSaveProps) {
  const inputRef = useRef<TextFieldProps>(null);
  const program = textFieldRef.current?.value as string;

  const saveHandler = () => {
    try {
      const data: savedType = {
        title: inputRef.current?.value as string,
        code: program,
        date: Date.now(),
      };

      if (program.length === 0) throw new Error("Your code is empty");

      const currentProgramsString = localStorage.getItem("saved-programs");
      const currentPrograms: savedType[] = currentProgramsString
        ? JSON.parse(currentProgramsString)
        : [];

      if (currentPrograms.some((el: savedType) => el.title === data.title))
        throw new Error("Given title is already taken");

      currentPrograms.push(data);

      localStorage.setItem("saved-programs", JSON.stringify(currentPrograms));
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SubdrawerContainer gap={3}>
      <StyledInput label="title" variant="standard" inputRef={inputRef} />
      <StyledTypography paragraph>{program}</StyledTypography>
      <StyledButton variant="contained" onClick={saveHandler}>
        Save
      </StyledButton>
    </SubdrawerContainer>
  );
}

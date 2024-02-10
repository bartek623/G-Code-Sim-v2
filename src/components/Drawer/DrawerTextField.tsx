import { Container, TextField, TextFieldProps, styled } from "@mui/material";
import { TEXT_FIELD_BACKGROUND, TEXT_FIELD_COLOR } from "./constants";
import { RefObject } from "react";

const StyledContainer = styled(Container)`
  margin-top: ${({ theme }) => theme.spacing(1.5)};
  height: 100%;
  overflow-y: auto;
`;

const StyledTextField = styled(TextField)`
  border-radius: ${({ theme }) => theme.spacing(1)};
  overflow: hidden;

  & label,
  & textarea {
    color: ${TEXT_FIELD_COLOR};
  }
  background-color: ${TEXT_FIELD_BACKGROUND};
  min-height: 100%;

  & textarea {
    width: 320px;
  }

  & div {
    flex: 1 100%;
    align-items: start;
  }
`;

type DrawerTextFieldProps = {
  textFieldRef: RefObject<TextFieldProps>;
};

export function DrawerTextField({ textFieldRef }: DrawerTextFieldProps) {
  return (
    <StyledContainer>
      <StyledTextField
        inputRef={textFieldRef}
        multiline
        variant="filled"
        label="GCode Program"
      />
    </StyledContainer>
  );
}

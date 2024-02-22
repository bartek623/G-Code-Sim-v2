import {
  Button,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
  styled,
} from "@mui/material";
import { RefObject } from "react";

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
  const program = textFieldRef.current?.value as string;
  return (
    <StyledContainer>
      <StyledInput label="title" variant="standard" />
      <StyledTypography paragraph>{program}</StyledTypography>
      <StyledButton variant="contained">Save</StyledButton>
    </StyledContainer>
  );
}

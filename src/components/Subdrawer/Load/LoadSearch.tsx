import { styled, TextField, TextFieldProps } from '@mui/material';

const StyledSearch = styled(TextField)`
  & input {
    padding: ${({ theme }) => theme.spacing(1)};
  }
`;

export function LoadSearch(props: TextFieldProps) {
  return <StyledSearch {...props} />;
}

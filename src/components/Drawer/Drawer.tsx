import { Close } from "@mui/icons-material";
import {
  Button,
  Container,
  Divider,
  IconButton,
  Drawer as MuiDrawer,
  TextField,
  styled,
} from "@mui/material";
import { TEXT_FIELD_BACKGROUND, TEXT_FIELD_COLOR } from "./constants";

const StyledIconBtn = styled(IconButton)`
  margin-left: auto;
`;

const StyledBtn = styled(Button)`
  margin: ${({ theme }) => theme.spacing(1)};
`;

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

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Drawer({ isOpen, onClose }: DrawerProps) {
  return (
    <MuiDrawer open={isOpen} variant="persistent">
      <StyledIconBtn onClick={onClose}>
        <Close />
      </StyledIconBtn>
      <Divider />
      <StyledContainer>
        <StyledTextField multiline variant="filled" label="GCode Program" />
      </StyledContainer>
      <StyledBtn variant="contained">run</StyledBtn>
    </MuiDrawer>
  );
}

import { Close } from "@mui/icons-material";
import {
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

const StyledTextField = styled(TextField)`
  margin-top: ${({ theme }) => theme.spacing(1.5)};
  border-radius: ${({ theme }) => theme.spacing(1)};
  overflow: hidden;

  & label,
  & textarea {
    color: ${TEXT_FIELD_COLOR};
  }
  background-color: ${TEXT_FIELD_BACKGROUND};

  & textarea {
    width: 320px;
    min-height: 100px !important;
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
      <Container sx={{ style: { height: "600px" } }}>
        <StyledTextField multiline variant="filled" label="GCode" />
      </Container>
    </MuiDrawer>
  );
}

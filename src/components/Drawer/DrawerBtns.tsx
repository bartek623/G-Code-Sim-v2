import { PlayArrow, Save, Upload } from "@mui/icons-material";
import { Button, Container, styled } from "@mui/material";

const StyledBtnsContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(1)};
`;

const StyledBtn = styled(Button)`
  width: 100%;
`;

export function DrawerBtns() {
  return (
    <StyledBtnsContainer>
      <StyledBtn variant="contained">
        <Save />
      </StyledBtn>
      <StyledBtn variant="contained">
        <Upload />
      </StyledBtn>
      <StyledBtn variant="contained">
        <PlayArrow />
      </StyledBtn>
    </StyledBtnsContainer>
  );
}

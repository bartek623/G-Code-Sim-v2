import { PlayArrow, Save, Upload, ViewInAr } from "@mui/icons-material";
import { Button, Container, styled } from "@mui/material";

const StyledBtnsContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(0.4)};
  padding: ${({ theme }) => theme.spacing(1)};
`;

const StyledBtn = styled(Button)`
  width: 100%;
`;

type DrawerBtnsProps = {
  onRun: () => void;
  onShowGeo: () => void;
};

export function DrawerBtns({ onRun, onShowGeo }: DrawerBtnsProps) {
  return (
    <StyledBtnsContainer>
      <StyledBtn variant="contained">
        <Save />
      </StyledBtn>
      <StyledBtn variant="contained">
        <Upload />
      </StyledBtn>
      <StyledBtn variant="contained" onClick={onShowGeo}>
        <ViewInAr />
      </StyledBtn>
      <StyledBtn variant="contained" onClick={onRun}>
        <PlayArrow />
      </StyledBtn>
    </StyledBtnsContainer>
  );
}

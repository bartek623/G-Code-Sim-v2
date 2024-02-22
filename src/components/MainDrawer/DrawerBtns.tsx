import {
  PlayArrow,
  Save,
  Upload,
  ViewInAr,
  ViewInArOutlined,
} from "@mui/icons-material";
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
  showGeo: boolean;
  onSubOpen: (state: "save" | "load") => void;
};

export function DrawerBtns({
  onRun,
  onShowGeo,
  showGeo,
  onSubOpen,
}: DrawerBtnsProps) {
  const onSaveHandler = () => {
    onSubOpen("save");
  };

  const onLoadHandler = () => {
    onSubOpen("load");
  };

  return (
    <StyledBtnsContainer>
      <StyledBtn variant="contained" onClick={onSaveHandler}>
        <Save />
      </StyledBtn>
      <StyledBtn variant="contained" onClick={onLoadHandler}>
        <Upload />
      </StyledBtn>
      <StyledBtn variant="contained" onClick={onShowGeo}>
        {showGeo ? <ViewInArOutlined /> : <ViewInAr />}
      </StyledBtn>
      <StyledBtn variant="contained" onClick={onRun}>
        <PlayArrow />
      </StyledBtn>
    </StyledBtnsContainer>
  );
}

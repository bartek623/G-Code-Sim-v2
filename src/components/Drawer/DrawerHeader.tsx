import { Container, Typography, styled } from "@mui/material";
import { CloseBtn } from "../UI";
import { InfoBtn } from "../UI/InfoBtn";

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
`;

type DrawerHeaderProps = {
  onClose: () => void;
};

export function DrawerHeader({ onClose }: DrawerHeaderProps) {
  return (
    <StyledContainer disableGutters>
      <InfoBtn onClick={() => {}} />
      <Typography variant="h2" color="primary">
        GCodeSim
      </Typography>
      <CloseBtn onClose={onClose} />
    </StyledContainer>
  );
}

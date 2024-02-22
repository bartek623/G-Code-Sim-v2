import { Container, Typography, styled } from "@mui/material";
import { CloseBtn, InfoBtn } from "../Btns";

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(3)};
`;

type DrawerHeaderProps = {
  onClose: () => void;
  label: string;
};

export function DrawerHeader({ onClose, label }: DrawerHeaderProps) {
  return (
    <StyledContainer disableGutters>
      <InfoBtn onClick={() => {}} />
      <Typography variant="h2" color="primary">
        {label}
      </Typography>
      <CloseBtn onClose={onClose} />
    </StyledContainer>
  );
}

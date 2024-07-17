import { Container, Typography, styled } from '@mui/material';
import { CloseBtn, InfoBtn } from '../Btns';

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: 5px;
`;

type DrawerHeaderProps = {
  onClose: () => void;
  label: string;
  onModalOpen: () => void;
};

export function DrawerHeader({
  onClose,
  label,
  onModalOpen,
}: DrawerHeaderProps) {
  return (
    <StyledContainer disableGutters>
      <InfoBtn onClick={onModalOpen} />
      <Typography variant="h2" color="primary">
        {label}
      </Typography>
      <CloseBtn onClose={onClose} />
    </StyledContainer>
  );
}

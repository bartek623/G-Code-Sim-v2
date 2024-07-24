import { Container, styled } from '@mui/material';
import { useState } from 'react';
import { MemoCanvas } from './canvas';
import { Maindrawer } from './MainDrawer';
import { MenuBtn } from '@/UI';

const StyledContainer = styled(Container)`
  position: relative;
  height: 100dvh;
`;

export function MainLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const openMenuHandler = () => {
    setIsDrawerOpen(true);
  };

  const closeMenuHandler = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <StyledContainer disableGutters maxWidth={false}>
        <MenuBtn onClick={openMenuHandler} />
        <MemoCanvas />
      </StyledContainer>
      <Maindrawer isOpen={isDrawerOpen} onClose={closeMenuHandler} />
    </>
  );
}

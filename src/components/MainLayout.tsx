import { Container, styled } from '@mui/material';
import { lazy, memo, Suspense, useState } from 'react';
import { Maindrawer } from './MainDrawer';
import { LoadingScreen, MenuBtn } from '@/UI';

const StyledContainer = styled(Container)`
  position: relative;
  height: 100dvh;
`;

const Canvas = memo(lazy(() => import('./canvas/CanvasThreeD')));

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
        <Suspense fallback={<LoadingScreen />}>
          <Canvas />
        </Suspense>
      </StyledContainer>
      <Maindrawer isOpen={isDrawerOpen} onClose={closeMenuHandler} />
    </>
  );
}

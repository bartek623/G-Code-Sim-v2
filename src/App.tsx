import { Container, CssBaseline, styled } from "@mui/material";
import { CanvasThreeD, Drawer } from "./components";
import { MenuBtn } from "./components/UI";
import { useState } from "react";

const StyledContainer = styled(Container)`
  position: relative;
  height: 100vh;
`;

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openMenuHandler = () => {
    setIsDrawerOpen(true);
  };

  const closeMenuHandler = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <StyledContainer disableGutters maxWidth={false}>
        <MenuBtn onClick={openMenuHandler} />
        <CanvasThreeD />
      </StyledContainer>
      <Drawer isOpen={isDrawerOpen} onClose={closeMenuHandler} />
    </>
  );
}

export default App;

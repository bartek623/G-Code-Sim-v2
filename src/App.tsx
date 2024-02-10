import { Container, CssBaseline, styled } from "@mui/material";
import { CanvasThreeD, Drawer } from "./components";
import { MenuBtn } from "./components/UI";
import { useState } from "react";
import { LineDataType } from "./utils/types";

const StyledContainer = styled(Container)`
  position: relative;
  height: 100vh;
`;

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [lines, setLines] = useState<LineDataType[]>([]);

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
        <CanvasThreeD linesData={lines} />
      </StyledContainer>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeMenuHandler}
        setLinesData={setLines}
      />
    </>
  );
}

export default App;

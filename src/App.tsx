import { useState } from "react";

import { Container, CssBaseline, ThemeProvider, styled } from "@mui/material";

import { CanvasThreeD, MenuBtn } from "./components";
import { LineDataType } from "./utils/types";
import { theme } from "./theme";
import { Maindrawer } from "./components/MainDrawer";

const StyledContainer = styled(Container)`
  position: relative;
  height: 100vh;
`;

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [lines, setLines] = useState<LineDataType[]>([]);
  const [showGeometry, setShowGeometry] = useState(false);

  const openMenuHandler = () => {
    setIsDrawerOpen(true);
  };

  const closeMenuHandler = () => {
    setIsDrawerOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledContainer disableGutters maxWidth={false}>
        <MenuBtn onClick={openMenuHandler} />
        <CanvasThreeD linesData={lines} showGeo={showGeometry} />
      </StyledContainer>
      <Maindrawer
        isOpen={isDrawerOpen}
        onClose={closeMenuHandler}
        setLinesData={setLines}
        setShowGeo={setShowGeometry}
        showGeo={showGeometry}
      />
    </ThemeProvider>
  );
}

export default App;

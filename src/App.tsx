import { Container, CssBaseline, ThemeProvider, styled } from "@mui/material";
import { CanvasThreeD, Drawer } from "./components";
import { MenuBtn } from "./components/UI";
import { useState } from "react";
import { LineDataType } from "./utils/types";
import theme from "./theme/theme";

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
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;

import { Container, CssBaseline, styled } from "@mui/material";
import { CanvasThreeD } from "./components";

const StyledContainer = styled(Container)`
  position: relative;
  height: 100vh;
`;

function App() {
  return (
    <>
      <CssBaseline />
      <StyledContainer disableGutters maxWidth={false}>
        <CanvasThreeD />
      </StyledContainer>
    </>
  );
}

export default App;

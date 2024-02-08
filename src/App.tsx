import { Container, CssBaseline } from "@mui/material";
import { CanvasThreeD } from "./components";

function App() {
  return (
    <>
      <CssBaseline />
      <Container sx={{ height: "100vh" }} disableGutters>
        <CanvasThreeD />
      </Container>
    </>
  );
}

export default App;

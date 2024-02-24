import { useState } from "react";

import { Container, CssBaseline, ThemeProvider, styled } from "@mui/material";

import { CanvasThreeD, Maindrawer } from "./components";
import { LineDataType } from "./utils/types";
import { theme } from "./theme";
import { Notifications, MenuBtn } from "./UI";
import {
  NotificationInfoType,
  SnackbarStateType,
  AUTOHIDE_TIME,
} from "./UI/Notifications";

const StyledContainer = styled(Container)`
  position: relative;
  height: 100vh;
`;

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [lines, setLines] = useState<LineDataType[]>([]);
  const [showGeometry, setShowGeometry] = useState(false);
  const [snackbarState, setSnackbarState] = useState<SnackbarStateType>({
    open: true,
    message: "success",
    type: "success",
  });
  const [snackbarTimer, setSnackbarTimer] = useState(0);

  const openMenuHandler = () => {
    setIsDrawerOpen(true);
  };

  const closeMenuHandler = () => {
    setIsDrawerOpen(false);
  };

  const hideNotificationHandler = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;

    setSnackbarState((prev) => ({ ...prev, open: false }));
  };

  const pushNotificationHandler = (notification: NotificationInfoType) => {
    clearTimeout(snackbarTimer);

    setSnackbarTimer(
      setTimeout(() => {
        hideNotificationHandler();
      }, AUTOHIDE_TIME)
    );

    setSnackbarState({ ...notification, open: true });
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
        pushNotification={pushNotificationHandler}
      />
      <Notifications
        snackbarState={snackbarState}
        onClose={hideNotificationHandler}
      />
    </ThemeProvider>
  );
}

export default App;

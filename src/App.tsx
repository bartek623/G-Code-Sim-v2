import { useRef, useState } from "react";

import { Container, CssBaseline, ThemeProvider, styled } from "@mui/material";

import { CanvasThreeD, Maindrawer } from "./components";
import { LineDataType } from "./utils/types";
import { theme } from "./theme";
import { Notifications, MenuBtn } from "./UI";
import {
  NotificationInfoType,
  SnackbarStateType,
  AUTOHIDE_TIME_RATE,
  MIN_AUTOHIDE_TIME,
} from "./UI/Notifications";
import { Group } from "three";

const StyledContainer = styled(Container)`
  position: relative;
  height: 100vh;
`;

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [lines, setLines] = useState<LineDataType[]>([]);
  const [showGeometry, setShowGeometry] = useState(false);
  const [snackbarState, setSnackbarState] = useState<SnackbarStateType>({
    open: false,
    message: "",
    type: "success",
  });
  const [snackbarTimer, setSnackbarTimer] = useState<
    ReturnType<typeof setTimeout> | undefined
  >(undefined);
  const groupRef = useRef<Group>(null!);

  const openMenuHandler = () => {
    setIsDrawerOpen(true);
  };

  const closeMenuHandler = () => {
    setIsDrawerOpen(false);
  };

  const hideNotificationHandler = (
    _?: React.SyntheticEvent | Event,
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
      }, MIN_AUTOHIDE_TIME + AUTOHIDE_TIME_RATE * notification.message.length)
    );

    setSnackbarState({ ...notification, open: true });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledContainer disableGutters maxWidth={false}>
        <MenuBtn onClick={openMenuHandler} />
        <CanvasThreeD
          linesData={lines}
          showGeo={showGeometry}
          groupRef={groupRef}
        />
      </StyledContainer>
      <Maindrawer
        isOpen={isDrawerOpen}
        onClose={closeMenuHandler}
        setLinesData={setLines}
        setShowGeo={setShowGeometry}
        showGeo={showGeometry}
        pushNotification={pushNotificationHandler}
        meshRef={groupRef}
      />
      <Notifications
        snackbarState={snackbarState}
        onClose={hideNotificationHandler}
      />
    </ThemeProvider>
  );
}

export default App;

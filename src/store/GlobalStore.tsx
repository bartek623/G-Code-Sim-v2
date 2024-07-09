import { ReactNode } from "react";
import { NotificationsStore } from "./NotificationsContext";
import { GeometryStore } from "./GeometryContext";
import { ThemeProvider } from "@mui/material";
import { theme } from "../theme";

type GlobalStoreProps = {
  children: ReactNode | ReactNode[];
};

export function GlobalStore({ children }: GlobalStoreProps) {
  return (
    <ThemeProvider theme={theme}>
      <GeometryStore>
        <NotificationsStore>{children}</NotificationsStore>
      </GeometryStore>
    </ThemeProvider>
  );
}

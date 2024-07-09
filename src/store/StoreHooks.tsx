import { Context, useContext } from "react";
import { GeometryContext } from "./GeometryContext";
import { NotificationsContext } from "./NotificationsContext";

const CTX_ERROR_MSG = "Context hook must be inside provider";

function createContextHook<T>(Context: Context<T>) {
  return () => {
    const context = useContext(Context);

    if (context === undefined) throw new Error(CTX_ERROR_MSG);

    return context;
  };
}

export const useGeometryContext = createContextHook(GeometryContext);
export const useNotificationsContext = createContextHook(NotificationsContext);

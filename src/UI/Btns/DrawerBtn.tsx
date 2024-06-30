import { Button, ButtonProps, Tooltip } from "@mui/material";
import { ReactNode } from "react";

type BtnProps = ButtonProps & {
  tooltip: string;
  onClick?: () => void;
  children: ReactNode;
  download?: string;
};

export function DrawerBtn({
  children,
  tooltip,
  onClick,
  ...restProps
}: BtnProps) {
  return (
    <Tooltip title={tooltip}>
      <Button fullWidth variant="contained" onClick={onClick} {...restProps}>
        {children}
      </Button>
    </Tooltip>
  );
}

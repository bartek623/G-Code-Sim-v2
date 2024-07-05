import { Button, ButtonProps, styled, Tooltip } from "@mui/material";
import { MouseEvent, ReactNode } from "react";

type BtnProps = ButtonProps & {
  tooltip: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  download?: string;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
};

const StyledBtn = styled(Button)(() => ({
  "&.Mui-disabled": { pointerEvents: "auto" },
}));

export function DrawerBtn({
  children,
  tooltip,
  onClick,
  color = "primary",
  disabled,
  ...restProps
}: BtnProps) {
  const adjustedBtnProps = {
    disabled: disabled,
    component: disabled ? "div" : undefined,
    onClick: disabled ? undefined : onClick,
  };

  return (
    <Tooltip title={tooltip}>
      <StyledBtn
        color={color}
        fullWidth
        variant="contained"
        {...restProps}
        {...adjustedBtnProps}
      >
        {children}
      </StyledBtn>
    </Tooltip>
  );
}

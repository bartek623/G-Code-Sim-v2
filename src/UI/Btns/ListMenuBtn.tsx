import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { MouseEvent, ReactNode, useState } from "react";
import { DrawerBtn } from "./DrawerBtn";

export type listItemObject = {
  action: () => void;
  icon?: ReactNode;
  text: string;
};

type ListMenuProps = {
  tooltip: string;
  children: ReactNode;
  listItems: listItemObject[];
};

export function ListMenu({ children, tooltip, listItems }: ListMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const itemClickHandler = (action: () => void) => () => {
    action();
    handleClose();
  };

  return (
    <>
      <DrawerBtn
        tooltip={tooltip}
        onClick={handleClick}
        variant={anchorEl ? "outlined" : "contained"}
      >
        {children}
      </DrawerBtn>

      <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={handleClose}>
        {listItems.map((item) => (
          <MenuItem onClick={itemClickHandler(item.action)}>
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
            <ListItemText>{item.text}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuProps,
  styled,
} from "@mui/material";
import { MouseEvent, ReactNode, useState } from "react";
import { DrawerBtn } from "./DrawerBtn";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    variant="menu"
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
    transformOrigin={{ vertical: "bottom", horizontal: "center" }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": { marginTop: theme.spacing(-0.5) },
}));

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

      <StyledMenu open={!!anchorEl} anchorEl={anchorEl} onClose={handleClose}>
        {listItems.map((item, i, items) => (
          <ListMenuItem
            item={item}
            onClickHandler={itemClickHandler}
            isLast={i + 1 >= items.length}
            key={item.text + Math.random()}
          />
        ))}
      </StyledMenu>
    </>
  );
}

type ListMenuItemProps = {
  item: listItemObject;
  onClickHandler: (action: () => void) => () => void;
  isLast: boolean;
};

function ListMenuItem({ item, onClickHandler, isLast }: ListMenuItemProps) {
  return (
    <>
      <MenuItem onClick={onClickHandler(item.action)}>
        {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
        <ListItemText>{item.text}</ListItemText>
      </MenuItem>
      {!isLast && <Divider />}
    </>
  );
}

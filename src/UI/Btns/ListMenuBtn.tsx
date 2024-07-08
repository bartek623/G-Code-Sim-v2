import {
  Grow,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuItemProps,
  MenuList,
  Paper,
  Popper,
  styled,
} from "@mui/material";
import { MouseEvent, ReactNode, useState } from "react";
import { DrawerBtn } from "./DrawerBtn";

const StyledListContainer = styled(Paper)`
  margin: ${({ theme }) => theme.spacing(0.5)};
`;

type listItemObject = {
  action: () => void;
  icon?: ReactNode;
  text?: string;
};

type ListMenuProps = {
  tooltip: string;
  children: ReactNode;
  listItems: listItemObject[];
};

export function ListMenu({ children, tooltip, listItems }: ListMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [autoCloseTimer, setAutoCloseTimer] = useState<
    ReturnType<typeof setTimeout> | undefined
  >(undefined);

  const clearHoverTimer = () => clearTimeout(autoCloseTimer);

  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    clearHoverTimer();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    clearHoverTimer();
  };

  const setHoverTimer = () => setAutoCloseTimer(setTimeout(handleClose, 100));

  const itemClickHandler = (action: () => void) => () => {
    action();
    handleClose();
  };

  return (
    <>
      <DrawerBtn
        tooltip={tooltip}
        variant={anchorEl ? "outlined" : "contained"}
        onMouseOver={handleOpen}
        onMouseLeave={setHoverTimer}
      >
        {children}
      </DrawerBtn>

      <Popper
        open={!!anchorEl}
        anchorEl={anchorEl}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: "center bottom",
            }}
          >
            <StyledListContainer>
              <MenuList
                onMouseOver={clearHoverTimer}
                onMouseLeave={setHoverTimer}
              >
                {listItems.map((item, i, items) => (
                  <ListMenuItem
                    item={item}
                    onClick={itemClickHandler(item.action)}
                    isLast={i + 1 >= items.length}
                    key={item.text}
                  />
                ))}
              </MenuList>
            </StyledListContainer>
          </Grow>
        )}
      </Popper>
    </>
  );
}

type ListMenuItemProps = {
  item: listItemObject;
  isLast: boolean;
} & MenuItemProps;

function ListMenuItem({ item, isLast, ...restProps }: ListMenuItemProps) {
  return (
    <MenuItem divider={!isLast} {...restProps}>
      {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
      <ListItemText>{item.text}</ListItemText>
    </MenuItem>
  );
}

import { MouseEvent, ReactNode, useState } from 'react';
import { listItemObject, ListMenuItem, ListMenu } from '../ListMenu';
import { DrawerBtn } from './DrawerBtn';

type ListMenuBtnProps = {
  tooltip: string;
  children: ReactNode;
  listItems: listItemObject[];
};

export function ListMenuBtn({
  children,
  tooltip,
  listItems,
}: ListMenuBtnProps) {
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
        variant={anchorEl ? 'outlined' : 'contained'}
        onMouseOver={handleOpen}
        onMouseLeave={setHoverTimer}>
        {children}
      </DrawerBtn>

      <ListMenu
        anchorEl={anchorEl}
        onHover={clearHoverTimer}
        onUnhover={setHoverTimer}>
        {listItems.map((item, i, items) => (
          <ListMenuItem
            item={item}
            onClick={itemClickHandler(item.action)}
            isLast={i + 1 >= items.length}
            key={item.text}
          />
        ))}
      </ListMenu>
    </>
  );
}

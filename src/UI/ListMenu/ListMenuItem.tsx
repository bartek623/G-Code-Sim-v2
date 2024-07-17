import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuItemProps,
} from '@mui/material';
import { ReactNode } from 'react';

export type listItemObject = {
  action: () => void;
  icon?: ReactNode;
  text?: string;
};

type ListMenuItemProps = {
  item: listItemObject;
  isLast: boolean;
} & MenuItemProps;

export function ListMenuItem({
  item,
  isLast,
  ...restProps
}: ListMenuItemProps) {
  return (
    <MenuItem divider={!isLast} {...restProps}>
      {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
      <ListItemText>{item.text}</ListItemText>
    </MenuItem>
  );
}

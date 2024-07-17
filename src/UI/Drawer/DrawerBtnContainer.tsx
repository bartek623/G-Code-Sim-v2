import { Stack, StackProps } from '@mui/material';
import { ReactNode } from 'react';

type DrawerBtnContainerProps = StackProps & {
  children: ReactNode | ReactNode[];
};

export function DrawerBtnContainer({
  children,
  ...restProps
}: DrawerBtnContainerProps) {
  return (
    <Stack direction="row" spacing={0.4} marginTop="auto" {...restProps}>
      {children}
    </Stack>
  );
}

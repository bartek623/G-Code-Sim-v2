import { DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { ReactNode } from 'react';

type ModalTextProps = {
  title: string;
  children: ReactNode;
  titleColor?: string;
};

export function ModalText({
  title,
  children,
  titleColor = 'primary',
}: ModalTextProps) {
  return (
    <>
      <DialogTitle color={titleColor}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText component={'div'}>{children}</DialogContentText>
      </DialogContent>
    </>
  );
}

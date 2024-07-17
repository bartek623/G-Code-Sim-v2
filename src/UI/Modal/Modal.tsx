import { Breakpoint, Dialog, styled } from '@mui/material';
import { ReactNode } from 'react';
import { CloseBtn } from '../Btns';

const StyledCloseBtn = styled(CloseBtn)`
  position: absolute;
  right: 0;
  top: 0;
`;

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: Breakpoint;
};

export function Modal({ isOpen, onClose, children, size = 'sm' }: ModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth={size}
      scroll="body">
      <StyledCloseBtn onClose={onClose} />
      {children}
    </Dialog>
  );
}

import { ReactNode } from "react";
import { Dialog, styled } from "@mui/material";
import { CloseBtn } from "..";

const StyledCloseBtn = styled(CloseBtn)`
  position: absolute;
  right: 0;
  top: 0;
`;

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      scroll="body"
    >
      <StyledCloseBtn onClose={onClose} />
      {children}
    </Dialog>
  );
}

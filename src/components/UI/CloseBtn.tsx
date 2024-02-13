import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";

type CloseBtnProps = {
  onClose: () => void;
};

export function CloseBtn({ onClose }: CloseBtnProps) {
  return (
    <IconButton onClick={onClose}>
      <Close />
    </IconButton>
  );
}

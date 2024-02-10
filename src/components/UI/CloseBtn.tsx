import { Close } from "@mui/icons-material";
import { IconButton, styled } from "@mui/material";

const StyledIconBtn = styled(IconButton)`
  margin-left: auto;
`;

type CloseBtnProps = {
  onClose: () => void;
};

export function CloseBtn({ onClose }: CloseBtnProps) {
  return (
    <StyledIconBtn onClick={onClose}>
      <Close />
    </StyledIconBtn>
  );
}

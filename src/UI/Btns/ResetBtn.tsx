import { Button, Tooltip, styled } from '@mui/material';

const StyledBtn = styled(Button)`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 999;
`;

type ResetBtnProps = {
  onClick: () => void;
};

export function ResetBtn({ onClick }: ResetBtnProps) {
  return (
    <Tooltip title="Camera reset">
      <StyledBtn onClick={onClick}>reset</StyledBtn>
    </Tooltip>
  );
}

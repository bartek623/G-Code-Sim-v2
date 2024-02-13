import { InfoOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";

type InfoBtnProps = {
  onClick: () => void;
};

export function InfoBtn({ onClick }: InfoBtnProps) {
  return (
    <IconButton onClick={onClick}>
      <InfoOutlined />
    </IconButton>
  );
}

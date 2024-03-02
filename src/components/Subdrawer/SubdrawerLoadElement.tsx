import { Container, Paper, Stack, Typography, styled } from "@mui/material";
import { savedType } from "./types";
import { DeleteBtn, LoadBtn } from "../../UI";

const StyledContainer = styled(Paper)`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(1)}
    ${({ theme }) => theme.spacing(1.5)};
`;

type SubdrawerLoadElementProps = {
  data: savedType;
  onDelete: (title: string) => void;
  onLoad: (code: string, title: string) => void;
};

export function SubdrawerLoadElement({
  data,
  onDelete,
  onLoad,
}: SubdrawerLoadElementProps) {
  const title =
    data.title.length > 16 ? data.title.slice(0, 13) + "..." : data.title;

  const date = new Date(data.date).toLocaleDateString();

  const deleteHandler = () => {
    onDelete(data.title);
  };

  const loadHandler = () => {
    onLoad(data.code, title);
  };

  return (
    <StyledContainer variant="outlined">
      <Container disableGutters>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle2">{date}</Typography>
      </Container>

      <Stack direction="row" sx={{ margin: "auto" }}>
        <LoadBtn onClick={loadHandler} />
        <DeleteBtn onClick={deleteHandler} />
      </Stack>
    </StyledContainer>
  );
}

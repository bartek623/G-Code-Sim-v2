import {
  Container,
  Paper,
  Stack,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { savedType } from "../types";
import { DeleteBtn, LoadBtn } from "../../../UI";

const StyledContainer = styled(Paper)`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(1)}
    ${({ theme }) => theme.spacing(1.5)};
`;

type LoadElementProps = {
  data: savedType;
  onDelete: (title: string) => void;
  onLoad: (code: string, title: string) => void;
  searchText: string;
};

export function LoadElement({
  data,
  onDelete,
  onLoad,
  searchText,
}: LoadElementProps) {
  const isTitleLong = data.title.length > 16;
  const title = isTitleLong ? data.title.slice(0, 13) + "..." : data.title;

  const searchStartIndex = data.title.toLowerCase().indexOf(searchText);
  const searchEndIndex = searchStartIndex + searchText.length;

  const titleFirstPart = title.slice(0, searchStartIndex);
  const titleHighlightedPart = title.slice(searchStartIndex, searchEndIndex);
  const titleLastPart = title.slice(searchEndIndex);

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
        <Tooltip title={isTitleLong ? data.title : ""} followCursor>
          <Typography variant="h6">
            {titleFirstPart}
            <b>{titleHighlightedPart}</b>
            {titleLastPart}
          </Typography>
        </Tooltip>
        <Typography variant="subtitle2">{date}</Typography>
      </Container>

      <Stack direction="row" sx={{ margin: "auto" }}>
        <LoadBtn onClick={loadHandler} />
        <DeleteBtn onClick={deleteHandler} />
      </Stack>
    </StyledContainer>
  );
}

import { Stack, styled } from "@mui/material";
import { ReactNode } from "react";

type StyledContainerProps = {
  gap: number;
};

const StyledContainer = styled(Stack)<StyledContainerProps>`
  margin: ${({ theme }) => theme.spacing(1.5)};
  gap: ${({ theme, gap }) => theme.spacing(gap)};
  height: 100%;
  overflow-y: auto;
`;

type SubdrawerContainerProps = {
  children: ReactNode;
  gap?: number;
};

export function SubdrawerContainer({
  children,
  gap = 1.5,
}: SubdrawerContainerProps) {
  return <StyledContainer gap={gap}>{children}</StyledContainer>;
}

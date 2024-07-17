import { Stack, styled } from '@mui/material';
import { FormEvent, ReactNode } from 'react';

type StyledContainerProps = {
  gap: number;
  component: 'form' | 'div';
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
  component?: 'form' | 'div';
  onSubmit?: (e: FormEvent) => void;
};

export function SubdrawerContainer({
  children,
  gap = 1.5,
  component = 'div',
  onSubmit = () => {},
}: SubdrawerContainerProps) {
  return (
    <StyledContainer component={component} gap={gap} onSubmit={onSubmit}>
      {children}
    </StyledContainer>
  );
}

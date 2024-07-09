import { Grow, MenuList, Paper, Popper, styled } from "@mui/material";
import { ReactNode } from "react";

const StyledListContainer = styled(Paper)`
  margin: ${({ theme }) => theme.spacing(0.5)};
`;

type ListMenuProps = {
  children: ReactNode | ReactNode[];
  onHover: () => void;
  onUnhover: () => void;
  anchorEl: HTMLElement | null;
};

export function ListMenu({
  children,
  onHover,
  onUnhover,
  anchorEl,
}: ListMenuProps) {
  return (
    <Popper
      open={!!anchorEl}
      anchorEl={anchorEl}
      role={undefined}
      transition
      disablePortal
    >
      {({ TransitionProps }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin: "center bottom",
          }}
        >
          <StyledListContainer>
            <MenuList onMouseOver={onHover} onMouseLeave={onUnhover}>
              {children}
            </MenuList>
          </StyledListContainer>
        </Grow>
      )}
    </Popper>
  );
}

import { useGeometryContext } from '@/store';
import { DrawerInputContainer } from '@/UI';
import { styled, TextField } from '@mui/material';
import { ChangeEvent } from 'react';

const StyledTextField = styled(TextField)`
  max
`;

export function MaterialInputs() {
  const { setRadius, setLength } = useGeometryContext();

  const changeRadiusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setRadius(+e.target.value || 0);
  };
  const changeLengthHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLength(+e.target.value);
  };

  return (
    <DrawerInputContainer padding={1} paddingX={3}>
      <StyledTextField
        fullWidth
        label="Radius"
        onChange={changeRadiusHandler}
        type="number"
        InputProps={{ inputProps: { min: 0 } }}
      />
      <StyledTextField
        fullWidth
        label="Length"
        onChange={changeLengthHandler}
        type="number"
        InputProps={{ inputProps: { min: 0 } }}
      />
    </DrawerInputContainer>
  );
}

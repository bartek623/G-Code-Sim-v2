import { Button, styled, TextFieldProps } from '@mui/material';
import { RefObject, useState } from 'react';
import { DrawerInputContainer } from '@/UI';

const StyledBtn = styled(Button)`
  width: 80%;
`;

type OperationsContainerProps = {
  textFieldRef: RefObject<TextFieldProps>;
};

export function OperationsContainer({
  textFieldRef,
}: OperationsContainerProps) {
  const [savedOperations, setSavedOperations] = useState<string[]>([]);

  const onSavedOperationClick = (i: number) => () => {
    if (!textFieldRef.current) return;
    textFieldRef.current.value = savedOperations[i];
  };

  const onOperationSave = () => {
    const program = textFieldRef.current?.value as string;
    if (!program) return;

    setSavedOperations((prev) => [...prev, program]);
  };

  return (
    <DrawerInputContainer
      direction={'column'}
      paddingLeft={2}
      alignItems={'center'}
      marginBottom={1}
      maxHeight={'20%'}
      overflow={'auto'}>
      {savedOperations.map((_, i) => (
        <StyledBtn variant="outlined" onClick={onSavedOperationClick(i)}>
          Operation {i + 1}
        </StyledBtn>
      ))}
      <StyledBtn variant="outlined" onClick={onOperationSave}>
        Add as Operation {savedOperations.length + 1}
      </StyledBtn>
    </DrawerInputContainer>
  );
}

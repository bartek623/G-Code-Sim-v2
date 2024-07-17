import { Stack, TextFieldProps } from '@mui/material';
import { useNotificationsContext } from '@store';
import { NOTIFICATION_TYPES } from '@UI';
import { ChangeEvent, RefObject, useEffect, useState } from 'react';

import { SubdrawerContainer } from '../SubdrawerContentContainer';
import { savedType } from '../types';
import { getSavedStorage, setSavedStorage } from '../utils';
import { LoadBtns } from './LoadBtns';
import { LoadElement } from './LoadElement';
import { LoadSearch } from './LoadSearch';

type LoadProps = {
  textFieldRef: RefObject<TextFieldProps>;
  onClose: () => void;
  onRun: () => void;
};

export function Load({ textFieldRef, onClose, onRun }: LoadProps) {
  const [savedPrograms, setSavedPrograms] = useState<savedType[]>([]);
  const [searchText, setSearchText] = useState('');
  const { pushNotification } = useNotificationsContext();

  useEffect(() => {
    setSavedPrograms(getSavedStorage());
  }, []);

  const updatePrograms = (programs: savedType[]) => {
    setSavedStorage(programs);
    setSavedPrograms(programs);
  };

  const loadHandler = (code: string, title: string) => {
    if (!textFieldRef.current) return;

    textFieldRef.current.value = code;
    pushNotification({
      message: `Program "${title}" loaded successfully`,
      type: NOTIFICATION_TYPES.success,
    });
    onClose();
    onRun();
  };

  const deleteHandler = (title: string) => {
    const newSavedPrograms = savedPrograms.filter((el) => el.title !== title);

    updatePrograms(newSavedPrograms);
    pushNotification({
      message: `Program "${title}" removed successfully`,
      type: NOTIFICATION_TYPES.success,
    });
  };

  const searchHandler = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setSearchText(e.currentTarget.value.toLowerCase());
  };

  const LoadElements = savedPrograms
    .filter((el) => el.title.toLowerCase().includes(searchText))
    .map((el) => (
      <LoadElement
        data={el}
        key={el.title}
        onDelete={deleteHandler}
        onLoad={loadHandler}
        searchText={searchText}
      />
    ));

  return (
    <SubdrawerContainer>
      <LoadSearch onChange={searchHandler} />
      <Stack
        borderTop={1}
        borderBottom={1}
        borderColor="grey.300"
        spacing={1.5}
        paddingTop={1}
        paddingBottom={1}
        overflow="auto"
        height="100%">
        {LoadElements}
      </Stack>
      <LoadBtns
        updatePrograms={updatePrograms}
        currentPrograms={savedPrograms}
      />
    </SubdrawerContainer>
  );
}

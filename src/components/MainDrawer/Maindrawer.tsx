import { TextFieldProps } from '@mui/material';
import { useGeometryContext, useNotificationsContext } from '@store';
import { NOTIFICATION_TYPES, Drawer } from '@UI';
import { showError } from '@utils';
import { useRef, useState } from 'react';

import { Subdrawer } from '../Subdrawer';
import {
  MAINDRAWER_LABEL,
  SUBDRAWER_DEFAULT,
  SUBDRAWER_MODES,
  subdrawerModesType,
  subdrawerState,
} from './constants';
import { DrawerTextField } from './DrawerTextField';
import { InfoModal } from './InfoModal';
import { MainDrawerBtns } from './MainDrawerBtns';
import {
  addLinesNumbering,
  convertProgramToLinesData,
  removeLinesNumbering,
} from './utils';
import { MaterialInputs } from './MaterialInputs';

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Maindrawer({ isOpen, onClose }: DrawerProps) {
  const { setShowGeometry, setLines } = useGeometryContext();
  const { pushNotification } = useNotificationsContext();
  const [openModal, setOpenModal] = useState(false);
  const [subdrawer, setSubdrawer] = useState<subdrawerState>(SUBDRAWER_DEFAULT);
  const textFieldRef = useRef<TextFieldProps>(null!);

  const runProgramHandler = () => {
    try {
      const program = textFieldRef.current.value as string;

      if (!program.trim().length) return setLines([]);

      const showWarning = (message: string) => {
        pushNotification({ message, type: NOTIFICATION_TYPES.warning });
      };

      const linesData = convertProgramToLinesData(program.trim(), showWarning);

      if (!linesData) return;

      setLines(linesData);
    } catch (err) {
      showError(err, pushNotification);
      setLines([]);
    }
  };

  const addNumberingHandler = () => {
    const program = textFieldRef.current.value as string;

    if (!program.trim().length) return;

    textFieldRef.current.value = addLinesNumbering(program);

    pushNotification({
      message: 'Added lines numbering',
      type: NOTIFICATION_TYPES.info,
    });
  };

  const removeNumberingHandler = () => {
    const program = textFieldRef.current.value as string;

    if (!program.trim().length) return;

    textFieldRef.current.value = removeLinesNumbering(program);

    pushNotification({
      message: 'Removed lines numbering',
      type: NOTIFICATION_TYPES.info,
    });
  };

  const toggleGeoHandler = () => {
    setShowGeometry((prev) => {
      const msg = `${prev ? 'Hiding' : 'Showing'} model`;
      pushNotification({ message: msg, type: NOTIFICATION_TYPES.info });

      return !prev;
    });
  };

  const openSubHandler = (mode: subdrawerModesType) => {
    setSubdrawer({ open: true, mode: SUBDRAWER_MODES[mode] });
  };

  const closeSubHandler = () => {
    setSubdrawer((prev) => ({ ...prev, open: false }));
  };

  const openModalHandler = () => {
    setOpenModal(true);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      label={MAINDRAWER_LABEL}
      variant="persistent"
      onModalOpen={openModalHandler}>
      <MaterialInputs />
      <DrawerTextField textFieldRef={textFieldRef} />
      <MainDrawerBtns
        onAddNumbering={addNumberingHandler}
        onRemoveNumbering={removeNumberingHandler}
        onRun={runProgramHandler}
        onShowGeo={toggleGeoHandler}
        onSubOpen={openSubHandler}
      />
      <Subdrawer
        state={subdrawer}
        onClose={closeSubHandler}
        textFieldRef={textFieldRef}
        onRun={runProgramHandler}
      />
      <InfoModal isOpen={openModal} onClose={closeModalHandler} />
    </Drawer>
  );
}

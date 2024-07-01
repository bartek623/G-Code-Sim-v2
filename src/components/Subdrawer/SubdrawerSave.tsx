import { FormEvent, RefObject, useEffect, useRef } from "react";
import { TextField, TextFieldProps, Typography, styled } from "@mui/material";

import { SubdrawerContainer } from "./SubdrawerContentContainer";
import { savedType } from "./types";
import { getSavedStorage, setSavedStorage } from "./utils";
import {
  NOTIFICATION_TYPES,
  NotificationInfoType,
  DrawerBtnContainer,
  DrawerBtn,
} from "../../UI";
import { showError } from "../../utils/utils";

const StyledTypography = styled(Typography)`
  background-color: #f2f2f2;
  color: #7a7a7a;
  border-radius: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(1)};
  white-space: pre-wrap;
  overflow-y: auto;
`;

type SaveProps = {
  textFieldRef: RefObject<TextFieldProps>;
  onClose: () => void;
  pushNotification: (notification: NotificationInfoType) => void;
};

export function Save({ textFieldRef, onClose, pushNotification }: SaveProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const program = textFieldRef.current?.value as string;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const saveHandler = (e: FormEvent) => {
    e.preventDefault();

    try {
      const data: savedType = {
        title: inputRef.current?.value as string,
        code: program,
        date: Date.now(),
      };

      if (program.length === 0) throw new Error("Your code is empty!");

      if (data.title.length === 0) throw new Error("Set program title!");

      const currentPrograms = getSavedStorage();

      if (currentPrograms.some((el) => el.title === data.title))
        throw new Error(
          "The title you entered is already taken! Try another one."
        );

      currentPrograms.unshift(data);

      setSavedStorage(currentPrograms);
      pushNotification({
        message: `Program "${data.title}" saved successfully`,
        type: NOTIFICATION_TYPES.success,
      });
      onClose();
    } catch (err) {
      showError(err, pushNotification);
    }
  };

  return (
    <SubdrawerContainer component="form" onSubmit={saveHandler}>
      <TextField
        label="title"
        variant="standard"
        inputRef={inputRef}
        fullWidth
        autoFocus
      />
      <StyledTypography paragraph>{program}</StyledTypography>

      <DrawerBtnContainer>
        <DrawerBtn tooltip="Save to browser local storage" type="submit">
          Save
        </DrawerBtn>
      </DrawerBtnContainer>
    </SubdrawerContainer>
  );
}

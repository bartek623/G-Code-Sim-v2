import { ChangeEvent, RefObject, useEffect, useState } from "react";
import { Stack, TextFieldProps } from "@mui/material";
import { Download, UploadFile } from "@mui/icons-material";

import { SubdrawerContainer } from "./SubdrawerContentContainer";
import { savedType } from "./types";
import { SubdrawerLoadElement } from "./SubdrawerLoadElement";
import { getSavedStorage, setSavedStorage } from "./utils";
import {
  NOTIFICATION_TYPES,
  NotificationInfoType,
  DrawerBtnContainer,
  DrawerBtn,
} from "../../UI";

type SubdrawerLoadProps = {
  textFieldRef: RefObject<TextFieldProps>;
  onClose: () => void;
  pushNotification: (notification: NotificationInfoType) => void;
  onRun: () => void;
};

export function SubdrawerLoad({
  textFieldRef,
  onClose,
  pushNotification,
  onRun,
}: SubdrawerLoadProps) {
  const [savedPrograms, setSavedPrograms] = useState<savedType[]>([]);

  useEffect(() => {
    setSavedPrograms(getSavedStorage());
  }, []);

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

    setSavedStorage(newSavedPrograms);
    setSavedPrograms(newSavedPrograms);
    pushNotification({
      message: `Program "${title}" removed successfully`,
      type: NOTIFICATION_TYPES.success,
    });
  };

  const LoadElements = savedPrograms.map((el) => (
    <SubdrawerLoadElement
      data={el}
      key={el.title}
      onDelete={deleteHandler}
      onLoad={loadHandler}
    />
  ));

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target?.result) return;

      const programs = JSON.parse(event.target.result as string);

      console.log([...programs, ...savedPrograms]);
    };
    reader.readAsText(e.target.files[0]);
    // TODO concat or replace uploaded data with current
  };

  return (
    <SubdrawerContainer>
      <Stack spacing={1.5} overflow="auto">
        {LoadElements}
      </Stack>
      <DrawerBtnContainer>
        <DrawerBtn
          tooltip="Upload saved programs from JSON file"
          component="label"
        >
          <UploadFile />
          <input type="file" accept=".json" hidden onChange={uploadHandler} />
        </DrawerBtn>

        <DrawerBtn
          tooltip="Download saved programs to JSON file"
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(savedPrograms)
          )}`}
          download="GCodePrograms.json"
        >
          <Download />
        </DrawerBtn>
      </DrawerBtnContainer>
    </SubdrawerContainer>
  );
}

import { RefObject, useEffect, useState } from "react";
import { SubdrawerContainer } from "./SubdrawerContentContainer";
import { savedType } from "./types";
import { SubdrawerLoadElement } from "./SubdrawerLoadElement";
import { TextFieldProps } from "@mui/material";
import { getSavedStorage, setSavedStorage } from "./utils";
import { NOTIFICATION_TYPES, NotificationInfoType } from "../../UI";

type SubdrawerLoadProps = {
  textFieldRef: RefObject<TextFieldProps>;
  onClose: () => void;
  pushNotification: (notification: NotificationInfoType) => void;
};

export function SubdrawerLoad({
  textFieldRef,
  onClose,
  pushNotification,
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

  return <SubdrawerContainer>{LoadElements}</SubdrawerContainer>;
}

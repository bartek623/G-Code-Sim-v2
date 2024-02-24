import { RefObject, useEffect, useState } from "react";
import { SubdrawerContainer } from "./SubdrawerContentContainer";
import { savedType } from "./types";
import { SubdrawerLoadElement } from "./SubdrawerLoadElement";
import { TextFieldProps } from "@mui/material";
import { getSavedStorage, setSavedStorage } from "./utils";

type SubdrawerLoadProps = {
  textFieldRef: RefObject<TextFieldProps>;
  onClose: () => void;
};

export function SubdrawerLoad({ textFieldRef, onClose }: SubdrawerLoadProps) {
  const [savedPrograms, setSavedPrograms] = useState<savedType[]>([]);

  useEffect(() => {
    setSavedPrograms(getSavedStorage());
  }, []);

  const loadHandler = (code: string) => {
    if (!textFieldRef.current) return;

    textFieldRef.current.value = code;
    onClose();
  };

  const deleteHandler = (title: string) => {
    const newSavedPrograms = savedPrograms.filter((el) => el.title !== title);

    setSavedStorage(newSavedPrograms);
    setSavedPrograms(newSavedPrograms);
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

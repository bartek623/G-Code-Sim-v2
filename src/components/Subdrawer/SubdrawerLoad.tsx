import { RefObject, useEffect, useState } from "react";
import { SubdrawerContainer } from "./SubdrawerContentContainer";
import { savedType } from "./types";
import { SubdrawerLoadElement } from "./SubdrawerLoadElement";
import { TextFieldProps } from "@mui/material";

type SubdrawerLoadProps = {
  textFieldRef: RefObject<TextFieldProps>;
  onClose: () => void;
};

export function SubdrawerLoad({ textFieldRef, onClose }: SubdrawerLoadProps) {
  const [savedPrograms, setSavedPrograms] = useState<savedType[]>([]);

  useEffect(() => {
    const savedString = localStorage.getItem("saved-programs");
    const saved: savedType[] = savedString ? JSON.parse(savedString) : [];

    setSavedPrograms(saved);
  }, []);

  const loadHandler = (code: string) => {
    if (!textFieldRef.current) return;

    textFieldRef.current.value = code;
    onClose();
  };

  const deleteHandler = (title: string) => {
    const newSavedPrograms = savedPrograms.filter((el) => el.title !== title);

    localStorage.setItem("saved-programs", JSON.stringify(newSavedPrograms));
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

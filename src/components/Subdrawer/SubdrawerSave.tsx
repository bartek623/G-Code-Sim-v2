import {
  Button,
  TextField,
  TextFieldProps,
  Typography,
  styled,
} from "@mui/material";
import { RefObject, useRef } from "react";
import { SubdrawerContainer } from "./SubdrawerContentContainer";
import { savedType } from "./types";
import { getSavedStorage, setSavedStorage } from "./utils";
import { NOTIFICATION_TYPES, NotificationInfoType } from "../../UI";
import { showError } from "../../utils/utils";

const StyledInput = styled(TextField)`
  width: 100%;
`;

const StyledTypography = styled(Typography)`
  background-color: #f2f2f2;
  color: #7a7a7a;
  border-radius: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(1)};
  white-space: pre-wrap;
  overflow-y: auto;
`;

const StyledButton = styled(Button)`
  margin-top: auto;
`;

type SubdrawerSaveProps = {
  textFieldRef: RefObject<TextFieldProps>;
  onClose: () => void;
  pushNotification: (notification: NotificationInfoType) => void;
};

export function SubdrawerSave({
  textFieldRef,
  onClose,
  pushNotification,
}: SubdrawerSaveProps) {
  const inputRef = useRef<TextFieldProps>(null);
  const program = textFieldRef.current?.value as string;

  const saveHandler = () => {
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

      currentPrograms.push(data);

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
    <SubdrawerContainer gap={3}>
      <StyledInput label="title" variant="standard" inputRef={inputRef} />
      <StyledTypography paragraph>{program}</StyledTypography>
      <StyledButton variant="contained" onClick={saveHandler}>
        Save
      </StyledButton>
    </SubdrawerContainer>
  );
}

import { Modal, ModalText } from '@UI';

type SaveInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SaveInfoModal({ isOpen, onClose }: SaveInfoModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalText title="Save Functionality Overview">
        The Save functionality within this application allows to efficiently
        store model configurations for later retrieval. When saving a model,
        users are prompted to provide a title. This title serves as a quick
        identifier for each saved configuration. Behind the scenes, the saved
        data includes the provided title, the code of the prepared model, and
        the timestamp indicating when the save operation occurred. <br />
        <br />
        The saved models are securely stored in the local storage of the user's
        browser. This ensures accessibility only on the specific device and
        browser where the Save operation took place, emphasizing a
        privacy-focused approach.
        <br />
        <br />
        To save a model, initiate the Save operation after configuring the model
        to your satisfaction. Provide a title, confirming your choice to
        securely store the model configuration data, including the title, code,
        and timestamp.
        <br />
        <br />
        When you wish to revisit a saved model, utilize the Load feature within
        the application. Here, a list of locally saved models will be displayed,
        each identified by its title and accompanied by the timestamp.
        <br />
        <br />
        It's essential to note that saved models remain exclusive to the device
        and browser where the Save operation occurred and cannot be accessed or
        shared across different devices.
      </ModalText>
    </Modal>
  );
}

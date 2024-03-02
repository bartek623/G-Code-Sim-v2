import { Modal, ModalText } from "../../UI/Modal";

type LoadInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function LoadInfoModal({ isOpen, onClose }: LoadInfoModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalText title="Load Functionality Overview">
        The Load functionality in application complements the Save feature,
        allowing users to effortlessly retrieve previously saved model
        configurations. When accessing the Load feature, users are presented
        with a list of locally saved models, each identified by its title and
        accompanied by the timestamp of when the model was saved.
        <br />
        <br />
        To load a model, users simply select the desired configuration from the
        list. Behind the scenes, the application retrieves the stored data,
        including the model's code, and reinstates the configuration to its
        saved state.
        <br />
        <br />
        It's important to note that the Load feature is specific to the device
        and browser where the Save operation occurred. Saved models cannot be
        accessed or loaded across different devices, ensuring the privacy and
        security of user data.
        <br />
        <br />
        The user-friendly interface of the Load functionality facilitates a
        seamless experience, allowing users to efficiently manage and revisit
        their model configurations within the application. This cohesive Save
        and Load system enhances the overall usability and flexibility of
        application, empowering users to navigate their work with ease.
      </ModalText>
    </Modal>
  );
}

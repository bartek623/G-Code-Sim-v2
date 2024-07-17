import { List, ListItem as MuiListItem } from "@mui/material";
import { Modal, ModalText } from "@UI";
import { ReactNode } from "react";

const ListItem = ({ children }: { children: ReactNode }) => (
  <MuiListItem sx={{ display: "list-item" }}>{children}</MuiListItem>
);

type InfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function InfoModal({ isOpen, onClose }: InfoModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalText title="What is G-code?">
        G-code, an abbreviation for "Geometric Code," stands as the
        quintessential programming language in the domains of computer-aided
        manufacturing (CAM) and computer numerical control (CNC) systems. This
        standardized language forms the backbone of instructions that
        meticulously govern the intricate movements and operations of machine
        tools, including milling machines and 3D printers.
      </ModalText>

      <ModalText title="How to read G-code commands?">
        G-code command structure: <b>G</b>[ ] <b>X</b>[ ] <b>Z</b>[ ] <b>R</b>[
        ] <b>I</b>[ ] <b>K</b>[ ]
        <List sx={{ listStyleType: "disc", listStylePosition: "inside" }}>
          <ListItem>
            <b>G</b> specifies the type of operation or motion a machinge tool
            should undertake. It is essentially a preparatory command that
            prepares the machine for a particular mode or sets a specific
            behavior.
          </ListItem>
          <ListItem>
            <b>X</b> and <b>Z</b> coordinates denote the horizontal and vertical
            positions of the tool on the workpiece, specifying the precise
            location for machining operations.
          </ListItem>
          <ListItem>
            <b>R</b> argument defines the radius of an arc when executing
            specific G-code commands.
          </ListItem>
          <ListItem>
            <b>I</b> and <b>K</b> coordinates play a crucial role in circular
            interpolation, delineating the center of arcs or circles
          </ListItem>
        </List>
      </ModalText>

      <ModalText title="G-code commands">
        <ModalText title="G00 - rapid positioning" titleColor="inherit">
          The <b>G00</b> command moves the machine at maximum speed from a
          current position to a specified point with X and Z elements. This
          results in a straight line movement. For this simulator G00 do not
          draw line on a plane.
        </ModalText>
        <ModalText title="G01 - linear interpolation" titleColor="inherit">
          The <b>G01</b> command instructs the machine to move in a straight
          line from a current position to specified point with X and Z
          arguments.
        </ModalText>
        <ModalText
          title="G02 - circular interpolation clockwise"
          titleColor="inherit"
        >
          The <b>G02</b> command tells the machine to move clockwise in a
          circular pattern. It starts with current position and moves to a
          specified point with X and Z arguments. Also there is need to define
          its center point. It can be achieved with I and K arguments or R. I
          and K are respectively X and Z center offset relative to the starting
          point, where R is a radius of the circle. If R is negative machine
          moves by longest possible arc.
        </ModalText>
        <ModalText
          title="G03 - circular interpolation counterclockwise"
          titleColor="inherit"
        >
          The <b>G03</b> command is similar to G02 but directs the tool to
          execute a counterclockwise circular interpolation.
        </ModalText>
      </ModalText>
    </Modal>
  );
}

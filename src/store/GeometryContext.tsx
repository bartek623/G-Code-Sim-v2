import { LineDataType } from '@utils';
import {
  createContext,
  createRef,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useState,
} from 'react';
import { Group } from 'three';

const geometryRef = createRef<Group>();

export type GeometryContextType = {
  showGeometry: boolean;
  setShowGeometry: Dispatch<SetStateAction<boolean>>;
  geometryRef: RefObject<Group>;
  lines: LineDataType[];
  setLines: Dispatch<SetStateAction<LineDataType[]>>;
};

export const GeometryContext = createContext<GeometryContextType | undefined>(
  undefined,
);

type GeometryStoreProps = {
  children: ReactNode | ReactNode[];
};

export const GeometryStore = ({ children }: GeometryStoreProps) => {
  const [showGeometry, setShowGeometry] = useState(false);
  const [lines, setLines] = useState<LineDataType[]>([]);

  return (
    <GeometryContext.Provider
      value={{ geometryRef, showGeometry, setShowGeometry, lines, setLines }}>
      {children}
    </GeometryContext.Provider>
  );
};

import { CylinderSizeType, LineDataType } from '@utils';
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
  cylinderSize: CylinderSizeType;
  setRadius: (radius: number) => void;
  setLength: (length: number) => void;
};

export const GeometryContext = createContext<GeometryContextType | undefined>(
  undefined,
);

type GeometryStoreProps = {
  children: ReactNode | ReactNode[];
};

export const GeometryStore = ({ children }: GeometryStoreProps) => {
  const [showGeometry, setShowGeometry] = useState(false);
  const [cylinderSize, setCylinderSize] = useState({ radius: 2, length: 6 });
  const [lines, setLines] = useState<LineDataType[]>([]);

  const setRadius = (radius: number) => {
    setCylinderSize((prev) => ({ ...prev, radius }));
  };
  const setLength = (length: number) => {
    setCylinderSize((prev) => ({ ...prev, length }));
  };

  return (
    <GeometryContext.Provider
      value={{
        geometryRef,
        showGeometry,
        setShowGeometry,
        lines,
        setLines,
        cylinderSize,
        setRadius,
        setLength,
      }}>
      {children}
    </GeometryContext.Provider>
  );
};

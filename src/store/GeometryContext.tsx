import { CylinderSizeType, LineDataType, PointType } from '@utils';
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

const TOOL_STARTING_OFFSET_MULTIPLIER = 1.5;

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
  startingPoint: PointType;
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

  const startingPoint: PointType = {
    x: cylinderSize.length * TOOL_STARTING_OFFSET_MULTIPLIER,
    z: cylinderSize.radius * TOOL_STARTING_OFFSET_MULTIPLIER,
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
        startingPoint,
      }}>
      {children}
    </GeometryContext.Provider>
  );
};

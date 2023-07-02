import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState } from 'react';

interface DoneContextProps {
  checkalldone: boolean;
  setCheckAllDone: Dispatch<SetStateAction<boolean>>;
  editoptiondone: boolean;
  setEditOptionDone: Dispatch<SetStateAction<boolean>>;
}

export const DoneContext = createContext({} as DoneContextProps);

export const DoneProvider = ({ children }: { children: ReactNode }) => {
  const [checkalldone, setCheckAllDone] = useState(false);
  const [editoptiondone, setEditOptionDone] = useState(false);

  const value = {
    checkalldone,
    setCheckAllDone,
    editoptiondone,
    setEditOptionDone,
  };
  return <DoneContext.Provider value={value}>{children}</DoneContext.Provider>;
};

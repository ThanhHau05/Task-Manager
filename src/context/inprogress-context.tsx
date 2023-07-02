import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState } from 'react';

interface InProgressContextProps {
  checkallinprogress: boolean;
  setCheckAllInProgress: Dispatch<SetStateAction<boolean>>;
  editoptioninprogress: boolean;
  setEditOptionInProgress: Dispatch<SetStateAction<boolean>>;
}

export const InProgressContext = createContext({} as InProgressContextProps);

export const InProgressProvider = ({ children }: { children: ReactNode }) => {
  const [checkallinprogress, setCheckAllInProgress] = useState(false);
  const [editoptioninprogress, setEditOptionInProgress] = useState(false);

  const value = {
    checkallinprogress,
    setCheckAllInProgress,
    editoptioninprogress,
    setEditOptionInProgress,
  };
  return (
    <InProgressContext.Provider value={value}>
      {children}
    </InProgressContext.Provider>
  );
};

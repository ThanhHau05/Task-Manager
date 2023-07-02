import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState } from 'react';

interface TodoContextProps {
  checkalltodo: boolean;
  setCheckAllTodo: Dispatch<SetStateAction<boolean>>;
  editoptiontodo: boolean;
  setEditOptionTodo: Dispatch<SetStateAction<boolean>>;
}

export const TodoContext = createContext({} as TodoContextProps);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [checkalltodo, setCheckAllTodo] = useState(false);
  const [editoptiontodo, setEditOptionTodo] = useState(false);

  const value = {
    checkalltodo,
    setCheckAllTodo,
    editoptiontodo,
    setEditOptionTodo,
  };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

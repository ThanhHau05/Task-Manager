import type { Dispatch, ReactNode, RefObject, SetStateAction } from 'react';
import { createContext, useState } from 'react';

import { useClickOutSide } from '@/hooks/useClickOutSide';

interface CategoryContextProps {
  categoryclick: boolean;
  setCategoryClick: Dispatch<SetStateAction<boolean>>;
  refCOSCategory: RefObject<HTMLDivElement>;
}

export const CategoryContext = createContext({} as CategoryContextProps);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categoryclick, setCategoryClick] = useState(false);
  const refCOSCategory = useClickOutSide(() => {
    if (categoryclick) setCategoryClick(false);
  });
  const value = {
    categoryclick,
    refCOSCategory,
    setCategoryClick,
  };
  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

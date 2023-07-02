import type { Dispatch, ReactNode, RefObject, SetStateAction } from 'react';
import { createContext, useEffect, useRef, useState } from 'react';
import type { IconType } from 'react-icons';
import { BiCategory } from 'react-icons/bi';

import { useClickOutSide } from '@/hooks/useClickOutSide';

interface HomeContextProps {
  inputRef: RefObject<HTMLInputElement>;
  inputaddtask: {
    value: string;
    error: string;
  };
  setInputAddTask: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
  handleAddTask: () => void;
  refCOSInputAddTask: RefObject<HTMLDivElement>;
  categoryclick: boolean;
  setCategoryClick: Dispatch<SetStateAction<boolean>>;
  refCOSCategory: RefObject<HTMLDivElement>;
  categoryvalue: {
    value: string;
    icon: IconType;
    color: string;
    error: string;
  };
  setCategoryValue: Dispatch<
    SetStateAction<{
      value: string;
      icon: IconType;
      color: string;
      error: string;
    }>
  >;
  handleClickListItemcategory: (
    value: string,
    icon: IconType,
    color: string,
    error: string
  ) => void;
  handleCheckCategoryClick: () => void;
}

export const HomeContext = createContext({} as HomeContextProps);

export const HomeContextProvider = ({ children }: { children: ReactNode }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputaddtask, setInputAddTask] = useState({
    value: '',
    error: '',
  });
  const [categoryclick, setCategoryClick] = useState(false);
  const [categoryvalue, setCategoryValue] = useState({
    value: 'category',
    icon: BiCategory,
    color: '',
    error: '',
  });

  useEffect(() => {
    const MyPlaceholder = document.getElementById('Pplaceholder');
    MyPlaceholder?.addEventListener('blur', () => {
      if (MyPlaceholder.textContent === '')
        MyPlaceholder.textContent = 'Add Description';
    });
    MyPlaceholder?.addEventListener('focus', () => {
      if (MyPlaceholder.textContent === 'Add Description')
        MyPlaceholder.textContent = '';
    });
  });

  useEffect(() => {
    if (inputaddtask.error && inputaddtask.value) {
      setInputAddTask({ ...inputaddtask, error: '' });
    }
  }, [inputaddtask]);

  const refCOSInputAddTask = useClickOutSide(() => {
    if (inputaddtask.error) setInputAddTask({ ...inputaddtask, error: '' });
  });

  const refCOSCategory = useClickOutSide(() => {
    if (categoryclick) setCategoryClick(false);
    else if (categoryvalue.error)
      setCategoryValue({ ...categoryvalue, error: '' });
  });

  const handleCheckCategoryClick = () => {
    if (!categoryvalue.error) {
      setCategoryClick(!categoryclick);
    } else {
      setCategoryValue({ ...categoryvalue, error: '' });
      setCategoryClick(!categoryclick);
    }
  };

  const handleAddTask = () => {
    if (!inputaddtask.value) {
      setInputAddTask({ value: '', error: 'Please enter the task' });
    } else if (categoryvalue.value !== 'category') {
      //
    } else {
      setCategoryValue({ ...categoryvalue, error: 'Please choose a category' });
    }
  };

  const handleClickListItemcategory = (
    value: string,
    icon: IconType,
    color: string
  ) => {
    setCategoryValue({ value, icon, color, error: '' });
    setCategoryClick(false);
  };

  const value = {
    inputRef,
    inputaddtask,
    setInputAddTask,
    handleAddTask,
    refCOSInputAddTask,
    categoryclick,
    setCategoryClick,
    refCOSCategory,
    categoryvalue,
    setCategoryValue,
    handleClickListItemcategory,
    handleCheckCategoryClick,
  };
  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

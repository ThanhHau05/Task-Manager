import type { Dispatch, ReactNode, RefObject, SetStateAction } from 'react';
import { createContext, useEffect, useRef, useState } from 'react';
import type { IconType } from 'react-icons';
import { BiCircle } from 'react-icons/bi';

import type { SelectOptionListItem } from '@/components/constants/select-options';
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
  refCOSInputAddTask: RefObject<HTMLDivElement>;
  descriptionvalue: string;
  setDescriptionValue: Dispatch<SetStateAction<string>>;
  handleAddTask: () => void;
  categoryvalue: {
    value: string;
    icon: IconType;
    color: string;
  };
  setCategoryValue: Dispatch<
    SetStateAction<{
      value: string;
      icon: IconType;
      color: string;
    }>
  >;
  refCOSCategory: RefObject<HTMLDivElement>;
  categoryclick: boolean;
  setCategoryClick: Dispatch<SetStateAction<boolean>>;
  todolisttask: SelectOptionListItem[];
  settodolisttask: Dispatch<SetStateAction<SelectOptionListItem[]>>;
  inprogresslisttask: SelectOptionListItem[];
  setinprogresslisttask: Dispatch<SetStateAction<SelectOptionListItem[]>>;
  donelisttask: SelectOptionListItem[];
  setdonelisttask: Dispatch<SetStateAction<SelectOptionListItem[]>>;
  handleStatusChange: (
    title: string,
    description: string,
    newcategory: string,
    oldcategory: string
  ) => void;
}

export const HomeContext = createContext({} as HomeContextProps);

export const HomeContextProvider = ({ children }: { children: ReactNode }) => {
  const [categoryvalue, setCategoryValue] = useState({
    value: 'Todo',
    icon: BiCircle,
    color: '',
  });
  const [categoryclick, setCategoryClick] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const [inputaddtask, setInputAddTask] = useState({
    value: '',
    error: '',
  });

  const [descriptionvalue, setDescriptionValue] = useState('');

  const [todolisttask, settodolisttask] = useState<SelectOptionListItem[]>([]);
  const [inprogresslisttask, setinprogresslisttask] = useState<
    SelectOptionListItem[]
  >([]);
  const [donelisttask, setdonelisttask] = useState<SelectOptionListItem[]>([]);

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

  const handleStatusChange = (
    title: string,
    description: string,
    newcategory: string,
    oldcategory: string
  ) => {
    if (oldcategory === 'Todo') {
      const listitemremove = todolisttask.filter(
        (item) => item.title !== title
      );
      settodolisttask(listitemremove);
    } else if (oldcategory === 'In Progress') {
      const listitemremove = inprogresslisttask.filter(
        (item) => item.title !== title
      );
      setinprogresslisttask(listitemremove);
    } else if (oldcategory === 'Done') {
      const listitemremove = donelisttask.filter(
        (item) => item.title !== title
      );
      setdonelisttask(listitemremove);
    }
    if (newcategory === 'Todo') {
      settodolisttask((e) => [
        {
          title,
          description,
          category: newcategory,
        },
        ...e,
      ]);
    } else if (newcategory === 'In Progress') {
      setinprogresslisttask((e) => [
        {
          title,
          description,
          category: newcategory,
        },
        ...e,
      ]);
    }
    if (newcategory === 'Done') {
      setdonelisttask((e) => [
        {
          title,
          description,
          category: newcategory,
        },
        ...e,
      ]);
    }
  };

  const handleAddTask = () => {
    if (!inputaddtask.value) {
      setInputAddTask({ value: '', error: 'Please enter the task' });
    } else {
      if (categoryvalue.value === 'Todo') {
        settodolisttask((e) => [
          ...e,
          {
            title: inputaddtask.value,
            description: descriptionvalue,
            category: categoryvalue.value,
          },
        ]);
      } else if (categoryvalue.value === 'In Progress') {
        setinprogresslisttask((e) => [
          ...e,
          {
            title: inputaddtask.value,
            description: descriptionvalue,
            category: categoryvalue.value,
          },
        ]);
      } else {
        setdonelisttask((e) => [
          ...e,
          {
            title: inputaddtask.value,
            description: descriptionvalue,
            category: categoryvalue.value,
          },
        ]);
      }
      setInputAddTask({ value: '', error: '' });
      setDescriptionValue('');
    }
  };

  const refCOSCategory = useClickOutSide(() => {
    if (categoryclick) setCategoryClick(false);
  });

  const value = {
    inputRef,
    inputaddtask,
    setInputAddTask,
    handleAddTask,
    descriptionvalue,
    setDescriptionValue,
    refCOSInputAddTask,
    categoryclick,
    setCategoryClick,
    refCOSCategory,
    categoryvalue,
    setCategoryValue,
    todolisttask,
    settodolisttask,
    inprogresslisttask,
    setinprogresslisttask,
    donelisttask,
    setdonelisttask,
    handleStatusChange,
  };
  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

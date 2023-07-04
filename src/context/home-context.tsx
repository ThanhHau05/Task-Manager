import type { Dispatch, ReactNode, RefObject, SetStateAction } from 'react';
import { createContext, useEffect, useRef, useState } from 'react';
import type { IconType } from 'react-icons';
import { BiCircle } from 'react-icons/bi';

import type { SelectOptionListItem } from '@/constants/select-options';
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
  categoryclick: boolean;
  setCategoryClick: Dispatch<SetStateAction<boolean>>;
  todolisttask: SelectOptionListItem[];
  setTodoListTask: Dispatch<SetStateAction<SelectOptionListItem[]>>;
  inprogresslisttask: SelectOptionListItem[];
  setInProgressListTask: Dispatch<SetStateAction<SelectOptionListItem[]>>;
  donelisttask: SelectOptionListItem[];
  setDoneListTask: Dispatch<SetStateAction<SelectOptionListItem[]>>;
  handleStatusChange: (
    title: string,
    description: string,
    newcategory: string,
    oldcategory: string
  ) => void;
  handleDropDownClick: (e: number, title: string) => void;
  refCOSCategoryInputAddTask: RefObject<HTMLDivElement>;
  editoptiondone: { status: boolean; title: string };
  setEditOptionDone: Dispatch<
    SetStateAction<{ status: boolean; title: string }>
  >;
  checkallinprogress: boolean;
  setCheckAllInProgress: Dispatch<SetStateAction<boolean>>;
  editoptioninprogress: {
    status: boolean;
    title: string;
  };
  setEditOptionInProgress: Dispatch<
    SetStateAction<{ status: boolean; title: string }>
  >;
  checkalltodo: boolean;
  setCheckAllTodo: Dispatch<SetStateAction<boolean>>;
  editoptiontodo: {
    status: boolean;
    title: string;
  };
  setEditOptionTodo: Dispatch<
    SetStateAction<{
      status: boolean;
      title: string;
    }>
  >;
  handlePin: (category: string, index: number) => void;
  handleUnPin: (type: string, listtask: SelectOptionListItem[]) => void;
  handleMoveUp: (index: number, type: string) => void;
  handleMoveDown: (index: number, type: string) => void;
  dropdowncategory: {
    index: number;
    status: boolean;
    title: string;
  };
  setDropDownCategory: Dispatch<
    SetStateAction<{
      index: number;
      status: boolean;
      title: string;
    }>
  >;
  listtaskremove: {
    todo: number[];
    inprogress: number[];
    done: number[];
  };
  setListTaskRemove: Dispatch<
    SetStateAction<{ todo: number[]; inprogress: number[]; done: number[] }>
  >;
  handleDeleteTask: (title: string, index: number) => void;
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

  const [todolisttask, setTodoListTask] = useState<SelectOptionListItem[]>([]);
  const [inprogresslisttask, setInProgressListTask] = useState<
    SelectOptionListItem[]
  >([]);
  const [donelisttask, setDoneListTask] = useState<SelectOptionListItem[]>([]);

  const [dropdowncategory, setDropDownCategory] = useState({
    index: -1,
    status: false,
    title: '',
  });

  const [checkallinprogress, setCheckAllInProgress] = useState(false);
  const [editoptiondone, setEditOptionDone] = useState({
    status: false,
    title: 'Done',
  });
  const [editoptioninprogress, setEditOptionInProgress] = useState({
    status: false,
    title: 'In Progress',
  });

  const [editoptiontodo, setEditOptionTodo] = useState({
    status: false,
    title: 'Todo',
  });
  const [checkalltodo, setCheckAllTodo] = useState(false);

  const [listtaskremove, setListTaskRemove] = useState<{
    todo: number[];
    inprogress: number[];
    done: number[];
  }>({
    todo: [],
    inprogress: [],
    done: [],
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
      setTodoListTask(listitemremove);
    } else if (oldcategory === 'In Progress') {
      const listitemremove = inprogresslisttask.filter(
        (item) => item.title !== title
      );
      setInProgressListTask(listitemremove);
    } else if (oldcategory === 'Done') {
      const listitemremove = donelisttask.filter(
        (item) => item.title !== title
      );
      setDoneListTask(listitemremove);
    }
    if (newcategory === 'Todo') {
      setTodoListTask((e) => [
        {
          title,
          description,
          category: newcategory,
          pin: false,
        },
        ...e,
      ]);
    } else if (newcategory === 'In Progress') {
      setInProgressListTask((e) => [
        {
          title,
          description,
          category: newcategory,
          pin: false,
        },
        ...e,
      ]);
    } else if (newcategory === 'Done') {
      setDoneListTask((e) => [
        {
          title,
          description,
          category: newcategory,
          pin: false,
        },
        ...e,
      ]);
    }
    setDropDownCategory({ index: -1, status: false, title: '' });
  };

  const handleDropDownClick = (index: number, title: string) => {
    setDropDownCategory({ index, status: !dropdowncategory.status, title });
  };

  const handleAddTask = () => {
    if (!inputaddtask.value) {
      setInputAddTask({ value: '', error: 'Please enter the task' });
    } else {
      if (categoryvalue.value === 'Todo') {
        setTodoListTask((e) => [
          ...e,
          {
            title: inputaddtask.value,
            description: descriptionvalue,
            category: categoryvalue.value,
            pin: false,
          },
        ]);
      } else if (categoryvalue.value === 'In Progress') {
        setInProgressListTask((e) => [
          ...e,
          {
            title: inputaddtask.value,
            description: descriptionvalue,
            category: categoryvalue.value,
            pin: false,
          },
        ]);
      } else {
        setDoneListTask((e) => [
          ...e,
          {
            title: inputaddtask.value,
            description: descriptionvalue,
            category: categoryvalue.value,
            pin: false,
          },
        ]);
      }
      setInputAddTask({ value: '', error: '' });
      setDescriptionValue('');
    }
  };

  const refCOSCategoryInputAddTask = useClickOutSide(() => {
    if (categoryclick) setCategoryClick(false);
  });

  const handlePin = (category: string, index: number) => {
    let newarray: SelectOptionListItem[] = [];
    if (category === 'Todo') {
      const updatelist = [...todolisttask];
      if (updatelist[0]?.pin) {
        updatelist[0].pin = false;
      }

      newarray = updatelist.splice(index, 1);
      if (newarray[0]) {
        newarray[0].pin = true;
        updatelist.unshift(newarray[0]);
        setTodoListTask(updatelist);
      }
    } else if (category === 'In Progress') {
      const updatelist = [...inprogresslisttask];
      newarray = updatelist.splice(index, 1);
      if (newarray[0]) {
        newarray[0].pin = true;
        updatelist.unshift(newarray[0]);
        setInProgressListTask(updatelist);
      }
    } else if (category === 'Done') {
      const updatelist = [...donelisttask];
      newarray = updatelist.splice(index, 1);
      if (newarray[0]) {
        newarray[0].pin = true;
        updatelist.unshift(newarray[0]);
        setDoneListTask(updatelist);
      }
    }
  };

  const handleUnPin = (type: string, listtask: SelectOptionListItem[]) => {
    const updatlist = [...listtask];
    if (updatlist[0]?.pin) {
      updatlist[0].pin = false;
      if (type === 'Todo') {
        setTodoListTask(updatlist);
      } else if (type === 'In Progress') {
        setInProgressListTask(updatlist);
      } else if (type === 'Done') {
        setDoneListTask(updatlist);
      }
    }
  };

  const handleMoveUp = (index: number, type: string) => {
    if (type === 'Todo') {
      const updatelist = [...todolisttask];
      const temp1 = updatelist[index - 1];
      const temp2 = updatelist[index];
      if (temp1 && temp2) {
        updatelist[index - 1] = temp2;
        updatelist[index] = temp1;
        setTodoListTask(updatelist);
      }
    } else if (type === 'In Progress') {
      const updatelist = [...inprogresslisttask];
      const temp1 = updatelist[index - 1];
      const temp2 = updatelist[index];
      if (temp1 && temp2) {
        updatelist[index - 1] = temp2;
        updatelist[index] = temp1;
        setInProgressListTask(updatelist);
      }
    } else if (type === 'Done') {
      const updatelist = [...donelisttask];
      const temp1 = updatelist[index - 1];
      const temp2 = updatelist[index];
      if (temp1 && temp2) {
        updatelist[index - 1] = temp2;
        updatelist[index] = temp1;
        setDoneListTask(updatelist);
      }
    }
  };

  const handleMoveDown = (index: number, type: string) => {
    if (type === 'Todo') {
      const updatelist = [...todolisttask];
      const temp1 = updatelist[index];
      const temp2 = updatelist[index + 1];
      if (temp1 && temp2) {
        updatelist[index] = temp2;
        updatelist[index + 1] = temp1;
        setTodoListTask(updatelist);
      }
    } else if (type === 'In Progress') {
      const updatelist = [...inprogresslisttask];
      const temp1 = updatelist[index];
      const temp2 = updatelist[index + 1];
      if (temp1 && temp2) {
        updatelist[index] = temp2;
        updatelist[index + 1] = temp1;
        setInProgressListTask(updatelist);
      }
    } else if (type === 'Done') {
      const updatelist = [...donelisttask];
      const temp1 = updatelist[index];
      const temp2 = updatelist[index + 1];
      if (temp1 && temp2) {
        updatelist[index] = temp2;
        updatelist[index + 1] = temp1;
        setDoneListTask(updatelist);
      }
    }
  };

  const handleDeleteTask = (title: string, index: number) => {
    if (title === 'Todo') {
      const updatelist = [...todolisttask];
      updatelist.splice(index, 1);
      setTodoListTask(updatelist);
    } else if (title === 'In Progress') {
      const updatelist = [...inprogresslisttask];
      updatelist.splice(index, 1);
      setInProgressListTask(updatelist);
    } else if (title === 'Done') {
      const updatelist = [...donelisttask];
      updatelist.splice(index, 1);
      setDoneListTask(updatelist);
    }
  };

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
    categoryvalue,
    setCategoryValue,
    todolisttask,
    setTodoListTask,
    inprogresslisttask,
    setInProgressListTask,
    donelisttask,
    setDoneListTask,
    handleStatusChange,
    dropdowncategory,
    setDropDownCategory,
    handleDropDownClick,
    refCOSCategoryInputAddTask,
    editoptiondone,
    setEditOptionDone,
    checkallinprogress,
    setCheckAllInProgress,
    editoptioninprogress,
    setEditOptionInProgress,
    checkalltodo,
    setCheckAllTodo,
    editoptiontodo,
    setEditOptionTodo,
    handlePin,
    handleUnPin,
    handleMoveUp,
    handleMoveDown,
    listtaskremove,
    setListTaskRemove,
    handleDeleteTask,
  };
  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

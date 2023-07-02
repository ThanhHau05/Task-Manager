import { useContext } from 'react';

import { DROP_DOWN_CATEGORY } from '@/components/constants/select-options';
import { CategoryTable, InputAddTask } from '@/components/pages/home';
import { DoneContext } from '@/context/done-context';
import { InProgressContext } from '@/context/inprogress-context';
import { TodoContext } from '@/context/todo-context';

const Index = () => {
  const { checkalltodo, editoptiontodo, setCheckAllTodo, setEditOptionTodo } =
    useContext(TodoContext);
  const {
    checkallinprogress,
    editoptioninprogress,
    setCheckAllInProgress,
    setEditOptionInProgress,
  } = useContext(InProgressContext);
  const { checkalldone, editoptiondone, setCheckAllDone, setEditOptionDone } =
    useContext(DoneContext);

  return (
    <div className="flex items-center justify-center h-screen px-20 py-14 bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <div className="flex flex-col w-full h-full p-3 bg-gray-200 border-2 shadow-md rounded-2xl drop-shadow-md">
        <InputAddTask />
        <div className="grid w-full h-full grid-cols-3 gap-4">
          <CategoryTable
            checkall={checkalltodo}
            onCheckAll={setCheckAllTodo}
            onClickEditOptions={setEditOptionTodo}
            editoptions={editoptiontodo}
            data={DROP_DOWN_CATEGORY[0]}
          />
          <CategoryTable
            checkall={checkallinprogress}
            onCheckAll={setCheckAllInProgress}
            onClickEditOptions={setEditOptionInProgress}
            editoptions={editoptioninprogress}
            data={DROP_DOWN_CATEGORY[1]}
          />
          <CategoryTable
            checkall={checkalldone}
            onCheckAll={setCheckAllDone}
            onClickEditOptions={setEditOptionDone}
            editoptions={editoptiondone}
            data={DROP_DOWN_CATEGORY[2]}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;

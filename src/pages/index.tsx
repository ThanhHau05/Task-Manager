import { useContext } from 'react';

import { DROP_DOWN_CATEGORY } from '@/components/constants/select-options';
import { CategoryTable, InputAddTask } from '@/components/pages/home';
import { CategoryProvider } from '@/context/category-context';
import { DoneContext, DoneProvider } from '@/context/done-context';
import { HomeContext, HomeContextProvider } from '@/context/home-context';
import {
  InProgressContext,
  InProgressProvider,
} from '@/context/inprogress-context';
import { TodoContext, TodoProvider } from '@/context/todo-context';

const IndexContainer = () => {
  const { todolisttask, inprogresslisttask, donelisttask } =
    useContext(HomeContext);
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
            listtask={todolisttask}
          />
          <CategoryTable
            checkall={checkallinprogress}
            onCheckAll={setCheckAllInProgress}
            onClickEditOptions={setEditOptionInProgress}
            editoptions={editoptioninprogress}
            data={DROP_DOWN_CATEGORY[1]}
            listtask={inprogresslisttask}
          />
          <CategoryTable
            checkall={checkalldone}
            onCheckAll={setCheckAllDone}
            onClickEditOptions={setEditOptionDone}
            editoptions={editoptiondone}
            data={DROP_DOWN_CATEGORY[2]}
            listtask={donelisttask}
          />
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <CategoryProvider>
      <HomeContextProvider>
        <TodoProvider>
          <InProgressProvider>
            <DoneProvider>
              <IndexContainer />
            </DoneProvider>
          </InProgressProvider>
        </TodoProvider>
      </HomeContextProvider>
    </CategoryProvider>
  );
};

export default Index;

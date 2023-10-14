import { useContext } from 'react';

import { CategoryTable, InputAddTask } from '@/components/pages/home';
import { DROP_DOWN_CATEGORY } from '@/constants/select-options';
import { HomeContext, HomeContextProvider } from '@/context/home-context';

const IndexContainer = () => {
  const { todolisttask, inprogresslisttask, donelisttask } =
    useContext(HomeContext);

  return (
    <div className="flex items-center justify-center h-screen px-20 py-9 bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <div className="flex flex-col w-full h-full p-3 bg-gray-200 border-2 shadow-md rounded-2xl drop-shadow-md">
        <InputAddTask />
        <div className="grid w-full h-full grid-cols-3 gap-4">
          <CategoryTable data={DROP_DOWN_CATEGORY[0]} listtask={todolisttask} />
          <CategoryTable
            data={DROP_DOWN_CATEGORY[1]}
            listtask={inprogresslisttask}
          />
          <CategoryTable data={DROP_DOWN_CATEGORY[2]} listtask={donelisttask} />
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  // const { currentUser } = useSelector(selector.user);

  // const dispatch = useDispatch();

  // const _onClick = () => {
  //   if (currentUser === 'test user') {
  //     dispatch(UserActions.setCurrentUser('new user'));
  //   }
  //   if (currentUser === 'new user') {
  //     dispatch(UserActions.setCurrentUser('test user'));
  //   }
  // };

  return (
    <HomeContextProvider>
      <IndexContainer />
    </HomeContextProvider>
  );
};

export default Index;

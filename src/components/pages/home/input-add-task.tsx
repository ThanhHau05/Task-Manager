import clsx from 'clsx';
import { useContext } from 'react';
import type { IconType } from 'react-icons';
import { IoAdd } from 'react-icons/io5';

import { SimpleButton } from '@/components/button';
import { DROP_DOWN_CATEGORY } from '@/components/constants/select-options';
import { CategoryContext } from '@/context/category-context';
import { HomeContext } from '@/context/home-context';

const SimpleCategory = ({
  value,
  color,
  Icon,
}: {
  value: string;
  color: string;
  Icon: IconType;
}) => {
  const { categoryclick, setCategoryClick, refCOSCategory } =
    useContext(CategoryContext);

  const { setCategoryValue } = useContext(HomeContext);

  return (
    <div ref={refCOSCategory} className="relative">
      <SimpleButton onClick={() => setCategoryClick(!categoryclick)}>
        <Icon className={clsx('inline-block mr-2 mt-0.5 h-4 w-4', color)} />
        {value}
      </SimpleButton>
      {categoryclick && (
        <div className="absolute right-0 z-10 flex flex-col justify-center p-1 mt-2 bg-gray-300 border drop-shadow-sm border-slate-300 rounded-2xl">
          {DROP_DOWN_CATEGORY.map((item) => (
            <div
              key={item.value}
              className="flex items-center p-1 px-4 cursor-pointer hover:bg-slate-300 rounded-xl"
              onClick={() => {
                setCategoryValue({
                  value: item.title,
                  icon: item.icon,
                  color: item.color,
                });
                setCategoryClick(!categoryclick);
              }}
            >
              <item.icon className={clsx(item.color, 'h-4 w-4')} />
              <h2 className="pl-2 font-medium text-gray-900 whitespace-nowrap drop-shadow-md">
                {item.title}
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ButtonsInInput = () => {
  const { handleAddTask, categoryvalue } = useContext(HomeContext);
  return (
    <div className="flex flex-col items-end justify-center gap-3">
      <div className="flex items-center">
        <span className="mr-6">Status</span>
        <SimpleCategory
          value={categoryvalue.value}
          Icon={categoryvalue.icon}
          color={categoryvalue.color}
        />
      </div>
      <div className="drop-shadow-md">
        <SimpleButton onClick={() => handleAddTask()}>
          <IoAdd className="mr-2 text-lg" />
          Create
        </SimpleButton>
      </div>
    </div>
  );
};

export const InputAddTask = () => {
  const {
    inputaddtask,
    setInputAddTask,
    refCOSInputAddTask,
    setDescriptionValue,
    descriptionvalue,
  } = useContext(HomeContext);

  return (
    <div className="relative pb-6">
      <div
        ref={refCOSInputAddTask}
        className={clsx(
          'flex items-center justify-between py-1 w-full border bg-gray-300 rounded-lg h-auto hover:cursor-text px-2 pr-5 drop-shadow-md z-10 relative',
          inputaddtask.error ? 'border-red-500' : 'border-slate-300'
        )}
      >
        <div className="flex flex-col justify-center w-4/5 gap-2">
          <input
            type="text"
            className="w-full h-full px-3 bg-gray-300 rounded-r-lg outline-none placeholder:text-gray-800 placeholder:font-medium"
            placeholder="Add a task"
            onChange={(e) =>
              setInputAddTask({ value: e.target.value, error: '' })
            }
            value={inputaddtask.value}
          />
          <div className="w-full h-auto">
            <textarea
              className="w-full h-12 px-3 bg-gray-300 rounded-md outline-none resize-none placeholder:text-gray-900"
              placeholder="Add Description"
              onChange={(e) => setDescriptionValue(e.target.value)}
              value={descriptionvalue}
            />
          </div>
        </div>
        <ButtonsInInput />
      </div>
      {inputaddtask.error ? (
        <span className="absolute left-0 z-10 px-2 text-sm text-white bg-red-500 -bottom-2 before:left-14 before:h-0 before:w-0 rounded-xl before:border-x-8 before:border-b-8 before:border-x-transparent before:border-b-red-500 before:absolute before:-top-2">
          {inputaddtask.error}
        </span>
      ) : null}
    </div>
  );
};

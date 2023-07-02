import clsx from 'clsx';
import { useContext, useState } from 'react';
import type { IconType } from 'react-icons';
import { AiFillDelete } from 'react-icons/ai';
import { BiCircle, BiEdit } from 'react-icons/bi';
import { BsArrowDownSquare, BsArrowUpSquare, BsPinAngle } from 'react-icons/bs';
import { LuCheckSquare, LuSquare } from 'react-icons/lu';

import { SimpleButton } from '@/components/button';
import {
  DROP_DOWN_CATEGORY,
  type SelectOptionCategory,
  type SelectOptionListItem,
} from '@/components/constants/select-options';
import { HomeContext } from '@/context/home-context';

const Category = ({
  index,
  color,
  Icon,
  datatitle,
  title,
  description,
}: {
  index: number;
  color: string;
  datatitle: string;
  title: string;
  description: string;
  Icon: IconType;
}) => {
  const { handleStatusChange } = useContext(HomeContext);

  const [test, settest] = useState({ status: false, index: 0 });

  const _handleTest = (e: number) => {
    settest({ status: !test.status, index: e });
  };
  return (
    <div className="relative">
      <SimpleButton onClick={() => _handleTest(index)}>
        <Icon className={clsx('inline-block mr-2 mt-0.5 h-4 w-4', color)} />
        {datatitle}
      </SimpleButton>
      {test.status && index === test.index && (
        <div className="absolute right-0 z-10 flex flex-col justify-center p-1 mt-2 bg-gray-300 border drop-shadow-sm border-slate-300 rounded-2xl">
          {DROP_DOWN_CATEGORY.map((items) => (
            <div
              key={items.value}
              className="flex items-center p-1 px-4 cursor-pointer hover:bg-slate-300 rounded-xl"
              onClick={() => {
                handleStatusChange(title, description, items.title, datatitle);
                settest({ status: false, index: test.index });
              }}
            >
              <items.icon className={clsx(items.color, 'h-4 w-4')} />
              <h2 className="pl-2 font-medium text-gray-900 whitespace-nowrap drop-shadow-md">
                {items.title}
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const CategoryTable = ({
  data,
  onClickEditOptions,
  editoptions,
  onCheckAll,
  checkall,
  listtask,
}: {
  data: SelectOptionCategory | undefined;
  onClickEditOptions: (value: boolean) => void;
  editoptions: boolean;
  onCheckAll: (value: boolean) => void;
  checkall: boolean;
  listtask: SelectOptionListItem[];
}) => {
  const Icon = data?.icon || BiCircle;

  return (
    <div className="w-full h-full px-4 py-2 bg-gray-300 border rounded-lg drop-shadow-md border-slate-300">
      <div className="flex flex-col items-center gap-2 mb-4 drop-shadow-md">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Icon className={clsx('text-2xl', data?.color)} />
            <h2 className="ml-2 text-2xl font-medium">{data?.title}</h2>
          </div>
          <BiEdit
            className="text-xl cursor-pointer"
            onClick={() => onClickEditOptions(!editoptions)}
          />
        </div>
        {editoptions && (
          <div className="flex items-center justify-between w-full">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => onCheckAll(!checkall)}
            >
              {!checkall ? (
                <LuSquare className="mr-2 text-lg text-slate-700" />
              ) : (
                <LuCheckSquare className="mr-2 text-lg text-slate-700" />
              )}
              <span className="selection:outline-none">All</span>
            </div>
            <div>
              <SimpleButton disabled>
                <AiFillDelete className="mr-2" />
                Delete
              </SimpleButton>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {listtask &&
          listtask.map((item, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className="flex items-center justify-between w-full h-auto p-1 px-2 transition-all bg-gray-200 border rounded-md shadow-sm hover:shadow-md border-slate-300"
            >
              <div>
                <div className="w-10/12 mb-2">
                  <div className="flex items-center">
                    <h2 className="mr-3 font-medium">{item.title}</h2>
                    <BsPinAngle className="cursor-pointer" />
                  </div>
                  <p>{item.description}</p>
                </div>
                <Category
                  index={index}
                  color={data?.color ? data.color : ''}
                  Icon={data?.icon ? data.icon : BiCircle}
                  datatitle={data?.title ? data.title : ''}
                  description={item.description}
                  title={item.title}
                />
              </div>
              <div className="flex flex-col w-5 gap-2">
                {index !== 0 && (
                  <BsArrowUpSquare className="text-lg cursor-pointer" />
                )}
                <BsArrowDownSquare className="text-lg cursor-pointer" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

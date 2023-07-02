import clsx from 'clsx';
import { AiFillDelete } from 'react-icons/ai';
import { BiCircle, BiEdit } from 'react-icons/bi';
import { LuCheckSquare, LuSquare } from 'react-icons/lu';

import { SimpleButton } from '@/components/button';
import type { SelectOptionCategory } from '@/components/constants/select-options';

export const CategoryTable = ({
  data,
  onClickEditOptions,
  editoptions,
  onCheckAll,
  checkall,
}: {
  data: SelectOptionCategory | undefined;
  onClickEditOptions: (value: boolean) => void;
  editoptions: boolean;
  onCheckAll: (value: boolean) => void;
  checkall: boolean;
}) => {
  const Icon = data?.icon || BiCircle;

  return (
    <div className="w-full h-full px-4 py-2 bg-gray-300 border rounded-lg drop-shadow-md border-slate-300">
      <div className="flex flex-col items-center gap-2 drop-shadow-md">
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
    </div>
  );
};

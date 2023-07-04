import clsx from 'clsx';
import { BiCircle } from 'react-icons/bi';

import {
  type SelectOptionCategory,
  type SelectOptionListItem,
} from '@/constants/select-options';

import { RenderItemListTask } from './render-item';

export const CategoryTable = ({
  data,
  listtask,
}: {
  data: SelectOptionCategory | undefined;
  listtask: SelectOptionListItem[];
}) => {
  const Icon = data?.icon || BiCircle;

  return (
    <div className="w-full h-full px-4 py-2 bg-gray-300 border rounded-lg drop-shadow-md border-slate-300">
      <div className="flex flex-col items-center gap-2 mb-4 drop-shadow-md">
        <div className="flex items-center">
          <Icon className={clsx('text-2xl', data?.color)} />
          <h2 className="ml-2 text-2xl font-medium">{data?.title}</h2>
        </div>
      </div>
      <div
        className={clsx('flex flex-col gap-2 overflow-y-auto scroll h-[432px]')}
      >
        {listtask && (
          <RenderItemListTask
            Icon={data?.icon ? data.icon : BiCircle}
            color={data?.color ? data.color : ''}
            datatitle={data?.title ? data.title : ''}
            listtask={listtask}
          />
        )}
      </div>
    </div>
  );
};

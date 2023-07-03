import clsx from 'clsx';
import { useContext } from 'react';
import type { IconType } from 'react-icons';
import {
  BsArrowDownSquare,
  BsArrowUpSquare,
  BsPinAngle,
  BsPinAngleFill,
} from 'react-icons/bs';

import { SimpleButton } from '@/components/button';
import {
  DROP_DOWN_CATEGORY,
  type SelectOptionListItem,
} from '@/constants/select-options';
import { HomeContext } from '@/context/home-context';

export const RenderDropDownCategory = ({
  title,
  description,
  datatitle,
}: {
  title: string;
  description: string;
  datatitle: string;
}) => {
  const { handleStatusChange } = useContext(HomeContext);
  return (
    <div>
      {DROP_DOWN_CATEGORY.map((items) =>
        items.title !== datatitle ? (
          <div
            key={items.value}
            className="flex items-center p-1 px-4 cursor-pointer hover:bg-slate-300 rounded-xl"
            onClick={() => {
              handleStatusChange(title, description, items.title, datatitle);
            }}
          >
            <items.icon className={clsx(items.color, 'h-4 w-4')} />
            <h2 className="pl-2 font-medium text-gray-900 whitespace-nowrap drop-shadow-md">
              {items.title}
            </h2>
          </div>
        ) : null
      )}
    </div>
  );
};

export const RenderItemListTask = ({
  listtask,
  color,
  Icon,
  datatitle,
}: {
  listtask: SelectOptionListItem[];
  color: string;
  Icon: IconType;
  datatitle: string;
}) => {
  const {
    handlePin,
    handleUnPin,
    handleMoveUp,
    handleMoveDown,
    handleDropDownClick,
    dropdowncategory,
  } = useContext(HomeContext);

  return (
    <div>
      {listtask.map((item, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className={clsx(
            'flex items-center justify-between w-full h-auto p-1 px-2 transition-all bg-gray-200 border rounded-md shadow-sm hover:shadow-md border-slate-300',
            item.pin ? 'mb-2' : 'mb-1'
          )}
        >
          <div>
            <div className="w-10/12 mb-2">
              <div className="flex items-center">
                <h2 className="mr-3 font-medium">{item.title}</h2>
                {item.pin ? (
                  <BsPinAngleFill
                    className="cursor-pointer text-red-600 drop-shadow-md hover:scale-125 transition-all"
                    onClick={() => handleUnPin(item.category, listtask)}
                  />
                ) : (
                  <BsPinAngle
                    className="cursor-pointer drop-shadow-md hover:scale-125 transition-all"
                    onClick={() => handlePin(datatitle, index)}
                  />
                )}
              </div>
              <p>{item.description}</p>
            </div>
            <div className="relative">
              <SimpleButton
                onClick={() => handleDropDownClick(index, datatitle)}
              >
                <Icon
                  className={clsx('inline-block mr-2 mt-0.5 h-4 w-4', color)}
                />
                {datatitle}
              </SimpleButton>

              {dropdowncategory.status &&
                index === dropdowncategory.index &&
                datatitle === dropdowncategory.title && (
                  <div className="absolute right-0 z-10 flex flex-col justify-center p-1 mt-2 bg-gray-300 border drop-shadow-sm border-slate-300 rounded-2xl">
                    <RenderDropDownCategory
                      datatitle={datatitle}
                      description={item.description}
                      title={item.title}
                    />
                  </div>
                )}
            </div>
          </div>
          <div className="flex flex-col w-5 gap-2">
            {(listtask[0]?.pin && index !== 0 && index !== 1) ||
            (!listtask[0]?.pin &&
              listtask.length === index + 1 &&
              index !== 0) ||
            (!listtask[0]?.pin && listtask.length !== index && index !== 0) ? (
              <BsArrowUpSquare
                className="text-lg cursor-pointer text-slate-400 transition-all hover:text-slate-800"
                onClick={() => handleMoveUp(index, datatitle)}
              />
            ) : null}
            {listtask.length !== 1 &&
              !item.pin &&
              index + 1 !== listtask.length && (
                <BsArrowDownSquare
                  className="text-lg cursor-pointer text-slate-400 transition-all hover:text-slate-800"
                  onClick={() => handleMoveDown(index, datatitle)}
                />
              )}
          </div>
        </div>
      ))}
    </div>
  );
};

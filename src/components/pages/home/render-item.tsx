import clsx from 'clsx';
import { useContext } from 'react';
import type { IconType } from 'react-icons';
import { AiFillDelete } from 'react-icons/ai';
import {
  BsArrowDownSquare,
  BsArrowUpSquare,
  BsPinAngle,
  BsPinAngleFill,
} from 'react-icons/bs';
import { FaPencilAlt } from 'react-icons/fa';

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

const Category = ({
  index,
  datatitle,
  color,
  itemtitle,
  description,
  Icon,
}: {
  index: number;
  datatitle: string;
  color: string;
  itemtitle: string;
  description: string;
  Icon: IconType;
}) => {
  const { dropdowncategory, handleDropDownClick } = useContext(HomeContext);
  return (
    <div className="relative inline-block">
      <SimpleButton onClick={() => handleDropDownClick(index, datatitle)}>
        <Icon className={clsx('inline-block mr-2 mt-0.5 h-4 w-4', color)} />
        {datatitle}
      </SimpleButton>

      {dropdowncategory.status &&
        index === dropdowncategory.index &&
        datatitle === dropdowncategory.title && (
          <div className="absolute right-0 z-10 flex flex-col justify-center p-1 mt-2 bg-gray-300 border drop-shadow-sm border-slate-300 rounded-2xl">
            <RenderDropDownCategory
              datatitle={datatitle}
              description={description}
              title={itemtitle}
            />
          </div>
        )}
    </div>
  );
};

const HanleUpDown = ({
  listtask,
  index,
  datatitle,
  pin,
}: {
  listtask: SelectOptionListItem[];
  index: number;
  datatitle: string;
  pin: boolean;
}) => {
  const { handleMoveUp, handleMoveDown } = useContext(HomeContext);
  return (
    <div className="flex flex-col w-5 gap-2">
      {(listtask[0]?.pin && index !== 0 && index !== 1) ||
      (!listtask[0]?.pin && listtask.length === index + 1 && index !== 0) ||
      (!listtask[0]?.pin && listtask.length !== index && index !== 0) ? (
        <BsArrowUpSquare
          className="text-lg cursor-pointer text-slate-400 transition-all hover:text-slate-800"
          onClick={() => handleMoveUp(index, datatitle)}
        />
      ) : null}
      {listtask.length !== 1 && !pin && index + 1 !== listtask.length && (
        <BsArrowDownSquare
          className="text-lg cursor-pointer text-slate-400 transition-all hover:text-slate-800"
          onClick={() => handleMoveDown(index, datatitle)}
        />
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
    handleDeleteTask,
    edittitleanddescription,
    setEditTitleAndDescription,
  } = useContext(HomeContext);
  console.log(
    '🚀 ~ file: render-item.tsx:140 ~ edittitleanddescription:',
    edittitleanddescription
  );
  return (
    <div>
      {listtask.map((item, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className={clsx(
            'flex group items-center justify-between w-full h-auto p-1 px-2 transition-all bg-gray-200 border rounded-md shadow-sm hover:shadow-md border-slate-300',
            item.pin ? 'mb-2' : 'mb-1'
          )}
        >
          <div className="w-full mr-4">
            <div className="mb-2">
              <div className="flex items-center mb-2">
                <div className="w-4">
                  {item.pin ? (
                    <BsPinAngleFill
                      className="cursor-pointer text-red-600 drop-shadow-md hover:scale-125 transition-all"
                      onClick={() =>
                        !edittitleanddescription.status &&
                        handleUnPin(item.category, listtask)
                      }
                    />
                  ) : (
                    <BsPinAngle
                      className="cursor-pointer drop-shadow-md hover:scale-125 transition-all"
                      onClick={() =>
                        !edittitleanddescription.status &&
                        handlePin(datatitle, index)
                      }
                    />
                  )}
                </div>
                <h2 className="mx-3 font-medium break-word">{item.title}</h2>
                <div className="w-4 mr-3">
                  <FaPencilAlt
                    onClick={() =>
                      setEditTitleAndDescription({ status: true, index })
                    }
                    className="text-slate-400 hover:text-slate-800 transition-all cursor-pointer group-hover:block hidden drop-shadow-md"
                  />
                </div>
                {!edittitleanddescription.status && (
                  <div className="w-4">
                    <AiFillDelete
                      className="text-xl cursor-pointer text-slate-400 hover:text-red-500 drop-shadow-md transition-all group-hover:block hidden"
                      onClick={() => handleDeleteTask(datatitle, index)}
                    />
                  </div>
                )}
              </div>
              <p className="break-word text-sm">{item.description}</p>
            </div>
            {!edittitleanddescription.status &&
            edittitleanddescription.index !== index ? (
              <Category
                Icon={Icon}
                color={color}
                datatitle={datatitle}
                itemtitle={item.title}
                description={item.description}
                index={index}
              />
            ) : (
              <div className="flex items-center gap-2">
                <SimpleButton>Cancel</SimpleButton>
                <SimpleButton>Save</SimpleButton>
              </div>
            )}
          </div>
          {!edittitleanddescription.status && (
            <HanleUpDown
              datatitle={datatitle}
              index={index}
              listtask={listtask}
              pin={item.pin}
            />
          )}
        </div>
      ))}
    </div>
  );
};

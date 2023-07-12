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
  index,
  title,
  description,
  datatitle,
}: {
  index: number;
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
              handleStatusChange(
                index,
                title,
                description,
                items.title,
                datatitle
              );
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
  const { dropdowncategory, handleDropDownClick, edittitleanddescription } =
    useContext(HomeContext);
  return (
    <div className="relative inline-block">
      <SimpleButton
        onClick={() => handleDropDownClick(index, datatitle)}
        disabled={edittitleanddescription.status}
      >
        <Icon className={clsx('inline-block mr-2 mt-0.5 h-4 w-4', color)} />
        {datatitle}
      </SimpleButton>

      {dropdowncategory.status &&
        index === dropdowncategory.index &&
        datatitle === dropdowncategory.title && (
          <div className="absolute right-0 z-10 flex flex-col justify-center p-1 mt-2 bg-gray-300 border drop-shadow-sm border-slate-300 rounded-2xl">
            <RenderDropDownCategory
              index={index}
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

const HandlePin = ({
  pin,
  isEditTitle,
  category,
  listtask,
  datatitle,
  index,
}: {
  pin: boolean;
  isEditTitle: boolean;
  category: string;
  listtask: SelectOptionListItem[];
  datatitle: string;
  index: number;
}) => {
  const { handlePin, handleUnPin } = useContext(HomeContext);
  return (
    <div className="w-4">
      {pin ? (
        <BsPinAngleFill
          className="cursor-pointer text-red-600 drop-shadow-md hover:scale-125 transition-all"
          onClick={() => isEditTitle && handleUnPin(category, listtask)}
        />
      ) : (
        <BsPinAngle
          className="cursor-pointer drop-shadow-md hover:scale-125 transition-all"
          onClick={() => isEditTitle && handlePin(datatitle, index)}
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
    handleDeleteTask,
    edittitleanddescription,
    setEditTitleAndDescription,
    handleEditTitleAndDescription,
    handleChangeTitleAndDescription,
    setEditDescriptionTask,
    setEditTitleTask,
    editdescriptiontask,
    edittitletask,
  } = useContext(HomeContext);

  return (
    <div>
      {listtask.map((item, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className={clsx(
            'flex group items-center justify-between w-full h-auto p-1 px-2 transition-all bg-gray-200 border rounded-md shadow-sm hover:shadow-lg border-slate-300',
            item.pin ? 'mb-2' : 'mb-1'
          )}
        >
          <div className="w-full">
            <div className="mb-2">
              <div className="flex items-center mb-2">
                <HandlePin
                  category={item.category}
                  datatitle={datatitle}
                  index={index}
                  isEditTitle={!edittitleanddescription.status}
                  listtask={listtask}
                  pin={item.pin}
                />
                {edittitleanddescription.title === datatitle &&
                edittitleanddescription.index === index &&
                edittitleanddescription.status ? (
                  <input
                    onChange={(e) => setEditTitleTask(e.target.value)}
                    type="text"
                    className="w-full mx-3 outline-none bg-gray-200 border-b-2 border-slate-400"
                    value={edittitletask}
                  />
                ) : (
                  <h2 className="mx-3 font-medium break-word">{item.title}</h2>
                )}
                {!edittitleanddescription.status ? (
                  <>
                    <div className="w-4 mr-3">
                      {!edittitleanddescription.status ? (
                        <FaPencilAlt
                          onClick={() =>
                            handleEditTitleAndDescription(
                              index,
                              datatitle,
                              item.title,
                              item.description
                            )
                          }
                          className="text-slate-400 hover:text-slate-800 transition-all cursor-pointer group-hover:block hidden drop-shadow-md"
                        />
                      ) : null}
                    </div>
                    <div className="w-4">
                      <AiFillDelete
                        className="text-xl cursor-pointer text-slate-400 hover:text-red-500 drop-shadow-md transition-all group-hover:block hidden"
                        onClick={() => handleDeleteTask(datatitle, index)}
                      />
                    </div>
                  </>
                ) : null}
              </div>
              {edittitleanddescription.title === datatitle &&
              edittitleanddescription.index === index &&
              edittitleanddescription.status ? (
                <textarea
                  onChange={(e) => setEditDescriptionTask(e.target.value)}
                  value={editdescriptiontask}
                  className="outline-none resize-none w-full bg-gray-200 border-b-2 h-20 border-slate-400"
                />
              ) : (
                <p className="break-word text-sm">{item.description}</p>
              )}
            </div>
            {edittitleanddescription.title === datatitle &&
            edittitleanddescription.index === index &&
            edittitleanddescription.status ? (
              <div className="flex items-center gap-2 mt-6 justify-between">
                <SimpleButton
                  onClick={() =>
                    setEditTitleAndDescription({
                      status: false,
                      index: -1,
                      title: '',
                    })
                  }
                >
                  Cancel
                </SimpleButton>
                <SimpleButton
                  onClick={() =>
                    handleChangeTitleAndDescription(
                      index,
                      datatitle,
                      edittitletask,
                      editdescriptiontask
                    )
                  }
                >
                  Save
                </SimpleButton>
              </div>
            ) : (
              <Category
                Icon={Icon}
                color={color}
                datatitle={datatitle}
                itemtitle={item.title}
                description={item.description}
                index={index}
              />
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

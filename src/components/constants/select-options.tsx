import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BiCircle } from 'react-icons/bi';
import type { IconType } from 'react-icons/lib';
import { TbProgress } from 'react-icons/tb';

export interface SelectOptionCategory {
  title: string;
  icon: IconType;
  color: string;
  value: string;
}

export interface SelectOptionListItem {
  title: string;
  description: string;
  category: string;
}

export const DROP_DOWN_CATEGORY: SelectOptionCategory[] = [
  {
    title: 'Todo',
    icon: BiCircle,
    color: '',
    value: 'todo',
  },
  {
    title: 'In Progress',
    icon: TbProgress,
    color: 'text-yellow-500',
    value: 'in-progress',
  },
  {
    title: 'Done',
    icon: AiOutlineCheckCircle,
    color: 'text-violet-600',
    value: 'done',
  },
];

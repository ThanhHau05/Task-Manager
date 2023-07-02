import clsx from 'clsx';

export const SimpleButton = ({
  onClick,
  children,
  borderColor,
  disabled,
}: {
  onClick?: (value: any) => void;
  children: any;
  borderColor?: string;
  disabled?: boolean;
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'relative px-4 py-[3px] h-8 border rounded-2xl w-36 bg-gray-400/60  whitespace-nowrap flex justify-center items-center drop-shadow-md outline-none',
        borderColor || 'border-slate-300',
        disabled ? 'cursor-no-drop' : 'hover:bg-gray-400'
      )}
    >
      {children}
    </button>
  );
};

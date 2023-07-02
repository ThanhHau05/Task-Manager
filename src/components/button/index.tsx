import clsx from 'clsx';

export const SimpleButton = ({
  onClick,
  children,
  borderColor,
}: {
  onClick?: (value: any) => void;
  children: any;
  borderColor?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'relative px-4 py-[3px] h-8 border rounded-2xl w-36 bg-gray-400/60  whitespace-nowrap flex justify-center items-center drop-shadow-md hover:bg-gray-400',
        borderColor || 'border-slate-300'
      )}
    >
      {children}
    </button>
  );
};

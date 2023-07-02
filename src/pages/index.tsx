import { InputAddTask } from '@/components/pages/home';

const Index = () => {
  return (
    <div className="flex items-center justify-center h-screen px-20 py-14 bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <div className="flex flex-col w-full h-full p-3 bg-gray-200 border-2 shadow-md rounded-2xl drop-shadow-md">
        <InputAddTask />
        <div className="grid w-full h-full grid-cols-3 gap-4">
          <div className="w-full h-full bg-gray-300 rounded-lg" />
          <div className="w-full h-full bg-gray-300 rounded-lg" />
          <div className="w-full h-full bg-gray-300 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default Index;

import '../styles/global.css';

import type { AppProps } from 'next/app';

import { DoneProvider } from '@/context/done-context';
import { HomeContextProvider } from '@/context/home-context';
import { InProgressProvider } from '@/context/inprogress-context';
import { TodoProvider } from '@/context/todo-context';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <HomeContextProvider>
    <TodoProvider>
      <InProgressProvider>
        <DoneProvider>
          <Component {...pageProps} />
        </DoneProvider>
      </InProgressProvider>
    </TodoProvider>
  </HomeContextProvider>
);

export default MyApp;

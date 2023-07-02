import '../styles/global.css';

import type { AppProps } from 'next/app';

import { HomeContextProvider } from '@/context/home-context';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <HomeContextProvider>
    <Component {...pageProps} />
  </HomeContextProvider>
);

export default MyApp;

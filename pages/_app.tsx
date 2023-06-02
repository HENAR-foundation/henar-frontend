import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Dispatch, SetStateAction, createContext, useState } from 'react';
import {
  HeaderNavigationM,
  HeaderNavigation,
} from 'components/HeaderNavigation';
import Head from 'next/head';
import localFont from '@next/font/local';
import Footer from 'components/Footer';
import { useRouter } from 'next/router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Notification from 'components/Notification';
import { NextIntlProvider } from 'next-intl';
import ContactInfoModal from 'components/ContactInfoModal';

const PtRoot = localFont({
  variable: '--font-pt-root',
  src: [
    {
      path: '../public/fonts/pt-root-ui_regular.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/pt-root-ui_regular.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/pt-root-ui_regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/pt-root-ui_regular.woff',
      weight: '400',
      style: 'normal',
    },
  ],
});

const HyRoot = localFont({
  variable: '--font-hy-root',
  src: [
    {
      path: '../public/fonts/Montserratarm-Regular.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Montserratarm-Regular.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Montserratarm-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Montserratarm-Regular.otf',
      weight: '400',
      style: 'normal',
    },
  ],
});

const PtRootLight = localFont({
  variable: '--font-pt-light',
  src: [
    {
      path: '../public/fonts/pt-root-ui_light.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/pt-root-ui_light.woff',
      weight: '400',
      style: 'normal',
    },
  ],
});

export type InterfaceContextProps = {
  interfaceState: {
    signedIn: boolean;
  };
  setInterfaceState: Dispatch<
    SetStateAction<InterfaceContextProps | undefined>
  >;
};

export const InterfaceContext = createContext<InterfaceContextProps>({
  interfaceState: {
    signedIn: false,
  },
  setInterfaceState: () => undefined,
});

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  const { route, locale } = useRouter();

  const [interfaceState, setInterfaceState] = useState<any>({
    interfaceState: {
      signedIn: false,
    },
    setInterfaceState: () => undefined,
  });

  const RegularFont = locale === 'hy' ? HyRoot.variable : PtRoot.variable;
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen />
      <Hydrate state={pageProps.dehydratedState}>
        <NextIntlProvider onError={() => false} messages={pageProps.messages}>
          <Head>
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1'
            />
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <InterfaceContext.Provider
            value={{ interfaceState, setInterfaceState }}
          >
            <HeaderNavigation />
            <HeaderNavigationM />
            <main
              className={`flex justify-center min-h-[100vh] h-full px-4 lg:px-0 overflow-x-hidden relative ${RegularFont} ${
                PtRootLight.variable
              } font-sans ${route === '/' ? 'bg-white' : 'bg-[#F7F8F8]'}`}
            >
              <div className='flex flex-col h-full w-full items-center'>
                <div
                  className={`w-full ${route !== '/' ? 'max-w-[1054px]' : ''}`}
                >
                  <ContactInfoModal>
                    <Notification />
                    <Component {...pageProps} />
                  </ContactInfoModal>
                </div>
              </div>
            </main>
            <Footer />
          </InterfaceContext.Provider>
        </NextIntlProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;

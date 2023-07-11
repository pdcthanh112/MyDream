// import { ReactElement, ReactNode } from 'react';
// import type { AppProps } from 'next/app';
// import { NextComponentType, NextPage, NextPageContext } from 'next';
// import RootLayout from './layout';

// export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
//   getLayout?: (page: ReactElement) => ReactNode;
// };

// export type AppPropsWithLayout = AppProps & {
//   Component: NextComponentType<NextPageContext, any, any> & NextPageWithLayout;
// };
// console.log('pageeeeeeeeeeeeeeeeeeeeeeeee')
// export default function App({ Component, pageProps, router }: AppPropsWithLayout): ReactElement {
//   const getLayout = Component.getLayout ?? ((page: React.ReactNode) => page);
//   // return <RootLayout>(<Component {...pageProps} {...router} />)</RootLayout>;
//   return <RootLayout>{getLayout(<Component {...pageProps} {...router} />)}</RootLayout>;
// }
export default function Page() {
  console.log('1111111111111111111111111111111111111111111111111111111')
  return <h1>Hello, Next.js!</h1>
}


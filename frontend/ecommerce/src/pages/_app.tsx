import React from 'react';
import './../styles/globals.css';
import App, { AppPropsWithLayout } from 'app/page';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@redux/store';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { appWithTranslation } from 'next-i18next';
import { SessionProvider } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { ConfigProvider } from 'antd';
// import 'antd/dist/antd.css';

// const vi_VN = dynamic(() => import('antd/lib/locale/vi_VN'));
// const en_US = dynamic(() => import('antd/lib/locale/en_US'));
import en_US from 'antd/lib/locale/en_US';

// const es_ES = dynamic(() => import('antd/lib/locale/es_ES'));
// const zh_CN = dynamic(() => import('antd/lib/locale/zh_CN'));

const MyApp = ({ Component, pageProps: { session, ...pageProps }, router }: AppPropsWithLayout) => {
  const client = new ApolloClient({
    uri: `${process.env.REACT_APP_API_URL}/graphql`,
    cache: new InMemoryCache(),
  });

  const queryClient = new QueryClient();

  return (
    <React.StrictMode>
      <ConfigProvider locale={en_US}>
        <SessionProvider session={session}>
          <ApolloProvider client={client}>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <QueryClientProvider client={queryClient}>
                  <App Component={Component} pageProps={pageProps} router={router} />
                </QueryClientProvider>
              </PersistGate>
            </Provider>
          </ApolloProvider>
        </SessionProvider>
      </ConfigProvider>
    </React.StrictMode>
  );
};

export default appWithTranslation(MyApp);

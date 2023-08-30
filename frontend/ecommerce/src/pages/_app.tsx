import React from 'react';
import './../styles/globals.css';
import App, { AppPropsWithLayout } from 'app/page';
import { Provider } from 'react-redux';
import { store } from '@redux/store';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { appWithTranslation } from 'next-i18next';
import { ConfirmProvider } from 'material-ui-confirm';
import { SessionProvider } from 'next-auth/react';

const MyApp = ({ Component, pageProps, router }: AppPropsWithLayout) => {
// const MyApp = ({ Component, pageProps: { session, ...pageProps }, router }: AppPropsWithLayout) => {
  const client = new ApolloClient({
    uri: `${process.env.REACT_APP_API_URL}/graphql`,
    cache: new InMemoryCache(),
  });

  const queryClient = new QueryClient();
  
  return (
    <React.StrictMode>
      {/* <SessionProvider session={session}> */}
        <ApolloProvider client={client}>
          <Provider store={store}>
            <ConfirmProvider>
              <QueryClientProvider client={queryClient}>
                <App Component={Component} pageProps={pageProps} router={router} />
              </QueryClientProvider>
            </ConfirmProvider>
          </Provider>
        </ApolloProvider>
      {/* </SessionProvider> */}
    </React.StrictMode>
  );
};

export default appWithTranslation(MyApp);


import React from 'react';
import './../styles/globals.css';
import App, { AppPropsWithLayout } from 'app/page';
import { Provider } from 'react-redux';
import { store } from '@redux/store';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { appWithTranslation } from 'next-i18next';
import { ConfirmProvider } from 'material-ui-confirm';
import { GoogleOAuthProvider } from '@react-oauth/google';

const MyApp = ({ Component, pageProps, router }: AppPropsWithLayout) => {
  const client = new ApolloClient({
    uri: `${process.env.REACT_APP_API_URL}/graphql`,
    cache: new InMemoryCache(),
  });

  const queryClient = new QueryClient();
  const clientId = process.env.CLIENT_ID || '1085433653419-r6fptbnccc52h3q0rnhhsi5ge1onectp.apps.googleusercontent.com';
  
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <React.StrictMode>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <ConfirmProvider>
              <QueryClientProvider client={queryClient}>
                <App Component={Component} pageProps={pageProps} router={router} />
              </QueryClientProvider>
            </ConfirmProvider>
          </Provider>
        </ApolloProvider>
      </React.StrictMode>
    </GoogleOAuthProvider>
  );
};

export default appWithTranslation(MyApp);

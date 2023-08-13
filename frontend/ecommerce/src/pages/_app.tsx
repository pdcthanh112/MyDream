import React from 'react';
import './../styles/globals.css';
import App, { AppPropsWithLayout } from 'app/page';
import { Provider } from 'react-redux';
import { store, persistor } from '@redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { appWithTranslation } from 'next-i18next';
import { ConfirmProvider } from 'material-ui-confirm';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import { getAppData } from '@apis/appApi';
// import { setAppData } from '@redux/features/appDataSlice';
// import 'react-loading-skeleton/dist/skeleton.css';

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
            <PersistGate loading={null} persistor={persistor}>
              <ConfirmProvider>
                <QueryClientProvider client={queryClient}>
                  <App Component={Component} pageProps={pageProps} router={router} />
                </QueryClientProvider>
              </ConfirmProvider>
            </PersistGate>
          </Provider>
        </ApolloProvider>
      </React.StrictMode>
    </GoogleOAuthProvider>
  );
};

export default appWithTranslation(MyApp);

// export const getStaticProps = async () => {
//   await getAppData().then((response) => {
//     if (response) {
//       store.dispatch(setAppData(response));
//     }
//   });
// };

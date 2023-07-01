import React from 'react';
import '../app/globals.css';
import  type { AppProps } from 'next/app';

import { Provider } from 'react-redux';
import { store, persistor } from '@redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfirmProvider } from 'material-ui-confirm';
import 'react-loading-skeleton/dist/skeleton.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from 'app/page';
import { getAppData } from '@apis/appApi';
import { setAppData } from '@redux/features/appDataSlice';

export default function MyApp({ Component, pageProps, router }: any) {
  const queryClient = new QueryClient();

  return (
    <GoogleOAuthProvider clientId="1085433653419-r6fptbnccc52h3q0rnhhsi5ge1onectp.apps.googleusercontent.com">
      <React.StrictMode>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ConfirmProvider>
              <QueryClientProvider client={queryClient}>
                <App
                  pageProps={pageProps}
                  Component={Component}
                  router={router}
                />
              </QueryClientProvider>
            </ConfirmProvider>
          </PersistGate>
        </Provider>
      </React.StrictMode>
    </GoogleOAuthProvider>
  );
}

export const getStaticProps = async () => {
  const data = await getAppData().then(response => {
    if(response) {
      store.dispatch(setAppData(response));
    }
  });
};
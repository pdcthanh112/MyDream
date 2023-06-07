import React from 'react';
import '../app/globals.css';
import type { AppProps } from 'next/app';

import { Provider } from 'react-redux';
import { store, persistor } from '@redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfirmProvider } from 'material-ui-confirm';
import 'react-loading-skeleton/dist/skeleton.css';

import App from 'app/page';

export default function MyApp({ Component, pageProps, router }: AppProps) {
  const queryClient = new QueryClient();

  return (
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
  );
}

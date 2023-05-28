import React from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';

import { store, persistor } from '@redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
export default function MyApp({ Component, pageProps }: AppProps) {
  
  const queryClient = new QueryClient();

  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}

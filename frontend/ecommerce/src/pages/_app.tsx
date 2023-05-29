import React from 'react';
import '../app/globals.css'
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';

import { store, persistor } from '@redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from 'app/layout';
import "react-loading-skeleton/dist/skeleton.css";
import App from 'app/page';

export default function MyApp({ Component, pageProps, router }: AppProps) {
// export default function MyApp({ Component, pageProps }: AppProps) {
  
  const queryClient = new QueryClient();

  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
           <App pageProps={pageProps} Component={Component} router={router}/>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}

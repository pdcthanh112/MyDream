//  ;
// import React from 'react';
// import { Provider } from 'react-redux';
// import { store, persistor } from '@redux/store';
// import { PersistGate } from 'redux-persist/integration/react';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ConfirmProvider } from 'material-ui-confirm';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
// import { REACT_APP_API_URL } from "@config/index";

// const client = new ApolloClient({
//   uri: `${process.env.REACT_APP_API_URL}/graphql`,
//   cache: new InMemoryCache()
// });

// export default function Providers({ children }: { children: React.ReactNode }) {
//   const queryClient = new QueryClient();
//   const clientId = process.env.CLIENT_ID || '1085433653419-r6fptbnccc52h3q0rnhhsi5ge1onectp.apps.googleusercontent.com';

//   return (
//     <GoogleOAuthProvider clientId={clientId}>
//       <React.StrictMode>
//         <ApolloProvider client={client}>
//           <Provider store={store}>
//             <PersistGate loading={null} persistor={persistor}>
//               <ConfirmProvider>
//                 <QueryClientProvider client={queryClient}>
//                   {children}
//                 </QueryClientProvider>
//               </ConfirmProvider>
//             </PersistGate>
//           </Provider>
//         </ApolloProvider>
//       </React.StrictMode>
//     </GoogleOAuthProvider>
//   );
// }

import type { AppProps } from 'next/app';
import Layout from './layout';

export default function App({ Component, pageProps }: AppProps) {
  console.log('fasfsafshfsahfsljjTESTTTTTTTTTTTTTTTT');
  return (
  
      <Layout>
        <Component {...pageProps} />
      </Layout>
  
  );
}

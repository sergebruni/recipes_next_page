import "@/styles/theme.css";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import { PrimeReactProvider } from 'primereact/api';

import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <PrimeReactProvider value={{ripple: true}}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PrimeReactProvider>
  );
}

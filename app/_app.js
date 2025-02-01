import '../styles/globals.css';

import { PartsProvider } from "@/context/PartsContext";

export default function App({ Component, pageProps }) {
  return (
    <PartsProvider>
      <Component {...pageProps} />
    </PartsProvider>
  );
}

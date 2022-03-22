import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { PriceContextProvider } from "../contexts/PriceContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PriceContextProvider>
      <Component {...pageProps} />
    </PriceContextProvider>
  );
}

export default MyApp;

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src="https://kit.fontawesome.com/800ba3c0e3.js"
        strategy="lazyOnload"
      />
      <Component {...pageProps} />
    </>
  );
}

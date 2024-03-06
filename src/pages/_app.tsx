import type { AppProps } from "next/app";
import "../styles/globals.css"; // 전역 CSS

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

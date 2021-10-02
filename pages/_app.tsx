import "../styles/globals.css";
import type { AppProps } from "next/app";
import ThemeConfigContainer from "../components/ThemeConfigContainer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeConfigContainer>
      <Component {...pageProps} />
    </ThemeConfigContainer>
  );
}
export default MyApp;

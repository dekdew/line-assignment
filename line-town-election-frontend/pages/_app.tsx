import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useAppApolloClient } from "apollo/apollo-client";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useEffect } from "react";
import { ModalProvider } from "store/modalContext";

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useAppApolloClient();

  useEffect(() => {
    const appHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty("--app-height", `${window.innerHeight}px`);
    };
    window.addEventListener("resize", appHeight);
    appHeight();

    return () => {
      window.removeEventListener("resize", appHeight);
    };
  }, []);

  return (
    <ModalProvider>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ModalProvider>
  );
}

export default MyApp;

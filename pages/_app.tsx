import { AppProps } from "next/app";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../components/theme";
import { CssBaseline } from "@material-ui/core";
import i18next from "i18next";

import "../i18n/init";
import Layout from "../components/Layout";
import { GlobalDecisionContextProvider } from "../hooks/GlobalDecisionsContextProvider";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  i18next.changeLanguage(pageProps.language);
  return (
    <GlobalDecisionContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </GlobalDecisionContextProvider>
  );
}

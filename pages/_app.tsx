import { useEffect } from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../components/theme";
import { CssBaseline } from "@material-ui/core";
import i18next from "i18next";
import { init, trackPages } from "insights-js";

import "../i18n/init";
import Layout from "../components/Layout";
import { GlobalDecisionContextProvider } from "../hooks/GlobalDecisionsContextProvider";
import { GlobalUiContextProvider } from "../hooks/GlobalUiContextProvider";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    // only track page events if on production
    if (process.env.NEXT_PUBLIC_ENV === "production") {
      init("jrhvGLx1oC_dtZEN");
      trackPages();
    }
  }, []);

  i18next.changeLanguage(pageProps.language);
  return (
    <GlobalUiContextProvider>
      <GlobalDecisionContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </GlobalDecisionContextProvider>
    </GlobalUiContextProvider>
  );
}

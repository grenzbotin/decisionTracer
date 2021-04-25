import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import i18next from "i18next";
import { ServerStyleSheets } from "@material-ui/core/styles";
const basePath = "https://grenzbotin.github.io/decisionTracer";

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang={i18next.language}>
        <Head>
          {/* Until release, we keep robots out */}
          <meta name="robots" content="noindex" />
          <meta property="og:site_name" content="Rational Decision" key="ogsitename" />

          <meta httpEquiv="Content-Type" content="text/html" charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          <meta name="application-name" content="Rational Decision" />
          <meta name="msapplication-tooltip" content="Rational Decision" />
          <meta name="msapplication-starturl" content="/" />
          <meta name="msapplication-tap-highlight" content="no" />

          <meta name="theme-color" content="#65a88b" />
          <meta name="mobile-web-app-capable" content="yes" />

          <meta name="apple-mobile-web-app-title" content="Rational Decision" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />

          <meta name="msapplication-navbutton-color" content="#3A808A" />
          <meta name="msapplication-TileColor" content="#F6F0EC" />
          <meta name="msapplication-TileImage" content={`${basePath}/site/ms-icon-144x144.png`} />

          <link rel="icon" href={`${basePath}/site/favicon.ico`} />
          <link rel="apple-touch-icon" sizes="57x57" href={`${basePath}/site/apple-icon-57x57.png`} />
          <link rel="apple-touch-icon" sizes="60x60" href={`${basePath}/site/apple-icon-72x72.png`} />
          <link rel="apple-touch-icon" sizes="72x72" href={`${basePath}/site/apple-icon-72x72.png`} />
          <link rel="apple-touch-icon" sizes="76x76" href={`${basePath}/site/apple-icon-76x76.png`} />
          <link rel="apple-touch-icon" sizes="114x114" href={`${basePath}/site/apple-icon-114x114.png`} />
          <link rel="apple-touch-icon" sizes="120x120" href={`${basePath}/apple-icon-120x120.png`} />
          <link rel="apple-touch-icon" sizes="144x144" href={`${basePath}/site/apple-icon-144x144.png`} />
          <link rel="apple-touch-icon" sizes="152x152" href={`${basePath}/site/apple-icon-152x152.png`} />
          <link rel="apple-touch-icon" sizes="180x180" href={`${basePath}/site/apple-icon-180x180.png`} />
          <link rel="icon" type="image/png" sizes="192x192" href={`${basePath}/site/android-icon-192x192.png`} />
          <link rel="icon" type="image/png" sizes="32x32" href={`${basePath}/site/favicon-32x32.png`} />
          <link rel="icon" type="image/png" sizes="96x96" href={`${basePath}/site/favicon-96x96.png`} />
          <link rel="icon" type="image/png" sizes="16x16" href={`${basePath}/site/favicon-16x16.png`} />

          <link rel="manifest" href={`${basePath}/site/manifest.json`} />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
  };
};

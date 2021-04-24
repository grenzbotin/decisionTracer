import Head from "next/head";
import { useRouter } from "next/router";

const publicUrl = "https://grenzbotin.github.io/decisionTracer";

interface Props {
  title: string;
  description: string;
  keywords: string;
}

const HtmlHeader: React.FC<Props> = ({ title, description, keywords }) => {
  const { asPath } = useRouter();

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Until release, we keep robots out */}
      <meta name="robots" content="noindex" />

      <meta name="twitter:card" content="summary" key="twcard" />
      <meta property="og:url" content={`${publicUrl}${asPath}`} key="ogurl" />
      <meta property="og:image" content={`${publicUrl}/images/og.png`} key="ogimage" />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      <meta property="og:site_name" content="Rational Decision" key="ogsitename" />

      <meta httpEquiv="Content-Type" content="text/html" charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        // eslint-disable-next-line max-len
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,shrink-to-fit=no"
      />
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
      <meta name="msapplication-TileImage" content="/site/ms-icon-144x144.png" />

      <link rel="icon" href="./favicon.ico" />
      <link rel="apple-touch-icon" sizes="57x57" href="/site/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/site/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/site/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/site/apple-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/site/apple-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/site/apple-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/site/apple-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/site/apple-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/site/apple-icon-180x180.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/site/android-icon-192x192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/site/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/site/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/site/favicon-16x16.png" />

      <link rel="manifest" href="/site/manifest.json" />
    </Head>
  );
};

export default HtmlHeader;

import Head from "next/head";
import i18next from "i18next";
import { useRouter } from "next/router";

const publicUrl = "https://something.de";

interface Props {
  title: string;
  description: string;
  keywords: string;
}

const HtmlHeader: React.FC<Props> = ({ title, description, keywords }) => {
  const { pathname } = useRouter();

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta name="twitter:card" content="summary" key="twcard" />
      <meta
        property="og:url"
        content={`${publicUrl}/${i18next.language}${pathname}`}
        key="ogurl"
      />
      <meta
        property="og:image"
        content={`${publicUrl}/images/og.png`}
        key="ogimage"
      />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      <meta
        property="og:site_name"
        content="Decision Tracer"
        key="ogsitename"
      />

      <meta httpEquiv="Content-Type" content="text/html" charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        // eslint-disable-next-line max-len
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5,shrink-to-fit=no"
      />
      <meta name="application-name" content="Decision Tracer" />
      <meta name="msapplication-tooltip" content="Decision Tracer" />
      <meta name="msapplication-starturl" content="/" />
      <meta name="msapplication-tap-highlight" content="no" />

      <meta name="theme-color" content="#65a88b" />
      <meta name="mobile-web-app-capable" content="yes" />

      <meta name="apple-mobile-web-app-title" content="Decision Tracer" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      <meta name="msapplication-navbutton-color" content="#65a88b" />
      <meta name="msapplication-TileColor" content="#e3e3e3" />

      <link rel="icon" href="/favicon.ico" />
      <link href="/manifest.json" rel="manifest" />
    </Head>
  );
};

export default HtmlHeader;

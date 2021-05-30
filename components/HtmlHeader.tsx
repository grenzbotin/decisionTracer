import Head from "next/head";
import { useRouter } from "next/router";

interface Props {
  title: string;
  description: string;
  keywords?: string;
  metaImg?: string;
}

const HtmlHeader: React.FC<Props> = ({ title, description, keywords = "", metaImg = "meta_home" }) => {
  const { asPath } = useRouter();

  // on github page, the site is available via /decisionTracer
  const basePath = "https://grenzbotin.github.io/decisionTracer";
  const lang = asPath.includes("de") ? "de" : "en";

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords || ""} />

      <meta property="og:url" content={`${basePath}${asPath}`} key="ogurl" />
      <meta property="og:image" content={`${basePath}/img/${metaImg}_${lang}.png`} key="ogimage" />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />

      <meta
        name="viewport"
        // eslint-disable-next-line max-len
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,shrink-to-fit=no"
      />
    </Head>
  );
};

export default HtmlHeader;

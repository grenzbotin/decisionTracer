import Head from "next/head";
import { useRouter } from "next/router";

interface Props {
  title: string;
  description: string;
  keywords?: string;
  metaImg?: string;
  noRobots?: boolean;
  showSchema?: boolean;
}

const HtmlHeader: React.FC<Props> = ({
  title,
  description,
  keywords = "",
  metaImg = "meta_home",
  noRobots = false,
  showSchema = false
}) => {
  const { asPath } = useRouter();

  // on github page, the site is available via rational-decision.org
  const basePath = "https://www.rational-decision.org";
  const lang = asPath.includes("de") ? "de" : "en";

  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content={noRobots ? "noindex,nofollow" : "index,follow"} />
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
      {showSchema && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": `${basePath}/#organization`,
                name: "Rational Decision",
                url: `${basePath}/${lang}`,
                logo: `${basePath}/img/meta_home_${lang}.png`
              })
            }}
          />
        </>
      )}
    </Head>
  );
};

export default HtmlHeader;

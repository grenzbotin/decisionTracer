import i18next from "i18next";
import dynamic from "next/dynamic";

import { getAllLanguageSlugs, getLanguage } from "../../lib/lang";

const HtmlHeader = dynamic(() => import("../../components/HtmlHeader"));
const Calculator = dynamic(() => import("../../components/Calculator"));
const Result = dynamic(() => import("../../components/Result"));

export default function LangIndex() {
  return (
    <>
      <HtmlHeader
        title={i18next.t("home.meta.title")}
        description={i18next.t("home.meta.description")}
        keywords={i18next.t("home.meta.keywords")}
      />
      <Calculator />
      <Result />
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllLanguageSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const language = getLanguage(params.lang);
  return {
    props: {
      language,
    },
  };
}

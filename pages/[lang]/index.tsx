import i18next from "i18next";
import dynamic from "next/dynamic";

import { getAllLanguageSlugs, getLanguage } from "../../lib/lang";

const HtmlHeader = dynamic(() => import("../../components/HtmlHeader"));
const Calculator = dynamic(() => import("../../components/Calculator"));
const Result = dynamic(() => import("../../components/Result"));

export default function LangIndex(): JSX.Element {
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

interface StaticPathProps {
  paths: Array<{
    params: {
      lang: string;
    };
  }>;
  fallback: boolean;
}

export async function getStaticPaths(): Promise<StaticPathProps> {
  const paths = getAllLanguageSlugs();
  return {
    paths,
    fallback: false,
  };
}

interface StaticProps {
  props: {
    language: string;
  };
}

interface Params {
  params: {
    lang: string;
  };
}

export async function getStaticProps({ params }: Params): Promise<StaticProps> {
  const language = getLanguage(params.lang);
  return {
    props: {
      language,
    },
  };
}

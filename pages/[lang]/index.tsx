import React, { useContext, useEffect } from "react";
import { Grid } from "@material-ui/core";
import i18next from "i18next";
import dynamic from "next/dynamic";

import { getAllLanguageSlugs, getLanguage } from "../../lib/lang";
import { PRESETS } from "@/../lib/presets";
import PresetCard from "@/../components/PresetCard";
import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";

const HtmlHeader = dynamic(() => import("../../components/HtmlHeader"));

export default function LangIndex(): JSX.Element {
  const { active, setActiveFromPreset } = useContext(GlobalDecisionContext);
  useEffect(() => {
    if (active) {
      setActiveFromPreset(null);
    }
  }, [active, setActiveFromPreset]);

  return (
    <>
      <HtmlHeader
        title={i18next.t("home.meta.title")}
        description={i18next.t("home.meta.description")}
        keywords={i18next.t("home.meta.keywords")}
      />
      <Grid container spacing={2}>
        {PRESETS.map((preset) => (
          <Grid key={preset.key} md={4} sm={6} lg={3} xs={12} item>
            <PresetCard preset={preset} />
          </Grid>
        ))}
      </Grid>
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
    fallback: false
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
      language
    }
  };
}

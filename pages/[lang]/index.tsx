import React, { useContext, useEffect } from "react";
import { Card, Grid, Typography } from "@material-ui/core";
import i18next from "i18next";
import dynamic from "next/dynamic";

import { getAllLanguageSlugs, getLanguage } from "../../lib/lang";
import { PRESETS } from "@/../lib/presets";
import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import PresetCard from "@/../components/elements/PresetCard";

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
        metaImg="meta_home"
      />
      <Card variant="outlined" style={{ margin: "1rem 0 2rem 0", padding: "1rem" }}>
        <Typography variant="h5" gutterBottom component="h1">
          {i18next.t("home.title")}
        </Typography>
        <Typography variant="subtitle2" gutterBottom component="h2">
          {i18next.t("home.subtitle")}
        </Typography>
        {i18next
          .t("home.intro")
          .split("\n")
          .map((c, i) => (
            <Typography key={c} variant="body2" component="p" style={{ marginBottom: (i === 2 || i === 5) && ".6rem" }}>
              {c}
            </Typography>
          ))}
      </Card>
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

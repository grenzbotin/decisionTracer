import React, { useContext, useEffect } from "react";
import { GlobalUiContext } from "@/../hooks/GlobalUiContextProvider";
import { Grid, Hidden, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import i18next from "i18next";
import dynamic from "next/dynamic";

import { getAllLanguageSlugs, getLanguage } from "../../lib/lang";
import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";

const HtmlHeader = dynamic(() => import("../../components/HtmlHeader"));
const CalculatorWrapper = dynamic(() => import("../../components/CalculatorWrapper"));
const Result = dynamic(() => import("../../components/Result"));
const FooterResult = dynamic(() => import("../../components/Result/FooterResult"));

export default function LangIndex(): JSX.Element {
  const { mobileFooter } = useContext(GlobalUiContext);
  const { active, setActiveFromPreset } = useContext(GlobalDecisionContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (!active || active.key !== "corona-2") {
      setActiveFromPreset("corona-2");
    }
  }, [active, setActiveFromPreset]);

  return (
    active && (
      <>
        <HtmlHeader
          title={i18next.t("presets.corona-2.meta.title")}
          description={i18next.t("presets.corona-2.meta.description")}
          keywords={i18next.t("presetss.corona-2.meta.keywords")}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={9} style={{ marginBottom: mobileFooter && isMobile ? "220px" : "50px" }}>
            <CalculatorWrapper />
          </Grid>
          <Hidden mdDown>
            <Grid item xs={12} md={12} lg={3} style={{ position: "relative" }}>
              <Result />
            </Grid>
          </Hidden>
          <Hidden smUp>
            <FooterResult />
          </Hidden>
        </Grid>
      </>
    )
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

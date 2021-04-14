import React, { useContext, useEffect } from "react";
import { GlobalUiContext } from "@/../hooks/GlobalUiContextProvider";
import { Grid, Hidden, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import i18next from "i18next";
import dynamic from "next/dynamic";

import { getAllLanguageSlugs, getLanguage } from "../../lib/lang";
import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { useRouteLeavingCheck } from "@/../hooks/helpers";
// eslint-disable-next-line max-len
import { CoronaPresetContextProvider } from "@/../components/CalculatorWrapper/Questionnaire/Corona/CoronaPresetContextProvider";

const HtmlHeader = dynamic(() => import("../../components/HtmlHeader"));
const CalculatorWrapper = dynamic(() => import("../../components/CalculatorWrapper"));
const Result = dynamic(() => import("../../components/Result"));
const FooterResult = dynamic(() => import("../../components/Result/FooterResult"));
const SelectedNode = dynamic(() => import("../../components/SelectedNode"));
const MobileSelectedNode = dynamic(() => import("../../components/SelectedNode/MobileSelectedNode"));

export default function LangIndex(): JSX.Element {
  const { mobileFooter, showResult, updateUIState } = useContext(GlobalUiContext);
  const { active, setActiveFromPreset } = useContext(GlobalDecisionContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  useRouteLeavingCheck(i18next.t("common.route_leaving_confirm"));

  useEffect(() => {
    if (!active || active.key !== "corona") {
      updateUIState({ visualMode: "questionnaire", showResult: false });
      setActiveFromPreset("corona");
    }
  }, [active, setActiveFromPreset, updateUIState]);

  return (
    active && (
      <CoronaPresetContextProvider>
        <HtmlHeader
          title={i18next.t("presets.corona.meta.title")}
          description={i18next.t("presets.corona.meta.description")}
          keywords={i18next.t("presetss.corona.meta.keywords")}
        />
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={12}
            lg={showResult ? 9 : 12}
            style={{ marginBottom: mobileFooter && isMobile ? "220px" : "50px" }}
          >
            <CalculatorWrapper />
          </Grid>
          {showResult && (
            <>
              <Hidden smDown>
                <Grid item xs={12} md={12} lg={3} style={{ position: "relative" }}>
                  <div style={{ position: "sticky", top: "calc(1rem + 60px)" }}>
                    <Result />
                    <SelectedNode />
                  </div>
                </Grid>
              </Hidden>
              <Hidden mdUp>
                <FooterResult />
                <MobileSelectedNode />
              </Hidden>
            </>
          )}
        </Grid>
      </CoronaPresetContextProvider>
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

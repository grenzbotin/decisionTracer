import React, { useContext, useEffect } from "react";
import { GlobalUiContext } from "@/../hooks/GlobalUiContextProvider";
import { Button, Grid, Hidden, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import i18next from "i18next";
import dynamic from "next/dynamic";
import AddIcon from "@material-ui/icons/Add";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { getAllLanguageSlugs, getLanguage } from "../../lib/lang";
import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { useRouteLeavingCheck } from "@/../hooks/helpers";
import { getUniqueNumber } from "@/../lib/helpers";
import FloatingActionButton from "@/../components/elements/FloatingActionButton";

const HtmlHeader = dynamic(() => import("../../components/HtmlHeader"));
const CalculatorWrapper = dynamic(() => import("../../components/CalculatorWrapper"));
const Result = dynamic(() => import("../../components/Result"));
const FooterResult = dynamic(() => import("../../components/Result/FooterResult"));
const MobileSelectedNode = dynamic(() => import("../../components/SelectedNode/MobileSelectedNode"));

export default function LangIndex(): JSX.Element {
  const { mobileFooter, updateUIState, expert, setLastAddedDecision } = useContext(GlobalUiContext);
  const { active, setActiveFromPreset, addItem } = useContext(GlobalDecisionContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  useRouteLeavingCheck(i18next.t("common.route_leaving_confirm"));

  useEffect(() => {
    if (!active || active.key !== "coin-toss") {
      updateUIState({ visualMode: "questionnaire", expert: false });
      setActiveFromPreset("coin-toss");
    }
  }, [active, setActiveFromPreset, updateUIState]);

  const handleClickAddItem = (): void => {
    const uniqueNumber = getUniqueNumber();
    setLastAddedDecision(uniqueNumber);
    addItem(uniqueNumber);
  };

  return (
    <>
      <HtmlHeader
        title={i18next.t("presets.coin-toss.meta.title")}
        description={i18next.t("presets.coin-toss.meta.description")}
        keywords={i18next.t("presets.coin-toss.meta.keywords")}
        metaImg="meta_home"
      />
      {active && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={expert ? 9 : 12} style={{ marginBottom: mobileFooter && isMobile ? "220px" : "50px" }}>
            <CalculatorWrapper />
          </Grid>
          {expert && (
            <>
              <Hidden smDown>
                <Grid item xs={12} md={3} style={{ position: "relative" }}>
                  <div style={{ position: "sticky", top: "calc(1rem + 60px)" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleClickAddItem}
                      startIcon={<AddCircleIcon />}
                      style={{ marginBottom: "12px" }}
                    >
                      {i18next.t("calculator.new_decision")}
                    </Button>
                    <Result />
                  </div>
                </Grid>
              </Hidden>
              <Hidden mdUp>
                <FloatingActionButton
                  handleAction={handleClickAddItem}
                  icon={<AddIcon />}
                  label={i18next.t("calculator.new_decision")}
                />
                <FooterResult />
                <MobileSelectedNode />
              </Hidden>
            </>
          )}
        </Grid>
      )}
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

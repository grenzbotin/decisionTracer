import React, { useContext } from "react";
import { Typography, Container } from "@material-ui/core";
import i18next from "i18next";

import { Decision as DecisionType } from "@/../lib/presets";

import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { applyFormatting } from "@/../lib/helpers";
import { getResultValues, getSeriesFromData, getBestAlternatives } from "./helpers";

export default function CoronaResult(): JSX.Element {
  const i18nPrefix = "presets.corona.questionnaire.result";
  const { active } = useContext(GlobalDecisionContext);
  const decisions = active.decisions as DecisionType[];
  const results = getResultValues(decisions);
  const data = getSeriesFromData(decisions);
  const { winner, loser, ratio } = getBestAlternatives(results, Math.max(...results), data.labels);

  return (
    <>
      <Container maxWidth="lg" style={{ padding: 0 }}>
        <Typography variant="h6" gutterBottom>
          {i18next.t(`${i18nPrefix}.title`)}
        </Typography>
        <div style={{ marginBottom: "2rem" }}>
          <Typography variant="body2" gutterBottom>
            {applyFormatting(
              i18next.t(winner.length > 1 ? "calculator.interpretation_text_pl" : "calculator.interpretation_text", {
                decision: winner.join(" & ")
              })
            )}
          </Typography>
          <Typography component="span" variant="body2" gutterBottom>
            {applyFormatting(
              i18next.t("calculator.interpretation_insights_1", {
                winner: winner[0]
              })
            )}
          </Typography>
          <Typography component="span" variant="h3" style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}>
            {Math.round(ratio)}
          </Typography>
          <Typography component="span" variant="body2" gutterBottom>
            {applyFormatting(
              i18next.t("calculator.interpretation_insights_2", {
                loser: loser[0]
              })
            )}
          </Typography>
        </div>
        <Typography variant="body2" gutterBottom style={{ marginTop: "2rem" }}>
          {i18next.t(`${i18nPrefix}.text_1`)}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {i18next.t(`${i18nPrefix}.text_2`)}
        </Typography>
      </Container>
    </>
  );
}

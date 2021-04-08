import React from "react";
import { Typography } from "@material-ui/core";
import i18next from "i18next";

import { applyFormatting } from "@/../lib/helpers";

export default function Q2(): JSX.Element {
  const i18nPrefix = "presets.coin-toss.questionnaire.2";

  return (
    <>
      <Typography variant="body2" component="p" style={{ marginBottom: ".6rem" }}>
        {applyFormatting(i18next.t(`${i18nPrefix}.text_1`))}
      </Typography>
      <img
        src="/decisionTracer/images/tut2.png"
        alt="Spiel 1 vs Nicht spielen"
        width="320px"
        style={{ marginBottom: "1rem" }}
      />
    </>
  );
}

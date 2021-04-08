import React from "react";
import { Typography } from "@material-ui/core";
import i18next from "i18next";

import { applyFormatting } from "@/../lib/helpers";

export default function Q1(): JSX.Element {
  const i18nPrefix = "presets.coin-toss.questionnaire.1";

  return (
    <>
      <Typography variant="body2" component="p" style={{ marginBottom: ".6rem" }}>
        {applyFormatting(i18next.t(`${i18nPrefix}.text_1`))}
      </Typography>
      <img src="/decisionTracer/images/tut1.png" alt="Spiel 1" width="320px" style={{ marginBottom: "1rem" }} />
      {i18next
        .t(`${i18nPrefix}.text_2`)
        .split("\n")
        .map((c) => (
          <Typography key={c} variant="body2" component="p" style={{ marginBottom: ".6rem" }}>
            {applyFormatting(c)}
          </Typography>
        ))}
    </>
  );
}

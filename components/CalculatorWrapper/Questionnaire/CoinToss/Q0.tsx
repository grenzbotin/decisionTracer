import React from "react";
import { Typography } from "@material-ui/core";
import i18next from "i18next";

import { applyFormatting } from "@/../lib/helpers";

export default function Q0(): JSX.Element {
  const i18nPrefix = "presets.coin-toss.questionnaire.0";

  return (
    <>
      {i18next
        .t(`${i18nPrefix}.text`)
        .split("\n")
        .map((c) => (
          <Typography key={c} variant="body2" component="p" style={{ marginBottom: ".6rem" }}>
            {applyFormatting(c)}
          </Typography>
        ))}
    </>
  );
}

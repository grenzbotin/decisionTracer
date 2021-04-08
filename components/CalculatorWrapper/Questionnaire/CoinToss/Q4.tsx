import React from "react";
import { Typography } from "@material-ui/core";
import i18next from "i18next";

import { applyFormatting } from "@/../lib/helpers";

export default function Q4(): JSX.Element {
  const i18nPrefix = "presets.coin-toss.questionnaire.4";

  return (
    <>
      {i18next
        .t(`${i18nPrefix}.text_1`)
        .split("\n")
        .map((c) => (
          <Typography key={c} variant="body2" component="p" style={{ marginBottom: ".6rem" }}>
            {applyFormatting(c)}
          </Typography>
        ))}
    </>
  );
}

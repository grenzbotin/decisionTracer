import React from "react";
import { Typography } from "@material-ui/core";
import i18next from "i18next";
import { applyFormatting } from "@/../lib/helpers";

export default function ValuesLongCovid(): JSX.Element {
  const i18nPrefix = "presets.corona.questionnaire.4";
  return (
    <>
      <Typography variant="h6" gutterBottom>
        {i18next.t(`${i18nPrefix}.title`)}
      </Typography>
      <Typography variant="body2">{applyFormatting(i18next.t(`${i18nPrefix}.subtitle`))}</Typography>
    </>
  );
}

import React from "react";
import { Typography } from "@material-ui/core";
import i18next from "i18next";

export default function Q4(): JSX.Element {
  const i18nPrefix = "presets.corona.questionnaire.4";
  return (
    <>
      <Typography variant="h6" gutterBottom>
        5. {i18next.t(`${i18nPrefix}.title`)}
      </Typography>
      <Typography variant="body2">{i18next.t(`${i18nPrefix}.subtitle`)}</Typography>
    </>
  );
}

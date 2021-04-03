import React from "react";
import { Typography } from "@material-ui/core";
import i18next from "i18next";

export default function Q2(): JSX.Element {
  const i18nPrefix = "presets.corona.questionnaire.2";
  return (
    <>
      <Typography variant="h6" gutterBottom>
        3. {i18next.t(`${i18nPrefix}.title`)}
      </Typography>
      <Typography variant="caption">{i18next.t(`${i18nPrefix}.subtitle`)}</Typography>
      <Typography variant="body2" gutterBottom style={{ marginTop: "1rem" }}>
        {i18next.t(`${i18nPrefix}.0`)}
      </Typography>
    </>
  );
}

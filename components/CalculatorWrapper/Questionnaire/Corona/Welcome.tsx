import React from "react";
import { Typography, Container } from "@material-ui/core";
import i18next from "i18next";

import { applyFormatting } from "@/../lib/helpers";

export default function Welcome(): JSX.Element {
  const i18nPrefix = "presets.corona.questionnaire.welcome";

  return (
    <Container maxWidth="lg" style={{ fontSize: "1rem", padding: 0 }}>
      <Typography variant="h5" gutterBottom>
        {i18next.t(`${i18nPrefix}.title`)}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        {i18next.t(`${i18nPrefix}.subtitle`)}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {applyFormatting(i18next.t(`${i18nPrefix}.description_1`))}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {applyFormatting(i18next.t(`${i18nPrefix}.description_2`))}
      </Typography>
    </Container>
  );
}

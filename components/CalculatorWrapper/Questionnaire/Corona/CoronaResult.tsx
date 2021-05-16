import React from "react";
import { Typography, Container } from "@material-ui/core";
import i18next from "i18next";
import ResultChart from "@/../components/Result/ResultChart";

export default function CoronaResult(): JSX.Element {
  const i18nPrefix = "presets.corona.questionnaire.result";

  return (
    <>
      <Container maxWidth="lg" style={{ padding: 0 }}>
        <Typography variant="h6" gutterBottom>
          {i18next.t(`${i18nPrefix}.title`)}
        </Typography>
        <ResultChart />
      </Container>
    </>
  );
}

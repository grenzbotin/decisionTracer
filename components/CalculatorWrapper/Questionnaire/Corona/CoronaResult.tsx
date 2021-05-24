import React from "react";
import { Typography, Container } from "@material-ui/core";
import i18next from "i18next";
import ResultChartCorona from "@/../components/Result/ResultChartCorona";

export default function CoronaResult(): JSX.Element {
  const i18nPrefix = "presets.corona.questionnaire.result";

  return (
    <>
      <Container maxWidth="lg" style={{ padding: 0 }}>
        <Typography variant="h6" gutterBottom>
          {i18next.t(`${i18nPrefix}.title`)}
        </Typography>
        <ResultChartCorona />
      </Container>
    </>
  );
}

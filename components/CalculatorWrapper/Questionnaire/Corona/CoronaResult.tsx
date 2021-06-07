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
        <Typography variant="body2" gutterBottom style={{ marginTop: "2rem" }}>
          {i18next.t(`${i18nPrefix}.text_1`)}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {i18next.t(`${i18nPrefix}.text_2`)}
        </Typography>
      </Container>
    </>
  );
}

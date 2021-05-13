import React from "react";
import { Typography, Container } from "@material-ui/core";
import i18next from "i18next";
import ResultChart from "@/../components/Result/ResultChart";

export default function CoronaResult(): JSX.Element {
  const i18nPrefix = "presets.corona.questionnaire.result";

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {i18next.t(`${i18nPrefix}.title`)}
      </Typography>
      <Container maxWidth="md" style={{ marginTop: "1rem", padding: 0 }}>
        <ResultChart />
      </Container>
    </>
  );
}

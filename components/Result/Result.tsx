import React from "react";
import i18next from "i18next";
import { Card, Typography } from "@material-ui/core";
import ResultChart from "./ResultChart";

function Result({ mobile = false }: { height?: number; mobile?: boolean }): JSX.Element {
  return (
    <Card style={{ padding: mobile ? ".5rem .5rem 0 .5rem" : "1rem" }}>
      {!mobile && (
        <Typography variant="h5" component="h3" gutterBottom>
          {i18next.t("calculator.result")}
        </Typography>
      )}
      <ResultChart />
    </Card>
  );
}

export default Result;

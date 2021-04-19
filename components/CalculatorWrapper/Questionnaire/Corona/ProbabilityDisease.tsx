import React, { Fragment, useContext, useState } from "react";
import { Container, Divider, Typography, Grid } from "@material-ui/core";
import i18next from "i18next";

import CustomTooltip from "@/../components/elements/CustomTooltip";
import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import ValidatedProbabilityField from "@/../components/elements/ValidatedProbabilityField";
import { applyFormatting, getPresetValueByField } from "@/../lib/helpers";

const DISEASES = ["asymptomatic", "mild", "hospitalised", "severely-hospitalised", "death"];
const LEVEL = ["unvaccinated", "vaccinated"];

export default function ProbabilityDisease(): JSX.Element {
  const i18nPrefix = "presets.corona.questionnaire.1";
  const { active, setProbabilityByKey } = useContext(GlobalDecisionContext);

  // Taking default values from current active context
  const [calc, setCalc] = useState({
    vaccinated: {
      asymptomatic: getPresetValueByField(
        active.decisions,
        "probability",
        "vaccinated",
        "vaccinated-infection",
        "vaccinated-infection-asymptomatic"
      ),
      mild: getPresetValueByField(
        active.decisions,
        "probability",
        "vaccinated",
        "vaccinated-infection",
        "vaccinated-infection-mild"
      ),
      hospitalised: getPresetValueByField(
        active.decisions,
        "probability",
        "vaccinated",
        "vaccinated-infection",
        "vaccinated-infection-hospitalised"
      ),
      "severely-hospitalised": getPresetValueByField(
        active.decisions,
        "probability",
        "vaccinated",
        "vaccinated-infection",
        "vaccinated-infection-severely-hospitalised"
      ),
      death: getPresetValueByField(
        active.decisions,
        "probability",
        "vaccinated",
        "vaccinated-infection",
        "vaccinated-infection-death"
      )
    },
    unvaccinated: {
      asymptomatic: getPresetValueByField(
        active.decisions,
        "probability",
        "unvaccinated",
        "unvaccinated-infection",
        "unvaccinated-infection-asymptomatic"
      ),
      mild: getPresetValueByField(
        active.decisions,
        "probability",
        "unvaccinated",
        "unvaccinated-infection",
        "unvaccinated-infection-mild"
      ),
      hospitalised: getPresetValueByField(
        active.decisions,
        "probability",
        "unvaccinated",
        "unvaccinated-infection",
        "unvaccinated-infection-hospitalised"
      ),
      "severely-hospitalised": getPresetValueByField(
        active.decisions,
        "probability",
        "unvaccinated",
        "unvaccinated-infection",
        "unvaccinated-infection-severely-hospitalised"
      ),
      death: getPresetValueByField(
        active.decisions,
        "probability",
        "unvaccinated",
        "unvaccinated-infection",
        "unvaccinated-infection-death"
      )
    }
  });

  const handleChange = (value: number, category: string, item: string): void => {
    setCalc({
      ...calc,
      [category]: {
        ...calc[category],
        [item]: value
      }
    });

    if (
      getPresetValueByField(
        active.decisions,
        "probability",
        category,
        `${category}-infection`,
        `${category}-infection-${item}`
      ) !== null
    ) {
      const valueToSet = value > 100 ? 100 : value;
      setProbabilityByKey(valueToSet, category, `${category}-infection`, `${category}-infection-${item}`);
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {i18next.t(`${i18nPrefix}.title`)}
      </Typography>
      <Typography variant="body2">
        {applyFormatting(i18next.t(`${i18nPrefix}.subtitle`))}
        <CustomTooltip
          content={
            <>
              <Typography variant="caption">{applyFormatting(i18next.t(`${i18nPrefix}.tooltip`))}</Typography>
              <Divider style={{ margin: ".5rem 0" }} />
              <img
                src="/decisionTracer/images/studies_corona_mortality.jpg"
                alt="Absolute 28-day mortality risk associated with B.1.1.7"
                width="320px"
              />
            </>
          }
        />
      </Typography>
      <Container maxWidth="md" style={{ marginTop: "2rem", fontSize: "0.8rem", padding: 0 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}></Grid>
          {LEVEL.map((d) => (
            <Grid key={d} item xs={3}>
              {i18next.t(`${i18nPrefix}.calc.${d}`)}
            </Grid>
          ))}
          {DISEASES.map((d) => (
            <Fragment key={d}>
              <Grid item xs={6}>
                {i18next.t(`${i18nPrefix}.calc.probability_${d}`)}
              </Grid>
              {LEVEL.map((l) => (
                <Grid key={l} item xs={3}>
                  <ValidatedProbabilityField
                    disabled={calc[l][d] === null}
                    value={calc[l][d] === null ? "---" : calc[l][d]}
                    onChange={(value) => handleChange(value, l, d)}
                  />
                  {calc[l][d] === null && (
                    <CustomTooltip
                      content={
                        <Typography variant="caption">
                          {applyFormatting(i18next.t(`${i18nPrefix}.calc.tooltip_disabled`))}
                        </Typography>
                      }
                    />
                  )}
                </Grid>
              ))}
            </Fragment>
          ))}
          <Grid item xs={6}>
            <b>{i18next.t(`${i18nPrefix}.calc.total`)}</b>
          </Grid>
          {LEVEL.map((l) => {
            let total = 0;
            DISEASES.forEach((d) => (total += calc[l][d]));
            return (
              <Grid key={l} item xs={3}>
                <b>{total.toPrecision(5)}%</b>{" "}
                {total !== 100 && (
                  <CustomTooltip
                    alert
                    content={
                      <Typography variant="caption">
                        {applyFormatting(i18next.t(`${i18nPrefix}.calc.not_100`))}
                      </Typography>
                    }
                  />
                )}
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}

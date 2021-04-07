import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography, Container } from "@material-ui/core";
import i18next from "i18next";
import CustomTooltip from "@/../components/elements/CustomTooltip";
import ValidatedInputField from "@/../components/elements/ValidatedInputField";
import { getPresetValueByField, getRoundedValue } from "@/../lib/helpers";
import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { useFirstRender } from "@/../hooks/helpers";
import CoronaCases from "./CoronaCases";

export default function Q0(): JSX.Element {
  const i18nPrefix = "presets.corona.questionnaire.0";
  const { active, setProbability } = useContext(GlobalDecisionContext);

  const firstRender = useFirstRender();

  const [calc, setCalc] = useState({
    knownInfected: 100000,
    darkFigure: 3,
    actualInfected: 300000,
    unknownInfected: 200000,
    inhabitants: 83019213,
    probabilityInfection: 0.0024,
    peopleToMeet: 15,
    injectionDuration: 12,
    ownRisk: getPresetValueByField(active.decisions, "probability", "unvaccinated", "unvaccinated-infection") || 0
  });

  useEffect(() => {
    if (firstRender) {
      setCalc({
        ...calc,
        ownRisk:
          calc.unknownInfected > 0
            ? calc.peopleToMeet * calc.injectionDuration * (calc.unknownInfected / calc.inhabitants) * 100
            : 0
      });
    }
  }, [calc, firstRender]);

  useEffect(() => {
    // only if context probability is still existent
    const contextNonVacProbability = getPresetValueByField(
      active.decisions,
      "probability",
      "unvaccinated",
      "unvaccinated-infection"
    );
    const contextVacProbability = getPresetValueByField(
      active.decisions,
      "probability",
      "vaccinated",
      "vaccinated-infection"
    );

    const compareValue = calc.ownRisk > 100 ? 100 : calc.ownRisk;

    if (contextNonVacProbability !== null && compareValue !== contextNonVacProbability) {
      setProbability(compareValue, "unvaccinated", "unvaccinated-infection");
    }
    if (contextVacProbability !== null && compareValue !== contextVacProbability) {
      setProbability(compareValue, "vaccinated", "vaccinated-infection");
    }
  }, [calc.ownRisk, setProbability, active.decisions]);

  const handleChangeKnownInfected = (value: number): void => {
    const actualInfected = value * calc.darkFigure;
    const unknownInfected = actualInfected - value;

    setCalc({
      ...calc,
      knownInfected: value,
      actualInfected,
      unknownInfected,
      probabilityInfection: unknownInfected / calc.inhabitants,
      ownRisk:
        unknownInfected > 0
          ? calc.peopleToMeet * calc.injectionDuration * (unknownInfected / calc.inhabitants) * 100
          : 0
    });
  };

  const handleChangeDarkFigure = (value: number): void => {
    const actualInfected = calc.knownInfected * value;
    const unknownInfected = actualInfected - calc.knownInfected;

    setCalc({
      ...calc,
      darkFigure: value,
      actualInfected,
      unknownInfected,
      probabilityInfection: unknownInfected / calc.inhabitants,
      ownRisk:
        unknownInfected > 0
          ? calc.peopleToMeet * calc.injectionDuration * (unknownInfected / calc.inhabitants) * 100
          : 0
    });
  };

  const handleChangeInhabitants = (value: number): void => {
    setCalc({
      ...calc,
      inhabitants: value,
      probabilityInfection: (calc.unknownInfected / value) * 100,
      ownRisk:
        calc.unknownInfected > 0 ? calc.peopleToMeet * calc.injectionDuration * (calc.unknownInfected / value) * 100 : 0
    });
  };

  const handleChangePeopleToMeet = (value: number): void => {
    setCalc({
      ...calc,
      peopleToMeet: value,
      ownRisk: value * calc.injectionDuration * calc.probabilityInfection * 100
    });
  };

  const handleChangeInjectionDuration = (value: number): void => {
    setCalc({
      ...calc,
      injectionDuration: value,
      ownRisk: calc.peopleToMeet * value * calc.probabilityInfection * 100
    });
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        1. {i18next.t(`${i18nPrefix}.title`)}
      </Typography>
      <Typography variant="body2" style={{ display: "flex", alignItems: "center" }}>
        {i18next.t(`${i18nPrefix}.subtitle`)}
        <CustomTooltip
          content={
            <>
              {i18next
                .t(`${i18nPrefix}.tooltip`)
                .split("\n")
                .map((c) => (
                  <Typography key={c} variant="caption" component="p" style={{ marginBottom: ".4rem" }}>
                    {c}
                  </Typography>
                ))}
            </>
          }
        />
      </Typography>
      <Container maxWidth="sm" style={{ marginTop: "2rem", fontSize: "0.8rem", padding: 0 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CoronaCases onGetInfected={handleChangeKnownInfected} />
          </Grid>
          <Grid item xs={8}>
            {i18next.t(`${i18nPrefix}.calc.infected_known`)}
          </Grid>
          <Grid item xs={4}>
            <ValidatedInputField value={calc.knownInfected} onChange={handleChangeKnownInfected} />
          </Grid>
          <Grid item xs={8}>
            {i18next.t(`${i18nPrefix}.calc.dark_figure`)}
          </Grid>
          <Grid item xs={4}>
            <ValidatedInputField value={calc.darkFigure} onChange={handleChangeDarkFigure} />
          </Grid>
          <Grid item xs={8}>
            {i18next.t(`${i18nPrefix}.calc.infected_actual`)}
          </Grid>
          <Grid item xs={4}>
            {getRoundedValue(calc.actualInfected, 0)}
          </Grid>
          <Grid item xs={8}>
            {i18next.t(`${i18nPrefix}.calc.infected_unknown`)}
          </Grid>
          <Grid item xs={4}>
            {getRoundedValue(calc.unknownInfected, 0)}
          </Grid>
          <Grid item xs={8}>
            {i18next.t(`${i18nPrefix}.calc.inhabitants`)}
          </Grid>
          <Grid item xs={4}>
            <ValidatedInputField value={calc.inhabitants} onChange={handleChangeInhabitants} />
          </Grid>
          <Grid item xs={8}>
            {i18next.t(`${i18nPrefix}.calc.potential_infected`)}
          </Grid>
          <Grid item xs={4}>
            {getRoundedValue(calc.probabilityInfection * 100, 2)}%
          </Grid>
          <Grid item xs={8}>
            {i18next.t(`${i18nPrefix}.calc.people_meet`)}
          </Grid>
          <Grid item xs={4}>
            <ValidatedInputField value={calc.peopleToMeet} onChange={handleChangePeopleToMeet} />
          </Grid>
          <Grid item xs={8}>
            {i18next.t(`${i18nPrefix}.calc.injection_duration`)}
          </Grid>
          <Grid item xs={4}>
            <ValidatedInputField value={calc.injectionDuration} onChange={handleChangeInjectionDuration} />
          </Grid>
          <Grid item xs={8}>
            {i18next.t(`${i18nPrefix}.calc.infection_risk`)}
          </Grid>
          <Grid item xs={4}>
            <b>{getRoundedValue(calc.ownRisk, 2)}%</b> {calc.ownRisk > 100 && `(100%)`}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

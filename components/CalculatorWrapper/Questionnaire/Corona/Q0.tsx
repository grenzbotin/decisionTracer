import React, { useContext, useEffect, useState } from "react";
import { Divider, Grid, Typography, Container } from "@material-ui/core";
import i18next from "i18next";
import CustomTooltip from "@/../components/elements/CustomTooltip";
import ValidatedInputField from "@/../components/elements/ValidatedInputField";
import { getRoundedValue } from "@/../lib/helpers";
import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { Decision } from "@/../lib/presets";
import { useFirstRender } from "@/../hooks/helpers";

const getProbabilityNonVac = (decisions: Decision[]): number => {
  const decision = decisions.find((item) => item.key === "main-0") || null;
  if (decision) {
    const decisionSub = decision.sub.find((i) => i.key === "main-0-sub-1") || null;
    if (decisionSub) {
      return decisionSub.probability;
    }
  }
  return null;
};

const getProbabilityVac = (decisions: Decision[]): number => {
  const decision = decisions.find((item) => item.key === "main-1") || null;
  if (decision) {
    const decisionSub = decision.sub.find((i) => i.key === "main-1-sub-1") || null;
    if (decisionSub) {
      return decisionSub.probability;
    }
  }
  return null;
};

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
    ownRisk: getProbabilityNonVac(active.decisions) || 0
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
    const contextNonVacProbability = getProbabilityNonVac(active.decisions);
    const contextVacProbability = getProbabilityVac(active.decisions);
    if (contextNonVacProbability !== null && calc.ownRisk !== contextNonVacProbability) {
      setProbability(calc.ownRisk, "main-0", "main-0-sub-1");
    }
    if (contextVacProbability !== null && calc.ownRisk !== contextVacProbability) {
      setProbability(calc.ownRisk, "main-1", "main-1-sub-1");
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
      <Typography variant="body2">{i18next.t(`${i18nPrefix}.intro`)}</Typography>
      <Divider style={{ margin: "1.5rem 0" }} />
      <Typography variant="h6" gutterBottom>
        1. {i18next.t(`${i18nPrefix}.title`)}
      </Typography>
      <Typography variant="caption" style={{ display: "flex", alignItems: "center" }}>
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
      <Container maxWidth="sm" style={{ marginTop: "2rem", fontSize: ".8rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={8} style={{ textAlign: "right" }}>
            {i18next.t(`${i18nPrefix}.calc.infected_known`)}
          </Grid>
          <Grid item xs={4}>
            <ValidatedInputField value={calc.knownInfected} onChange={handleChangeKnownInfected} />
          </Grid>
          <Grid item xs={8} style={{ textAlign: "right" }}>
            {i18next.t(`${i18nPrefix}.calc.dark_figure`)}
          </Grid>
          <Grid item xs={4}>
            <ValidatedInputField value={calc.darkFigure} onChange={handleChangeDarkFigure} />
          </Grid>
          <Grid item xs={8} style={{ textAlign: "right" }}>
            {i18next.t(`${i18nPrefix}.calc.infected_actual`)}
          </Grid>
          <Grid item xs={4}>
            {calc.actualInfected}
          </Grid>
          <Grid item xs={8} style={{ textAlign: "right" }}>
            {i18next.t(`${i18nPrefix}.calc.infected_unknown`)}
          </Grid>
          <Grid item xs={4}>
            {calc.unknownInfected}
          </Grid>
          <Grid item xs={8} style={{ textAlign: "right" }}>
            {i18next.t(`${i18nPrefix}.calc.inhabitants`)}
          </Grid>
          <Grid item xs={4}>
            <ValidatedInputField value={calc.inhabitants} onChange={handleChangeInhabitants} />
          </Grid>
          <Grid item xs={8} style={{ textAlign: "right" }}>
            {i18next.t(`${i18nPrefix}.calc.potential_infected`)}
          </Grid>
          <Grid item xs={4}>
            {getRoundedValue(calc.probabilityInfection * 100, 2)}%
          </Grid>
          <Grid item xs={8} style={{ textAlign: "right" }}>
            {i18next.t(`${i18nPrefix}.calc.people_meet`)}
          </Grid>
          <Grid item xs={4}>
            <ValidatedInputField value={calc.peopleToMeet} onChange={handleChangePeopleToMeet} />
          </Grid>
          <Grid item xs={8} style={{ textAlign: "right" }}>
            {i18next.t(`${i18nPrefix}.calc.injection_duration`)}
          </Grid>
          <Grid item xs={4}>
            <ValidatedInputField value={calc.injectionDuration} onChange={handleChangeInjectionDuration} />
          </Grid>
          <Grid item xs={8} style={{ textAlign: "right" }}>
            {i18next.t(`${i18nPrefix}.calc.infection_risk`)}
          </Grid>
          <Grid item xs={4}>
            <b>{getRoundedValue(calc.ownRisk, 2)}%</b>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

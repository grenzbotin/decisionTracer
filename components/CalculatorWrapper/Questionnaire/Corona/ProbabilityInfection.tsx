import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography, Container, Button } from "@material-ui/core";
import i18next from "i18next";

import CustomTooltip from "@/../components/elements/CustomTooltip";
import ValidatedInputField from "@/../components/elements/ValidatedInputField";
import { applyFormatting, getPresetValueByField, getRoundedValue } from "@/../lib/helpers";
import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import CoronaCases from "./CoronaCases";
import { CoronaPresetContext } from "./CoronaPresetContextProvider";

export default function ProbabilityInfection({ handleClose }: { handleClose?: () => void }): JSX.Element {
  const i18nPrefix = "presets.corona.questionnaire.0";
  const { active, setProbabilityByKey } = useContext(GlobalDecisionContext);
  const { q0, setValuesByStep } = useContext(CoronaPresetContext);

  const [tasks, setTasks] = useState([]);
  const [shouldClose, setShouldClose] = useState(false);

  const [ownRisk, setOwnRisk] = useState(
    q0.knownInfected * q0.darkFigure - q0.knownInfected > 0
      ? q0.peopleToMeet *
          q0.injectionDuration *
          ((q0.knownInfected * q0.darkFigure - q0.knownInfected) / q0.inhabitants) *
          100
      : 0
  );

  useEffect(() => {
    // Ensure to change one by one
    if (tasks.length > 0) {
      setProbabilityByKey(tasks[0][0], tasks[0][1], tasks[0][2]).then(
        (val: boolean) => val && setTasks((tasks) => tasks.slice(1))
      );
    } else {
      if (handleClose && shouldClose) {
        handleClose();
      }
    }
  }, [tasks, setProbabilityByKey, handleClose, shouldClose]);

  const handleSave = (): void => {
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

    const compareValue = ownRisk > 100 ? 100 : ownRisk;
    const selectedTasks = [];

    if (contextNonVacProbability !== null && compareValue !== contextNonVacProbability) {
      selectedTasks.push([compareValue, "unvaccinated", `unvaccinated-infection`]);
    }

    if (contextVacProbability !== null && compareValue !== contextVacProbability) {
      selectedTasks.push([compareValue, "vaccinated", `vaccinated-infection`]);
    }

    setTasks(selectedTasks);
    setShouldClose(true);
  };

  const handleChangeKnownInfected = (value: number): void => {
    // calc in form
    const actualInfected = value * q0.darkFigure;
    const unknownInfected = actualInfected - value;

    const newValues = {
      ...q0,
      knownInfected: value
    };

    setOwnRisk(
      unknownInfected > 0 ? q0.peopleToMeet * q0.injectionDuration * (unknownInfected / q0.inhabitants) * 100 : 0
    );

    setValuesByStep(newValues, "q0");
  };

  const handleChangeDarkFigure = (value: number): void => {
    const actualInfected = q0.knownInfected * value;
    const unknownInfected = actualInfected - q0.knownInfected;

    const newValues = {
      ...q0,
      darkFigure: value
    };

    setOwnRisk(
      unknownInfected > 0 ? q0.peopleToMeet * q0.injectionDuration * (unknownInfected / q0.inhabitants) * 100 : 0
    );

    setValuesByStep(newValues, "q0");
  };

  const handleChangeInhabitants = (value: number): void => {
    const actualInfected = q0.knownInfected * q0.darkFigure;
    const unknownInfected = actualInfected - q0.knownInfected;

    const newValues = {
      ...q0,
      inhabitants: value
    };

    setOwnRisk(unknownInfected > 0 ? q0.peopleToMeet * q0.injectionDuration * (unknownInfected / value) * 100 : 0);

    setValuesByStep(newValues, "q0");
  };

  const handleChangePeopleToMeet = (value: number): void => {
    const actualInfected = q0.knownInfected * q0.darkFigure;
    const unknownInfected = actualInfected - value;
    const probability = unknownInfected / q0.inhabitants;

    const newValues = {
      ...q0,
      peopleToMeet: value
    };

    setOwnRisk(value * q0.injectionDuration * probability * 100);
    setValuesByStep(newValues, "q0");
  };

  const handleChangeInjectionDuration = (value: number): void => {
    const actualInfected = q0.knownInfected * q0.darkFigure;
    const unknownInfected = actualInfected - value;
    const probability = unknownInfected / q0.inhabitants;

    const newValues = {
      ...q0,
      injectionDuration: value
    };

    setOwnRisk(q0.peopleToMeet * value * probability * 100);
    setValuesByStep(newValues, "q0");
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {i18next.t(`${i18nPrefix}.title`)}
      </Typography>
      <Typography variant="body2" style={{ display: "flex", alignItems: "center" }}>
        {applyFormatting(i18next.t(`${i18nPrefix}.subtitle`))}
        <CustomTooltip
          content={
            <>
              {i18next
                .t(`${i18nPrefix}.tooltip`)
                .split("\n")
                .map((c) => (
                  <Typography key={c} variant="caption" component="p" style={{ marginBottom: ".4rem" }}>
                    {applyFormatting(c)}
                  </Typography>
                ))}
            </>
          }
        />
      </Typography>
      <Container maxWidth="md" style={{ marginTop: "2rem", fontSize: "0.8rem", padding: 0 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CoronaCases onGetInfected={handleChangeKnownInfected} />
          </Grid>
          <Grid item xs={8}>
            {applyFormatting(i18next.t(`${i18nPrefix}.calc.infected_known`))}
          </Grid>
          <Grid item xs={4}>
            <ValidatedInputField value={q0.knownInfected} onChange={handleChangeKnownInfected} />
          </Grid>
          <Grid item xs={8}>
            {applyFormatting(i18next.t(`${i18nPrefix}.calc.dark_figure`))}
          </Grid>
          <Grid item xs={4}>
            <ValidatedInputField value={q0.darkFigure} onChange={handleChangeDarkFigure} />
          </Grid>
          <Grid item xs={8}>
            {applyFormatting(i18next.t(`${i18nPrefix}.calc.infected_actual`))}
          </Grid>
          <Grid item xs={4}>
            {getRoundedValue(q0.knownInfected * q0.darkFigure, 0)}
          </Grid>
          <Grid item xs={8}>
            {applyFormatting(i18next.t(`${i18nPrefix}.calc.infected_unknown`))}
          </Grid>
          <Grid item xs={4}>
            {getRoundedValue(q0.knownInfected * q0.darkFigure - q0.knownInfected, 0)}
          </Grid>
          <Grid item xs={8}>
            {applyFormatting(i18next.t(`${i18nPrefix}.calc.inhabitants`))}
          </Grid>
          <Grid item xs={4}>
            <ValidatedInputField value={q0.inhabitants} onChange={handleChangeInhabitants} />
          </Grid>
          <Grid item xs={8}>
            {applyFormatting(i18next.t(`${i18nPrefix}.calc.potential_infected`))}
          </Grid>
          <Grid item xs={4}>
            {getRoundedValue(((q0.knownInfected * q0.darkFigure - q0.knownInfected) / q0.inhabitants) * 100, 2)}%
          </Grid>
          <Grid item xs={8}>
            {applyFormatting(i18next.t(`${i18nPrefix}.calc.people_meet`))}
          </Grid>
          <Grid item xs={4}>
            <ValidatedInputField value={q0.peopleToMeet} onChange={handleChangePeopleToMeet} />
          </Grid>
          <Grid item xs={8}>
            {applyFormatting(i18next.t(`${i18nPrefix}.calc.injection_duration`))}
          </Grid>
          <Grid item xs={4}>
            <ValidatedInputField value={q0.injectionDuration} onChange={handleChangeInjectionDuration} />
          </Grid>
          <Grid item xs={8}>
            {applyFormatting(i18next.t(`${i18nPrefix}.calc.infection_risk`))}
          </Grid>
          <Grid item xs={4}>
            <b>{getRoundedValue(ownRisk, 2)}%</b> {ownRisk > 100 && `(100%)`}
          </Grid>
          <Grid item style={{ marginTop: "2rem", textAlign: "center" }} xs={12}>
            <Button color="primary" variant="contained" onClick={handleSave}>
              {i18next.t("presets.corona.save")}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

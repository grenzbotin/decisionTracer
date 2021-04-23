import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Divider, Grid, Typography } from "@material-ui/core";
import i18next from "i18next";

import CustomTooltip from "@/../components/elements/CustomTooltip";
import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import ValidatedInputField from "@/../components/elements/ValidatedInputField";
import { applyFormatting, getPresetValueByField, getRoundedValue } from "@/../lib/helpers";
import ValidatedValueField from "@/../components/elements/ValidatedValueField";
import { CoronaPresetContext } from "./CoronaPresetContextProvider";

const getInterpretationValues = (
  {
    mild_day_value,
    hospitalised_day_value,
    "severely-hospitalised_day_value": severelyhospitalised_dayValue
  }: { mild_day_value: number; hospitalised_day_value: number; "severely-hospitalised_day_value": number },
  deathValue: number,
  type: "mild" | "hospitalised" | "severely-hospitalised"
): { years: number; days: string } => {
  const value =
    type === "mild" ? mild_day_value : type === "hospitalised" ? hospitalised_day_value : severelyhospitalised_dayValue;

  const totalDays = deathValue / value;
  const years = Math.trunc(totalDays / 365);
  const days = getRoundedValue(totalDays - years * 365, 1);

  return { years, days };
};

export default function ValuesProgression({ handleClose }: { handleClose?: () => void }): JSX.Element {
  const i18nPrefix = "presets.corona.questionnaire.3";
  const { active, setValue } = useContext(GlobalDecisionContext);
  const { q3, setValuesByStep } = useContext(CoronaPresetContext);
  const [tasks, setTasks] = useState([]);
  const [shouldClose, setShouldClose] = useState(false);

  const [deathValue, setDeathValue] = useState(
    getPresetValueByField(
      active.decisions,
      "value",
      "vaccinated",
      "vaccinated-infection",
      "vaccinated-infection-death"
    ) ||
      getPresetValueByField(
        active.decisions,
        "value",
        "unvaccinated",
        "unvaccinated-infection",
        "unvaccinated-infection-death"
      ) ||
      0
  );

  useEffect(() => {
    if (handleClose && shouldClose) {
      // Ensure to change one by one
      if (tasks.length > 0) {
        if (getPresetValueByField(active.decisions, "value", tasks[0][1], tasks[0][2], tasks[0][3])) {
          setValue(tasks[0][0], tasks[0][1], tasks[0][2], tasks[0][3]).then(
            (val: boolean) => val && setTasks((tasks) => tasks.slice(1))
          );
        } else {
          tasks.slice(1);
        }
      } else {
        handleClose();
      }
    }
  }, [tasks, setValue, handleClose, shouldClose, active]);

  const handleSave = (): void => {
    const deathValueToSet = deathValue > 100 ? 100 : deathValue;
    // setup tasks
    const tasks: Array<Array<string | number | number[]>> = [
      [
        q3.mild_day_value * q3.mild_days_duration,
        "unvaccinated",
        "unvaccinated-infection",
        "unvaccinated-infection-mild"
      ],
      [
        q3.hospitalised_day_value * q3.hospitalised_days_duration,
        "unvaccinated",
        "unvaccinated-infection",
        "unvaccinated-infection-hospitalised"
      ],
      [
        q3["severely-hospitalised_day_value"] * q3["severely-hospitalised_days_duration"],
        "unvaccinated",
        "unvaccinated-infection",
        "unvaccinated-infection-severely-hospitalised"
      ],
      [deathValueToSet, "unvaccinated", "unvaccinated-infection", "unvaccinated-infection-death"],
      [q3.mild_day_value * q3.mild_days_duration, "vaccinated", "vaccinated-infection", "vaccinated-infection-mild"],
      [
        q3.hospitalised_day_value * q3.hospitalised_days_duration,
        "vaccinated",
        "vaccinated-infection",
        "vaccinated-infection-hospitalised"
      ],
      [
        q3["severely-hospitalised_day_value"] * q3["severely-hospitalised_days_duration"],
        "vaccinated",
        "vaccinated-infection",
        "vaccinated-infection-severely-hospitalised"
      ],
      [deathValueToSet, "vaccinated", "vaccinated-infection", "vaccinated-infection-death"]
    ];

    setTasks(tasks);
    setShouldClose(true);
  };

  const handleChange = (
    value: number,
    category: "mild" | "hospitalised" | "severely-hospitalised" | "death",
    item?: string
  ): void => {
    let newValues = { ...q3 };

    if (category !== "death") {
      newValues = {
        ...q3,
        [`${category}_${item}`]: value
      };
      setValuesByStep(newValues, "q3");
    } else {
      setDeathValue(value);
    }

    if (!handleClose) {
      const valueToSet =
        category === "death" ? value : newValues[`${category}_day_value`] * newValues[`${category}_days_duration`];

      const vaccinatedValue = getPresetValueByField(
        active.decisions,
        "value",
        "vaccinated",
        "vaccinated-infection",
        `vaccinated-infection-${category}`
      );

      if (vaccinatedValue !== null && vaccinatedValue !== valueToSet) {
        setValue(valueToSet, "vaccinated", "vaccinated-infection", `vaccinated-infection-${category}`);
      }

      const unvaccinatedValue = getPresetValueByField(
        active.decisions,
        "value",
        "unvaccinated",
        "unvaccinated-infection",
        `unvaccinated-infection-${category}`
      );

      if (unvaccinatedValue !== null && unvaccinatedValue !== valueToSet) {
        setValue(valueToSet, "unvaccinated", "unvaccinated-infection", `unvaccinated-infection-${category}`);
      }
    }
  };

  const interpretation = {
    mild: getInterpretationValues(q3, deathValue, "mild"),
    hospitalised: getInterpretationValues(q3, deathValue, "hospitalised"),
    "severely-hospitalised": getInterpretationValues(q3, deathValue, "severely-hospitalised")
  };

  const current = {
    mild:
      getPresetValueByField(
        active.decisions,
        "value",
        "vaccinated",
        "vaccinated-infection",
        "vaccinated-infection-mild"
      ) ||
      getPresetValueByField(
        active.decisions,
        "value",
        "unvaccinated",
        "unvaccinated-infection",
        "unvaccinated-infection-mild"
      ),
    hospitalised:
      getPresetValueByField(
        active.decisions,
        "value",
        "vaccinated",
        "vaccinated-infection",
        "vaccinated-infection-hospitalised"
      ) ||
      getPresetValueByField(
        active.decisions,
        "value",
        "unvaccinated",
        "unvaccinated-infection",
        "unvaccinated-infection-hospitalised"
      ),
    "severely-hospitalised":
      getPresetValueByField(
        active.decisions,
        "value",
        "vaccinated",
        "vaccinated-infection",
        "vaccinated-infection-severely-hospitalised"
      ) ||
      getPresetValueByField(
        active.decisions,
        "value",
        "unvaccinated",
        "unvaccinated-infection",
        "unvaccinated-infection-severely-hospitalised"
      )
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {i18next.t(`${i18nPrefix}.title`)}
      </Typography>
      {i18next
        .t(`${i18nPrefix}.subtitle`)
        .split("\n")
        .map((c) => (
          <Typography key={c} variant="body1" component="p" style={{ marginBottom: ".4rem" }}>
            {applyFormatting(c)}
          </Typography>
        ))}
      <Typography variant="body1">
        {i18next.t(`${i18nPrefix}.tooltipText`)}{" "}
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
      <Container maxWidth="md" style={{ marginTop: "3rem", padding: 0 }}>
        <Grid container spacing={2} style={{ fontSize: "0.8rem" }}>
          <Grid item xs={8}>
            {i18next.t(`${i18nPrefix}.calc.day_mild_value`)}
          </Grid>
          <Grid item xs={4}>
            <ValidatedValueField
              value={q3.mild_day_value}
              onChange={(value) => handleChange(value, "mild", "day_value")}
            />
          </Grid>
          <Grid item xs={8}>
            {applyFormatting(i18next.t(`${i18nPrefix}.calc.days_duration_mild`))}
          </Grid>
          <Grid item xs={4}>
            <ValidatedInputField
              value={q3.mild_days_duration}
              onChange={(value) => handleChange(value, "mild", "days_duration")}
            />
          </Grid>
          <Grid item xs={8}>
            {applyFormatting(i18next.t(`${i18nPrefix}.calc.current_value_mild`))}
          </Grid>
          <Grid item xs={4}>
            {q3.mild_day_value * q3.mild_days_duration}
            {!current.mild && (
              <>
                {" "}
                <CustomTooltip
                  alert
                  content={
                    <Typography variant="caption">
                      {applyFormatting(i18next.t(`${i18nPrefix}.calc.tooltip_no_value`))}
                    </Typography>
                  }
                />
              </>
            )}
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={8}>
            {applyFormatting(i18next.t(`${i18nPrefix}.calc.day_hospitalised_value`))}
          </Grid>
          <Grid item xs={4}>
            <ValidatedValueField
              value={q3.hospitalised_day_value}
              onChange={(value) => handleChange(value, "hospitalised", "day_value")}
            />
          </Grid>
          <Grid item xs={8}>
            {applyFormatting(i18next.t(`${i18nPrefix}.calc.days_duration_hospitalised`))}
            <CustomTooltip
              content={
                <>
                  {i18next
                    .t(`${i18nPrefix}.calc.tooltip_days_duration_hospitalised`)
                    .split("\n")
                    .map((c) => (
                      <Typography key={c} variant="caption" component="p" style={{ marginBottom: ".4rem" }}>
                        {applyFormatting(c)}
                      </Typography>
                    ))}
                </>
              }
              style={{ marginLeft: ".5rem" }}
            />
          </Grid>
          <Grid item xs={4}>
            <ValidatedInputField
              value={q3.hospitalised_days_duration}
              onChange={(value) => handleChange(value, "hospitalised", "days_duration")}
            />
          </Grid>
          <Grid item xs={8}>
            {applyFormatting(i18next.t(`${i18nPrefix}.calc.current_value_hospitalised`))}
          </Grid>
          <Grid item xs={4}>
            {q3.hospitalised_day_value * q3.hospitalised_days_duration}
            {!current.hospitalised && (
              <>
                {" "}
                <CustomTooltip
                  alert
                  content={
                    <Typography variant="caption">
                      {applyFormatting(i18next.t(`${i18nPrefix}.calc.tooltip_no_value`))}
                    </Typography>
                  }
                />
              </>
            )}
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={8}>
            {applyFormatting(i18next.t(`${i18nPrefix}.calc.day_severely-hospitalised_value`))}
          </Grid>
          <Grid item xs={4}>
            <ValidatedValueField
              value={q3["severely-hospitalised_day_value"]}
              onChange={(value) => handleChange(value, "severely-hospitalised", "day_value")}
            />
          </Grid>
          <Grid item xs={8}>
            {applyFormatting(i18next.t(`${i18nPrefix}.calc.days_duration_hospitalised`))}
            <CustomTooltip
              content={
                <>
                  {i18next
                    .t(`${i18nPrefix}.calc.tooltip_days_duration_hospitalised`)
                    .split("\n")
                    .map((c) => (
                      <Typography key={c} variant="caption" component="p" style={{ marginBottom: ".4rem" }}>
                        {applyFormatting(c)}
                      </Typography>
                    ))}
                </>
              }
              style={{ marginLeft: ".5rem" }}
            />
          </Grid>
          <Grid item xs={4}>
            <ValidatedInputField
              value={q3["severely-hospitalised_days_duration"]}
              onChange={(value) => handleChange(value, "severely-hospitalised", "days_duration")}
            />
          </Grid>
          <Grid item xs={8}>
            {applyFormatting(i18next.t(`${i18nPrefix}.calc.current_value_severely-hospitalised`))}
          </Grid>
          <Grid item xs={4}>
            {q3["severely-hospitalised_day_value"] * q3["severely-hospitalised_days_duration"]}
            {!current["severely-hospitalised"] && (
              <>
                {" "}
                <CustomTooltip
                  alert
                  content={
                    <Typography variant="caption">
                      {applyFormatting(i18next.t(`${i18nPrefix}.calc.tooltip_no_value`))}
                    </Typography>
                  }
                />
              </>
            )}
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={8}>
            {applyFormatting(i18next.t(`${i18nPrefix}.calc.death_value`))}
          </Grid>
          <Grid item xs={4}>
            <ValidatedValueField
              disabled={deathValue === null}
              value={deathValue !== null ? deathValue : 0}
              onChange={(value) => handleChange(value, "death")}
            />
            {deathValue === null && (
              <CustomTooltip
                alert
                content={
                  <Typography variant="caption">
                    {applyFormatting(i18next.t(`${i18nPrefix}.calc.tooltip_no_value`))}
                  </Typography>
                }
              />
            )}
          </Grid>
        </Grid>
        <Typography variant="subtitle2" gutterBottom style={{ marginTop: "3rem" }}>
          {i18next.t(`${i18nPrefix}.interpretation`)}
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          {applyFormatting(
            i18next.t(`${i18nPrefix}.interpretation_mild`, {
              years: interpretation.mild.years,
              days: interpretation.mild.days
            })
          )}
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          {applyFormatting(
            i18next.t(`${i18nPrefix}.interpretation_hospitalised`, {
              years: interpretation.hospitalised.years,
              days: interpretation.hospitalised.days
            })
          )}
        </Typography>
        <Typography variant="body2" component="p">
          {applyFormatting(
            i18next.t(`${i18nPrefix}.interpretation_severely-hospitalised`, {
              years: interpretation["severely-hospitalised"].years,
              days: interpretation["severely-hospitalised"].days
            })
          )}
        </Typography>
        {handleClose && (
          <Grid container>
            <Grid item style={{ marginTop: "2rem", textAlign: "center" }} xs={12}>
              <Button color="primary" variant="contained" onClick={handleSave}>
                {i18next.t("presets.corona.save")}
              </Button>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}

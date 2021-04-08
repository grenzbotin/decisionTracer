import React, { useContext, useState } from "react";
import { Container, Divider, Grid, Typography } from "@material-ui/core";
import i18next from "i18next";

import CustomTooltip from "@/../components/elements/CustomTooltip";
import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import ValidatedInputField from "@/../components/elements/ValidatedInputField";
import { getPresetValueByField, getRoundedValue } from "@/../lib/helpers";
import ValidatedValueField from "@/../components/elements/ValidatedValueField";

const getInterpretationValues = (
  calc: { mild: { day_value: number }; difficult: { day_value: number }; death: { value: number } },
  type: "mild" | "difficult"
): { years: number; days: string } => {
  const totalDays = calc.death.value / calc[type].day_value;
  const years = Math.trunc(totalDays / 365);
  const days = getRoundedValue(totalDays - years * 365, 1);

  return { years, days };
};

export default function Q3(): JSX.Element {
  const i18nPrefix = "presets.corona.questionnaire.3";
  const { active, setValue } = useContext(GlobalDecisionContext);

  // Taking default values from current active context
  const [calc, setCalc] = useState({
    mild: {
      day_value: -1,
      days_duration: 14
    },
    difficult: {
      day_value: -5,
      days_duration: 40
    },
    death: {
      value:
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
        )
    }
  });

  const handleChange = (value: number, category: "mild" | "difficult" | "death", item: string): void => {
    const newValues = {
      ...calc,
      [category]: {
        ...calc[category],
        [item]: value
      }
    };
    setCalc({ ...newValues });

    const valueToSet =
      category === "death"
        ? newValues[category].value
        : newValues[category].day_value * newValues[category].days_duration;

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
  };

  const interpretation = {
    mild: getInterpretationValues(calc, "mild"),
    difficult: getInterpretationValues(calc, "difficult")
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
    difficult:
      getPresetValueByField(
        active.decisions,
        "value",
        "vaccinated",
        "vaccinated-infection",
        "vaccinated-infection-difficult"
      ) ||
      getPresetValueByField(
        active.decisions,
        "value",
        "unvaccinated",
        "unvaccinated-infection",
        "unvaccinated-infection-difficult"
      )
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        4. {i18next.t(`${i18nPrefix}.title`)}
      </Typography>
      {i18next
        .t(`${i18nPrefix}.subtitle`)
        .split("\n")
        .map((c) => (
          <Typography key={c} variant="body2" component="p" style={{ marginBottom: ".4rem" }}>
            {c}
          </Typography>
        ))}
      <Typography variant="body2">
        {i18next.t(`${i18nPrefix}.tooltipText`)}{" "}
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
      <Container maxWidth="sm" style={{ marginTop: "3rem", padding: 0 }}>
        <Grid container spacing={2} style={{ fontSize: "0.8rem" }}>
          <Grid item xs={8}>
            {i18next.t(`${i18nPrefix}.calc.day_mild_value`)}
          </Grid>
          <Grid item xs={4}>
            <ValidatedValueField
              value={calc.mild.day_value}
              onChange={(value) => handleChange(value, "mild", "day_value")}
            />
          </Grid>
          <Grid item xs={8}>
            {i18next.t(`${i18nPrefix}.calc.days_duration_mild`)}
          </Grid>
          <Grid item xs={4}>
            <ValidatedInputField
              value={calc.mild.days_duration}
              onChange={(value) => handleChange(value, "mild", "days_duration")}
            />
          </Grid>
          <Grid item xs={8}>
            {i18next.t(`${i18nPrefix}.calc.current_value_mild`)}
          </Grid>
          <Grid item xs={4}>
            {current.mild ? (
              current.mild
            ) : (
              <>
                {i18next.t(`${i18nPrefix}.calc.no_value`)}{" "}
                <CustomTooltip
                  content={
                    <Typography variant="caption">{i18next.t(`${i18nPrefix}.calc.tooltip_no_value`)}</Typography>
                  }
                />
              </>
            )}
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={8}>
            {i18next.t(`${i18nPrefix}.calc.day_difficult_value`)}
          </Grid>
          <Grid item xs={4}>
            <ValidatedValueField
              value={calc.difficult.day_value}
              onChange={(value) => handleChange(value, "difficult", "day_value")}
            />
          </Grid>
          <Grid item xs={8}>
            {i18next.t(`${i18nPrefix}.calc.days_duration_difficult`)}
          </Grid>
          <Grid item xs={4}>
            <ValidatedInputField
              value={calc.difficult.days_duration}
              onChange={(value) => handleChange(value, "difficult", "days_duration")}
            />
          </Grid>
          <Grid item xs={8}>
            {i18next.t(`${i18nPrefix}.calc.current_value_difficult`)}
          </Grid>
          <Grid item xs={4}>
            {current.difficult ? (
              current.difficult
            ) : (
              <>
                {i18next.t(`${i18nPrefix}.calc.no_value`)}{" "}
                <CustomTooltip
                  content={
                    <Typography variant="caption">{i18next.t(`${i18nPrefix}.calc.tooltip_no_value`)}</Typography>
                  }
                />
              </>
            )}
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={8}>
            {i18next.t(`${i18nPrefix}.calc.death_value`)}
          </Grid>
          <Grid item xs={4}>
            <ValidatedValueField
              disabled={calc.death.value === null}
              value={calc.death.value !== null ? calc.death.value : 0}
              onChange={(value) => handleChange(value, "death", "value")}
            />
            {calc.death.value === null && (
              <CustomTooltip
                content={<Typography variant="caption">{i18next.t(`${i18nPrefix}.calc.tooltip_no_value`)}</Typography>}
              />
            )}
          </Grid>
        </Grid>
        <Typography variant="subtitle2" gutterBottom style={{ marginTop: "3rem" }}>
          {i18next.t(`${i18nPrefix}.interpretation`)}
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          {i18next.t(`${i18nPrefix}.interpretation_mild`, {
            years: interpretation.mild.years,
            days: interpretation.mild.days
          })}
        </Typography>
        <Typography variant="body2" component="p">
          {i18next.t(`${i18nPrefix}.interpretation_difficult`, {
            years: interpretation.difficult.years,
            days: interpretation.difficult.days
          })}
        </Typography>
      </Container>
    </>
  );
}

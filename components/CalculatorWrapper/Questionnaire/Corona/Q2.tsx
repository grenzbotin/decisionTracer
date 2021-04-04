import React, { useContext, useState } from "react";
import { Grid, Typography, Container, IconButton } from "@material-ui/core";
import i18next from "i18next";
import FileCopyIcon from "@material-ui/icons/FileCopy";

import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { getPresetValueByField, getRoundedValue } from "@/../lib/helpers";
import ValidatedInputField from "@/../components/elements/ValidatedInputField";
import ValidatedProbabilityField from "@/../components/elements/ValidatedProbabilityField";
import CustomTooltip from "@/../components/elements/CustomTooltip";

export default function Q2(): JSX.Element {
  const i18nPrefix = "presets.corona.questionnaire.2";
  const { active, setProbability } = useContext(GlobalDecisionContext);

  // Taking default values from current active context
  const [calc, setCalc] = useState({
    vaccination_damage: getPresetValueByField(
      active.decisions,
      "probability",
      "vaccinated",
      "vaccinated-vaccination_damage"
    ),
    deaths: {
      amount: 73500,
      infected: 2833173
    },
    damage: {
      amount: 31,
      vaccinated: 2847585
    }
  });

  const handleChange = (value: number, category: "deaths" | "damage", item: string): void => {
    setCalc({
      ...calc,
      [category]: {
        ...calc[category],
        [item]: value
      }
    });
  };

  const handleVaccinationDamageChange = (value: number): void => {
    setCalc({
      ...calc,
      vaccination_damage: value
    });

    if (
      getPresetValueByField(active.decisions, "probability", "vaccinated", "vaccinated-vaccination_damage") !== null
    ) {
      const valueToSet = value > 100 ? 100 : value;
      setProbability(valueToSet, "vaccinated", "vaccinated-vaccination_damage");
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        3. {i18next.t(`${i18nPrefix}.title`)}
      </Typography>
      <Typography variant="caption">{i18next.t(`${i18nPrefix}.subtitle`)}</Typography>
      <Container maxWidth="sm" style={{ marginTop: "2rem", fontSize: "0.875rem", padding: 0 }}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            {i18next.t(`${i18nPrefix}.calc.death_title`)}
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={5}>
            {i18next.t(`${i18nPrefix}.calc.damage_title`)}
          </Grid>
          <Grid item xs={5}>
            <ValidatedInputField
              label={i18next.t(`${i18nPrefix}.calc.dead`)}
              value={calc.deaths.amount}
              onChange={(value) => handleChange(value, "deaths", "amount")}
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={5}>
            <ValidatedInputField
              label={i18next.t(`${i18nPrefix}.calc.cvt`)}
              value={calc.damage.amount}
              onChange={(value) => handleChange(value, "damage", "amount")}
            />
          </Grid>
          <Grid item xs={5}>
            {i18next.t(`${i18nPrefix}.calc.in`)}
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={5}>
            {i18next.t(`${i18nPrefix}.calc.in`)}
          </Grid>
          <Grid item xs={5}>
            <ValidatedInputField
              label={i18next.t(`${i18nPrefix}.calc.infected`)}
              value={calc.deaths.infected}
              onChange={(value) => handleChange(value, "deaths", "infected")}
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={5}>
            <ValidatedInputField
              label={i18next.t(`${i18nPrefix}.calc.vaccinated`)}
              value={calc.damage.vaccinated}
              onChange={(value) => handleChange(value, "damage", "vaccinated")}
            />
          </Grid>
          <Grid item xs={5}>
            <b>
              {calc.deaths.infected > 0 ? getRoundedValue((calc.deaths.amount / calc.deaths.infected) * 100, 5) : 0} %
            </b>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={5}>
            <b>
              {calc.damage.vaccinated > 0 ? getRoundedValue((calc.damage.amount / calc.damage.vaccinated) * 100, 5) : 0}
              %
            </b>
            <IconButton
              color="primary"
              disabled={calc.vaccination_damage === null}
              size="small"
              onClick={() => handleVaccinationDamageChange((calc.damage.amount / calc.damage.vaccinated) * 100)}
              style={{ marginLeft: ".5rem" }}
            >
              <FileCopyIcon fontSize="small" />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              {i18next.t(`${i18nPrefix}.interpretation`)}
            </Typography>
            {i18next.t(`${i18nPrefix}.interpretation_text`, {
              value: getRoundedValue(
                calc.deaths.amount / calc.deaths.infected / (calc.damage.amount / calc.damage.vaccinated),
                2
              )
            })}
          </Grid>
        </Grid>
        <Typography variant="subtitle2" gutterBottom style={{ marginTop: "2rem" }}>
          {i18next.t(`${i18nPrefix}.0`)}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            {i18next.t(`${i18nPrefix}.damage_probability`)}
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={5}>
            <ValidatedProbabilityField
              disabled={calc.vaccination_damage === null}
              value={calc.vaccination_damage === null ? 0 : calc.vaccination_damage}
              onChange={handleVaccinationDamageChange}
            />
            {calc.vaccination_damage === null && (
              <CustomTooltip
                content={<Typography variant="caption">{i18next.t(`${i18nPrefix}.tooltip_disabled`)}</Typography>}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

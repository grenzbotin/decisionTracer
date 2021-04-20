import React, { useContext, useState } from "react";
import { Grid, Typography, Container, IconButton } from "@material-ui/core";
import i18next from "i18next";
import FileCopyIcon from "@material-ui/icons/FileCopy";

import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { applyFormatting, getPresetValueByField, getRoundedValue } from "@/../lib/helpers";
import ValidatedInputField from "@/../components/elements/ValidatedInputField";
import ValidatedProbabilityField from "@/../components/elements/ValidatedProbabilityField";
import CustomTooltip from "@/../components/elements/CustomTooltip";
import CoronaCases from "./CoronaCases";
import { CoronaPresetContext } from "./CoronaPresetContextProvider";

export default function ProbabilityVaccinationDamage(): JSX.Element {
  const i18nPrefix = "presets.corona.questionnaire.2";
  const { active, setProbabilityByKey } = useContext(GlobalDecisionContext);
  const { q2, setValuesByStep } = useContext(CoronaPresetContext);

  // Taking default values from current active context
  const [vaccinationDamage, setVaccinationDamage] = useState(
    getPresetValueByField(active.decisions, "probability", "vaccinated", "vaccinated-vaccination_damage")
  );

  const handleChange = (value: number, category: "deaths" | "damage", item: string): void => {
    const newValues = {
      ...q2,
      [`${category}_${item}`]: value
    };

    setValuesByStep(newValues, "q2");
  };

  const handleVaccinationDamageChange = (value: number): void => {
    setVaccinationDamage(value);

    if (
      getPresetValueByField(active.decisions, "probability", "vaccinated", "vaccinated-vaccination_damage") !== null
    ) {
      const valueToSet = value > 100 ? 100 : value;
      setProbabilityByKey(valueToSet, "vaccinated", "vaccinated-vaccination_damage");
    }
  };

  const handleGetCoronaData = ({
    cases,
    deaths,
    astraZenecaVacc
  }: {
    cases: number;
    deaths: number;
    astraZenecaVacc: number;
  }): void => {
    setValuesByStep({ ...q2, deaths_amount: deaths, deaths_infected: cases, damage_vaccinated: astraZenecaVacc }, "q2");
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {i18next.t(`${i18nPrefix}.title`)}
      </Typography>
      <Typography variant="body2">{applyFormatting(i18next.t(`${i18nPrefix}.subtitle`))}</Typography>
      <Container maxWidth="md" style={{ marginTop: "3rem", padding: 0 }}>
        <Grid container spacing={2} style={{ fontSize: ".8rem" }}>
          <Grid item xs={12}>
            <CoronaCases onGetTotalNumbers={handleGetCoronaData} />
          </Grid>
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
              value={q2.deaths_amount}
              onChange={(value) => handleChange(value, "deaths", "amount")}
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={5} style={{ display: "flex", alignItems: "center" }}>
            <ValidatedInputField
              label={i18next.t(`${i18nPrefix}.calc.cvt`)}
              value={q2.damage_amount}
              onChange={(value) => handleChange(value, "damage", "amount")}
            />
            <CustomTooltip
              alert
              content={<Typography variant="caption">{i18next.t(`${i18nPrefix}.calc.tooltip_cvt_cases`)}</Typography>}
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
              value={q2.deaths_infected}
              onChange={(value) => handleChange(value, "deaths", "infected")}
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={5}>
            <ValidatedInputField
              label={i18next.t(`${i18nPrefix}.calc.vaccinated`)}
              value={q2.damage_vaccinated}
              onChange={(value) => handleChange(value, "damage", "vaccinated")}
            />
          </Grid>
          <Grid item xs={5}>
            <b>{q2.deaths_infected > 0 ? getRoundedValue((q2.deaths_amount / q2.deaths_infected) * 100, 5) : 0} %</b>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={5}>
            <b>{q2.damage_vaccinated > 0 ? getRoundedValue((q2.damage_amount / q2.damage_vaccinated) * 100, 5) : 0}%</b>
            <IconButton
              color="primary"
              disabled={vaccinationDamage === null}
              size="small"
              onClick={() => handleVaccinationDamageChange((q2.damage_amount / q2.damage_vaccinated) * 100)}
              style={{ marginLeft: ".5rem" }}
            >
              <FileCopyIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="subtitle2" gutterBottom style={{ marginTop: "3rem" }}>
          {i18next.t(`${i18nPrefix}.interpretation`)}
        </Typography>
        <Typography variant="body2">
          {i18next.t(`${i18nPrefix}.interpretation_text`, {
            value: getRoundedValue(q2.deaths_amount / q2.deaths_infected / (q2.damage_amount / q2.damage_vaccinated), 2)
          })}
        </Typography>
        <Typography variant="subtitle2" gutterBottom style={{ marginTop: "2rem" }}>
          {i18next.t(`${i18nPrefix}.0`)}
        </Typography>
        <Grid container spacing={2} style={{ fontSize: ".8rem" }}>
          <Grid item xs={5}>
            {i18next.t(`${i18nPrefix}.damage_probability`)}
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={5}>
            <ValidatedProbabilityField
              disabled={vaccinationDamage === null}
              value={vaccinationDamage === null ? 0 : vaccinationDamage}
              onChange={handleVaccinationDamageChange}
            />
            {vaccinationDamage === null && (
              <CustomTooltip
                content={
                  <Typography variant="caption">
                    {applyFormatting(i18next.t(`${i18nPrefix}.tooltip_disabled`))}
                  </Typography>
                }
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

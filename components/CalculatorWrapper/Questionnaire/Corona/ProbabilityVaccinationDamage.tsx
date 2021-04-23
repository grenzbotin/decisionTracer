import React, { useContext, useState } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import i18next from "i18next";

import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { applyFormatting, getPresetValueByField } from "@/../lib/helpers";
import ValidatedProbabilityField from "@/../components/elements/ValidatedProbabilityField";
import CustomTooltip from "@/../components/elements/CustomTooltip";

const PRESET_VACCINATION_DAMAGE = 0.00076;
const MAX_VACCINATION_DAMAGE = 0.02;

export default function ProbabilityVaccinationDamage({ handleClose }: { handleClose?: () => void }): JSX.Element {
  const i18nPrefix = "presets.corona.questionnaire.2";
  const { active, setProbabilityByKey } = useContext(GlobalDecisionContext);
  const [vaccinationDamage, setVaccinationDamage] = useState(PRESET_VACCINATION_DAMAGE);

  const handleSave = (): void => {
    if (
      getPresetValueByField(active.decisions, "probability", "vaccinated", "vaccinated-vaccination_damage") !== null
    ) {
      const valueToSet = vaccinationDamage > 100 ? 100 : vaccinationDamage;
      setProbabilityByKey(valueToSet, "vaccinated", "vaccinated-vaccination_damage");
    }
    handleClose();
  };

  const handleVaccinationDamageChange = (value: number): void => {
    setVaccinationDamage(value);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {i18next.t(`${i18nPrefix}.title`)}
      </Typography>
      <Typography variant="body2" component="span">
        {i18next
          .t(`${i18nPrefix}.subtitle`)
          .split("\n")
          .map((c) => (
            <Typography key={c} style={{ marginBottom: ".4rem" }}>
              {applyFormatting(c)}
            </Typography>
          ))}
      </Typography>
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
        {vaccinationDamage > MAX_VACCINATION_DAMAGE && (
          <Grid item xs={12}>
            {applyFormatting(
              i18next.t(`${i18nPrefix}.warning`, { preset_vaccination_damage: `${MAX_VACCINATION_DAMAGE}%` })
            )}
          </Grid>
        )}
        <Grid item style={{ marginTop: "2rem", textAlign: "center" }} xs={12}>
          <Button color="primary" variant="contained" onClick={handleSave}>
            {i18next.t("presets.corona.save")}
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

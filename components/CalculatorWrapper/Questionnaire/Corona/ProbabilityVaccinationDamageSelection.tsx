import React, { useContext, useState } from "react";
import { Grid, Typography, Container } from "@material-ui/core";
import i18next from "i18next";

import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { applyFormatting, getPresetValueByField, getRoundedValue } from "@/../lib/helpers";
import NonLinearSlider from "@/../components/elements/NonLinearSlider";
import { SECONDARY } from "@/../components/theme";
import CustomTooltip from "@/../components/elements/CustomTooltip";
import ValidatedInputField from "@/../components/elements/ValidatedInputField";

const PRESET_VACCINATION_DAMAGE = 0.00076;
const MAX_VACCINATION_DAMAGE = 0.02;

const STUDIES_VACCINATION_DAMAGE = {
  totalVaccinated: 5500000,
  suspectedCase: 1100,
  supposedVaccinationDamage: 42
};

export default function ProbabilityVaccinationDamageSelection(): JSX.Element {
  const i18nPrefix = "presets.corona.questionnaire.2b";
  const { active, setProbabilityByKey } = useContext(GlobalDecisionContext);
  const [vaccinationDamage, setVaccinationDamage] = useState(PRESET_VACCINATION_DAMAGE);
  const [damageAmount, setDamageAmount] = useState(STUDIES_VACCINATION_DAMAGE.supposedVaccinationDamage);

  const handleSave = (value: number): void => {
    if (
      getPresetValueByField(active.decisions, "probability", "vaccinated", "vaccinated-vaccination_damage") !== null
    ) {
      const valueToSet = value > 100 ? 100 : value;
      setProbabilityByKey(valueToSet, "vaccinated", "vaccinated-vaccination_damage");
    }
  };

  const handleVaccinationDamageChange = (value: number): void => {
    setDamageAmount(Math.round(value));
    const newVaccinationDamage = (Math.round(value) / STUDIES_VACCINATION_DAMAGE.totalVaccinated) * 100;
    setVaccinationDamage(newVaccinationDamage);

    // Directly save new vaccination damage
    handleSave(newVaccinationDamage);
  };

  return (
    <>
      <Container maxWidth="lg" style={{ padding: 0 }}>
        <Typography variant="h6" gutterBottom>
          {i18next.t(`${i18nPrefix}.title`)}
        </Typography>
        <Typography variant="body1">
          {i18next
            .t(`${i18nPrefix}.subtitle`)
            .split("\n")
            .map((c) => (
              <Typography key={c} component="span" style={{ marginBottom: ".4rem" }}>
                {applyFormatting(c)}
              </Typography>
            ))}
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
        <Typography variant="body2" style={{ marginTop: "2rem" }}>
          {i18next.t(`${i18nPrefix}.subtitle_2`)}
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "1rem" }}>
          <Grid item xs={12} sm={8}>
            <NonLinearSlider
              marks={[
                { value: 0 },
                {
                  value: 42,
                  label: (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <Typography variant="button" component="p">
                        42
                      </Typography>
                      <CustomTooltip
                        content={
                          <>
                            {i18next
                              .t(`${i18nPrefix}.slider.42`)
                              .split("\n")
                              .map((c) => (
                                <Typography key={c} component="p" variant="caption" style={{ marginBottom: ".1rem" }}>
                                  {applyFormatting(c)}
                                </Typography>
                              ))}
                          </>
                        }
                      />
                    </div>
                  )
                },
                { value: 100 },
                { value: 1000 },
                {
                  value: 1100,
                  label: (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <Typography variant="button" component="p">
                        1100
                      </Typography>
                      <CustomTooltip
                        content={
                          <>
                            {i18next
                              .t(`${i18nPrefix}.slider.1100`)
                              .split("\n")
                              .map((c) => (
                                <Typography key={c} component="p" variant="caption" style={{ marginBottom: ".1rem" }}>
                                  {applyFormatting(c)}
                                </Typography>
                              ))}
                          </>
                        }
                      />
                    </div>
                  )
                },
                { value: 10000 },
                { value: 100000 },
                { value: 1000000 },
                {
                  value: 5500000,
                  label: (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <Typography variant="button" component="p">
                        5500000
                      </Typography>
                      <CustomTooltip
                        content={
                          <>
                            {i18next
                              .t(`${i18nPrefix}.slider.5500000`)
                              .split("\n")
                              .map((c) => (
                                <Typography key={c} component="p" variant="caption" style={{ marginBottom: ".1rem" }}>
                                  {applyFormatting(c)}
                                </Typography>
                              ))}
                          </>
                        }
                      />
                    </div>
                  )
                },
                { value: 10000000 }
              ]}
              steps={1000}
              onChange={(value: number) => handleVaccinationDamageChange(value)}
              style={{ color: SECONDARY }}
              value={damageAmount}
              numFormatter={(val: number) => Math.round(val)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ValidatedInputField value={damageAmount} onChange={(value) => handleVaccinationDamageChange(value)} />
            <Typography variant="caption" component="div" style={{ marginTop: ".2rem" }}>
              entspricht {getRoundedValue(vaccinationDamage, 2)}%
            </Typography>
          </Grid>
          {vaccinationDamage > MAX_VACCINATION_DAMAGE && (
            <Grid item xs={12} style={{ marginTop: "1rem" }}>
              {applyFormatting(
                i18next.t(`${i18nPrefix}.warning`, { preset_vaccination_damage: `${MAX_VACCINATION_DAMAGE}%` })
              )}
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}

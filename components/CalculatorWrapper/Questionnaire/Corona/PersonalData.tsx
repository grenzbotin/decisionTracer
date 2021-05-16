import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography, Container, RadioGroup, Radio, FormControlLabel, TextField } from "@material-ui/core";
import i18next from "i18next";
import Papa from "papaparse";

import CustomTooltip from "@/../components/elements/CustomTooltip";
import { applyFormatting, getPath } from "@/../lib/helpers";
import { CoronaPresetContext } from "./CoronaPresetContextProvider";
import { Autocomplete } from "@material-ui/lab";
import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";

async function fetchCsv(): Promise<string> {
  return fetch(`${getPath()}/datasets/output.csv`).then((response) => {
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    return reader.read().then((result) => decoder.decode(result.value));
  });
}

const CATEGORIES = ["vaccinated", "unvaccinated"];
const ITEMS = ["asymptomatic", "mild", "hospitalised", "severely-hospitalised", "death"];

export default function PersonalData(): JSX.Element {
  const i18nPrefix = "presets.corona.questionnaire.5";
  const { personalData, setValuesByStep } = useContext(CoronaPresetContext);
  const { setProbabilityByKeyHard } = useContext(GlobalDecisionContext);

  const VACCINATION_REDUCTION = 1 - personalData.vaccinationEfficiacy;
  const FACTORS = [
    [personalData.vaccinationEfficiacy, 1],
    [VACCINATION_REDUCTION, 1],
    [VACCINATION_REDUCTION, 1],
    [VACCINATION_REDUCTION, 1],
    [VACCINATION_REDUCTION, 1]
  ];

  const [dataset, setDataset] = useState(null);
  const [tasks, setTasks] = useState([]);

  // We are loading csv data that is originated from: https://covid19-surveillance-report.ecdc.europa.eu
  useEffect(() => {
    fetchCsv().then((csv) => {
      return Papa.parse(csv, { complete: (result) => setDataset(result.data) });
    });
  }, [setDataset]);

  const getAndSaveProbabilities = ({
    sex,
    age,
    country = "Germany"
  }: {
    sex: string;
    age: string;
    country?: string;
  }): void => {
    const [, , , stAsymptomatic, sTmild, sThospitalised, sTsever, sTdeath] = dataset.find(
      (item: string[]) => item[0] === country && item[1] === age && item[2] === sex
    );

    const probabilities = {
      death: parseFloat(sTdeath.replace(",", ".")),
      "severely-hospitalised": parseFloat(sTsever.replace(",", ".")),
      hospitalised: parseFloat(sThospitalised.replace(",", ".")),
      mild: parseFloat(sTmild.replace(",", ".")),
      asymptomatic: parseFloat(stAsymptomatic.replace(",", "."))
    };

    CATEGORIES.forEach((category, key) => {
      ITEMS.forEach((item, itemKey) => {
        let probability = probabilities[item] * FACTORS[itemKey][key] * 100;
        if (item === "asymptomatic" && category === "vaccinated") {
          probability = (probabilities[item] * VACCINATION_REDUCTION + FACTORS[itemKey][key]) * 100;
        }

        setTasks((queue) => [
          ...queue,
          [probability, category, `${category}-infection`, `${category}-infection-${item}`]
        ]);
      });
    });
  };

  useEffect(() => {
    // Ensure to change one by one
    if (tasks.length > 0) {
      setProbabilityByKeyHard(tasks[0][0], tasks[0][1], tasks[0][2], tasks[0][3]).then(
        (val: boolean) => val && setTasks((tasks) => tasks.slice(1))
      );
    }
  }, [tasks, setProbabilityByKeyHard]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeAge = (
    event: React.ChangeEvent<Record<string, never>>,
    newValue: string | { value: string }
  ): void => {
    const valueToSet = typeof newValue === "string" && newValue;
    if (valueToSet) {
      setValuesByStep({ ...personalData, age: valueToSet }, "personalData");
      getAndSaveProbabilities({ sex: personalData.sex, age: valueToSet });
    }
  };

  const handleChangeSex = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value) {
      setValuesByStep({ ...personalData, sex: (event.target as HTMLInputElement).value }, "personalData");
      getAndSaveProbabilities({ age: personalData.age, sex: event.target.value });
    }
  };

  return (
    <>
      <Container maxWidth="lg" style={{ fontSize: "1rem", padding: 0 }}>
        <Typography variant="h6" gutterBottom>
          {applyFormatting(i18next.t(`${i18nPrefix}.title`))}
        </Typography>
        <Typography variant="body1" style={{ display: "flex", alignItems: "flex-start" }}>
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
            style={{ marginLeft: "1rem" }}
          />
        </Typography>
        <Grid container spacing={4} style={{ marginTop: "2rem" }}>
          <Grid item xs={6} style={{ justifyContent: "flex-end", alignItems: "center", display: "flex" }}>
            {i18next.t(`${i18nPrefix}.age`)}
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              id="age-selection"
              autoHighlight
              value={personalData.age}
              options={[...Array(101).keys()].map((key) => key.toString())}
              getOptionLabel={(option) => option}
              style={{ width: 70 }}
              size="small"
              selectOnFocus
              closeIcon={null}
              onChange={handleChangeAge}
              renderInput={(params) => <TextField variant="outlined" {...params} />}
            />
          </Grid>
          <Grid item xs={6} style={{ justifyContent: "flex-end", alignItems: "center", display: "flex" }}>
            {i18next.t(`${i18nPrefix}.gender`)}
          </Grid>
          <Grid item xs={6}>
            <RadioGroup aria-label="gender" name="gender-selection" value={personalData.sex} onChange={handleChangeSex}>
              <FormControlLabel
                value="F"
                control={<Radio color="primary" />}
                label={i18next.t(`${i18nPrefix}.female`)}
              />
              <FormControlLabel value="M" control={<Radio color="primary" />} label={i18next.t(`${i18nPrefix}.male`)} />
            </RadioGroup>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

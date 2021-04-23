import React, { Fragment, useContext, useEffect, useState } from "react";
import { Grid, Typography, Container, Button } from "@material-ui/core";
import i18next from "i18next";
import Papa from "papaparse";

import { applyFormatting, getPath } from "@/../lib/helpers";
import { CoronaPresetContext } from "./CoronaPresetContextProvider";
import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import ValidatedProbabilityField from "@/../components/elements/ValidatedProbabilityField";

async function fetchCsv(): Promise<string> {
  return fetch(`${getPath()}/datasets/output.csv`).then((response) => {
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    return reader.read().then((result) => decoder.decode(result.value));
  });
}

const CATEGORIES = ["vaccinated"];
const ITEMS = ["asymptomatic", "mild", "hospitalised", "severely-hospitalised", "death"];

export default function PersonalDataVaccinationInfo({ handleClose }: { handleClose?: () => void }): JSX.Element {
  const i18nPrefix = "presets.corona.questionnaire.7";
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
  const [shouldClose, setShouldClose] = useState(false);

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

    const selectedTasks = [] as Array<Array<number | string>>;
    CATEGORIES.forEach((category, key) => {
      ITEMS.forEach((item, itemKey) => {
        let probability = probabilities[item] * FACTORS[itemKey][key] * 100;
        if (item === "asymptomatic" && category === "vaccinated") {
          probability = (probabilities[item] * VACCINATION_REDUCTION + FACTORS[itemKey][key]) * 100;
        }

        selectedTasks.push([probability, category, `${category}-infection`, `${category}-infection-${item}`]);
      });
    });

    setTasks(selectedTasks);
    setShouldClose(true);
  };

  useEffect(() => {
    // Ensure to change one by one
    if (tasks.length > 0) {
      setProbabilityByKeyHard(tasks[0][0], tasks[0][1], tasks[0][2], tasks[0][3]).then(
        (val: boolean) => val && setTasks((tasks) => tasks.slice(1))
      );
    } else {
      if (handleClose && shouldClose) {
        handleClose();
      }
    }
  }, [tasks, setProbabilityByKeyHard, handleClose, shouldClose]);

  const handleVaccinationDamageChange = (value: number): void => {
    setValuesByStep({ ...personalData, vaccinationEfficiacy: value / 100 }, "personalData");
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {applyFormatting(i18next.t(`${i18nPrefix}.title`))}
      </Typography>
      <Typography variant="body1" style={{ display: "flex", alignItems: "flex-start" }}>
        {applyFormatting(i18next.t(`${i18nPrefix}.subtitle`))}
      </Typography>
      <Container maxWidth="md" style={{ marginTop: "2rem", fontSize: "1rem", padding: 0 }}>
        {i18next
          .t(`${i18nPrefix}.decreasing_probabilities`)
          .split("\n")
          .map((c) => (
            <Typography key={c} variant="body2" component="p" style={{ marginBottom: ".4rem" }}>
              {applyFormatting(c)}
            </Typography>
          ))}
        <Typography variant="body2" component="p" style={{ margin: "1rem 0 .4rem 0" }}>
          {applyFormatting(i18next.t(`${i18nPrefix}.question`))}
        </Typography>
        <ValidatedProbabilityField
          value={personalData.vaccinationEfficiacy * 100}
          onChange={handleVaccinationDamageChange}
        />
        <Grid item style={{ marginTop: "2rem", textAlign: "center" }} xs={12}>
          <Button
            color="primary"
            variant="contained"
            onClick={() =>
              getAndSaveProbabilities({ sex: personalData.sex, age: personalData.age, country: "Germany" })
            }
          >
            {i18next.t("presets.corona.save")}
          </Button>
        </Grid>
      </Container>
    </>
  );
}

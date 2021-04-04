import React, { useState } from "react";
import { Button, Typography } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import i18next from "i18next";

import { loadCoronaDataGermany, loadVaccinationDataGermany } from "@/../assets/api";
import CustomIcon from "@/../assets/CustomIcon";
import CustomTooltip from "@/../components/elements/CustomTooltip";

export default function CoronaCases({
  onGetInfected,
  onGetTotalNumbers
}: {
  onGetInfected?: (_v: number) => void;
  onGetTotalNumbers?: ({
    cases,
    deaths,
    astraZenecaVacc
  }: {
    cases: number;
    deaths: number;
    astraZenecaVacc: number;
  }) => void;
}): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [cases, setCases] = useState<number | null>(null);
  const [error, setError] = useState<boolean>(false);

  const handleClick = (): void => {
    setLoading(true);
    setError(false);
    if (onGetTotalNumbers) {
      Promise.all([loadCoronaDataGermany(), loadVaccinationDataGermany()])
        .then((results) => {
          const coronaData = results[0].data;
          const vaccinationData = results[1].data;

          const { cases, deaths } = coronaData;
          const {
            vaccination: { astraZeneca }
          } = vaccinationData.data;

          setCases(cases);
          onGetTotalNumbers({ cases, deaths, astraZenecaVacc: astraZeneca });
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    }

    if (onGetInfected) {
      loadCoronaDataGermany()
        .then((response) => {
          const { casesPerWeek } = response.data;

          setCases(casesPerWeek);
          onGetInfected(casesPerWeek);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    }
  };

  const startIcon = cases !== null ? <CheckCircleIcon /> : error ? <ErrorIcon color="error" /> : null;

  return (
    <>
      <Button
        color="primary"
        variant="outlined"
        endIcon={cases === null && <CustomIcon fontSize="small" name="de" />}
        startIcon={startIcon}
        size="small"
        disabled={loading || cases !== null}
        onClick={handleClick}
        style={{ marginRight: "1rem" }}
      >
        {cases !== null ? i18next.t("presets.corona.data_loaded") : i18next.t("presets.corona.get_data_for")}
      </Button>
      <CustomTooltip
        content={
          <>
            {i18next
              .t("presets.corona.get_data_tooltip")
              .split("\n")
              .map((c) => (
                <Typography key={c} variant="caption" component="p" style={{ marginBottom: ".4rem" }}>
                  {c}
                </Typography>
              ))}
          </>
        }
      />
    </>
  );
}

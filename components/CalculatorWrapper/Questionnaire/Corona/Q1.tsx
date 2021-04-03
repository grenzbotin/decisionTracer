import React from "react";
import { Divider, Typography } from "@material-ui/core";
import i18next from "i18next";
import CustomTooltip from "@/../components/CustomTooltip";

export default function Q1(): JSX.Element {
  const i18nPrefix = "presets.corona.questionnaire.1";
  return (
    <>
      <Typography variant="h6" gutterBottom>
        2. {i18next.t(`${i18nPrefix}.title`)}
      </Typography>
      <Typography variant="caption">
        {i18next.t(`${i18nPrefix}.subtitle`)}
        <CustomTooltip
          content={
            <>
              <Typography variant="caption">{i18next.t(`${i18nPrefix}.tooltip`)}</Typography>
              <Divider style={{ margin: ".5rem 0" }} />
              <img
                src="./images/studies_corona_mortality.jpg"
                alt="Absolute 28-day mortality risk associated with B.1.1.7"
                width="340px"
              />
            </>
          }
        />
      </Typography>
    </>
  );
}

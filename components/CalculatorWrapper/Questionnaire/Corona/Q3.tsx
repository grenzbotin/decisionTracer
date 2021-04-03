import React from "react";
import { Typography } from "@material-ui/core";
import i18next from "i18next";
import CustomTooltip from "@/../components/CustomTooltip";

export default function Q3(): JSX.Element {
  const i18nPrefix = "presets.corona.questionnaire.3";
  return (
    <>
      <Typography variant="h6" gutterBottom>
        4. {i18next.t(`${i18nPrefix}.title`)}
      </Typography>
      {i18next
        .t(`${i18nPrefix}.subtitle`)
        .split("\n")
        .map((c) => (
          <div key={c}>
            <Typography variant="caption" component="p" key={c}>
              {c}
            </Typography>
            <br />
          </div>
        ))}
      <Typography variant="caption">
        {i18next.t(`${i18nPrefix}.tooltipText`)}{" "}
        <CustomTooltip
          content={
            <>
              {i18next
                .t(`${i18nPrefix}.tooltip`)
                .split("\n")
                .map((c) => (
                  <div key={c}>
                    <Typography variant="caption" component="p" key={c}>
                      {c}
                    </Typography>
                    <br />
                  </div>
                ))}
            </>
          }
        />
      </Typography>
    </>
  );
}

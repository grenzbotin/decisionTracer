import React from "react";
import { Divider, Typography } from "@material-ui/core";
import i18next from "i18next";
import CustomTooltip from "@/../components/CustomTooltip";

export default function Q0(): JSX.Element {
  const i18nPrefix = "presets.corona.questionnaire.0";
  return (
    <>
      <Typography variant="body2">{i18next.t(`${i18nPrefix}.intro`)}</Typography>
      <Divider style={{ margin: "1.5rem 0" }} />
      <Typography variant="h6" gutterBottom>
        1. {i18next.t(`${i18nPrefix}.title`)}
      </Typography>
      <Typography variant="caption">
        {i18next.t(`${i18nPrefix}.subtitle`)}
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
    </>
  );
}

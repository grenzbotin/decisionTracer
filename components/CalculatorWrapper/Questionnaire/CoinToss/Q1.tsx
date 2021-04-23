import React from "react";
import { Typography } from "@material-ui/core";
import i18next from "i18next";

import { applyFormatting } from "@/../lib/helpers";

export default function Q1(): JSX.Element {
  const i18nPrefix = "presets.coin-toss.questionnaire.1";
  const multipleSizes = require(`../../../../assets/images/tut1.png?resize&sizes[]=100&sizes[]=300&sizes[]=503`);

  return (
    <>
      <Typography variant="body2" component="p" style={{ marginBottom: ".6rem" }}>
        {applyFormatting(i18next.t(`${i18nPrefix}.text_1`))}
      </Typography>
      <div style={{ textAlign: "center" }}>
        <img
          srcSet={multipleSizes.srcSet}
          src={multipleSizes.src}
          alt="Spiel 1"
          style={{ marginBottom: "1rem", width: "100%", maxWidth: "350px" }}
        />
      </div>
      {i18next
        .t(`${i18nPrefix}.text_2`)
        .split("\n")
        .map((c) => (
          <Typography key={c} variant="body2" component="p" style={{ marginBottom: ".6rem" }}>
            {applyFormatting(c)}
          </Typography>
        ))}
    </>
  );
}

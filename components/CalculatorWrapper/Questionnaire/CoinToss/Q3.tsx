import React from "react";
import { Typography } from "@material-ui/core";
import i18next from "i18next";

import { applyFormatting } from "@/../lib/helpers";

export default function Q3(): JSX.Element {
  const i18nPrefix = "presets.coin-toss.questionnaire.3";
  const multipleSizes = require(`../../../../assets/images/tut3.png?resize&sizes[]=100&sizes[]=300&sizes[]=456`);

  return (
    <>
      <Typography variant="body2" component="p" style={{ marginBottom: ".6rem" }}>
        {applyFormatting(i18next.t(`${i18nPrefix}.text_1`))}
      </Typography>
      <div style={{ textAlign: "center" }}>
        <img
          srcSet={multipleSizes.srcSet}
          src={multipleSizes.src}
          alt="Spiel 2"
          style={{ marginBottom: "1rem", width: "100%", maxWidth: "350px" }}
        />
      </div>
      <Typography variant="body2" component="p">
        {applyFormatting(i18next.t(`${i18nPrefix}.text_2`))}
      </Typography>
    </>
  );
}

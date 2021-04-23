import React from "react";
import { Typography } from "@material-ui/core";
import i18next from "i18next";

import { applyFormatting } from "@/../lib/helpers";

export default function Q2(): JSX.Element {
  const i18nPrefix = "presets.coin-toss.questionnaire.2";
  const multipleSizes = require(`../../../../assets/images/tut2.png?resize&sizes[]=200&sizes[]=400&sizes[]=741`);

  return (
    <>
      <Typography variant="body2" component="p" style={{ marginBottom: ".6rem" }}>
        {applyFormatting(i18next.t(`${i18nPrefix}.text_1`))}
      </Typography>
      <div style={{ textAlign: "center" }}>
        <img
          srcSet={multipleSizes.srcSet}
          src={multipleSizes.src}
          alt="Spiel 1 vs Nicht spielen"
          style={{ marginBottom: "1rem", width: "100%", maxWidth: "600px" }}
        />
      </div>
    </>
  );
}

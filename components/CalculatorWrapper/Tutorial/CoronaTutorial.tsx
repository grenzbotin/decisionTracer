import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import i18next from "i18next";

import { PRIMARY } from "../../theme";

function CoronaTutorial({ width = 300 }: { width?: number }): JSX.Element {
  const [consent, setConsent] = useState(false);

  const handleClick = (): void => {
    setConsent(true);
  };

  const actualWidth = width - 24;

  return (
    <>
      {consent ? (
        <Paper style={{ height: (actualWidth / 16) * 9, width: actualWidth }}>
          <iframe
            title="Youtube Video: Tutorial Rational Decision"
            width={actualWidth}
            height={(actualWidth / 16) * 9}
            src="https://www.youtube-nocookie.com/embed/lu_sFoHWP14"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </Paper>
      ) : (
        <Paper
          style={{
            height: (actualWidth / 16) * 9,
            width: actualWidth,
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
            background: PRIMARY,
            color: "#fff",
            cursor: "pointer",
            zIndex: 1
          }}
          aria-label="connect to youtube"
          tabIndex={0}
          onClick={handleClick}
          onKeyPress={(e) => e.key === "Enter" && handleClick()}
        >
          <div>{i18next.t("home.youtube")}</div>
          <PlayCircleFilledIcon fontSize="default" style={{ marginTop: ".5rem" }} />
        </Paper>
      )}
    </>
  );
}

export default CoronaTutorial;

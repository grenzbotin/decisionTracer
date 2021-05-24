import React, { useState } from "react";
import { IconButton, Paper } from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import i18next from "i18next";
import { PRIMARY } from "./theme";

const ConsentCardMedia: React.FC = () => {
  const [consent, setConsent] = useState(false);

  const handleClick = (): void => {
    setConsent(true);
  };

  return (
    <>
      {consent ? (
        <Paper style={{ height: 168.75, width: 300 }}>
          <iframe
            title="Youtube Video: Tutorial Rational Decision"
            width="300"
            height="168.75"
            src="https://www.youtube-nocookie.com/embed/qRZys9H_ihc"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </Paper>
      ) : (
        <Paper
          style={{
            height: 168.75,
            width: 300,
            padding: "1rem",
            textAlign: "center",
            background: PRIMARY,
            color: "#fff"
          }}
        >
          <div>{i18next.t("home.youtube")}</div>
          <IconButton color="inherit" aria-label="connect to youtube" component="div" onClick={handleClick}>
            <PlayCircleFilledIcon fontSize="default" />
          </IconButton>
        </Paper>
      )}
    </>
  );
};

export default ConsentCardMedia;

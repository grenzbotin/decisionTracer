import React, { useState } from "react";
import { Paper } from "@material-ui/core";
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
        <Paper style={{ height: "168.75px", width: "300px" }}>
          <iframe
            title="Youtube Video: Tutorial Rational Decision"
            width="300px"
            height="168.75px"
            src="https://www.youtube-nocookie.com/embed/qRZys9H_ihc"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </Paper>
      ) : (
        <Paper
          style={{
            height: "168.75px",
            width: "300px",
            padding: "1rem",
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
};

export default ConsentCardMedia;

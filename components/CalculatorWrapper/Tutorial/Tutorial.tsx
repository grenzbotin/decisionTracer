import React, { useContext, useState, useRef, useEffect } from "react";
import { Grid } from "@material-ui/core";

import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import CoronaTutorial from "./CoronaTutorial";

export default function Tutorial(): JSX.Element {
  const { active } = useContext(GlobalDecisionContext);
  const videoRef = useRef(null);
  const [availableWidth, setAvailableWidth] = useState(null);

  useEffect(() => {
    if (videoRef?.current) {
      const { width } = videoRef.current.getBoundingClientRect();
      setAvailableWidth(width);
    }
  }, [videoRef]);

  const PRESET_TUTORIALS = {
    corona: <CoronaTutorial width={availableWidth} />
  };

  return (
    <Grid ref={videoRef} item xs={12}>
      {PRESET_TUTORIALS[active.key]}
    </Grid>
  );
}

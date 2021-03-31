import React, { useContext } from "react";

import { generateColors } from "../../theme";
import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import Decision from "./Decision";
import { Decision as DecisionType } from "@/../lib/presets";

export default function Calculator(): JSX.Element {
  const { active } = useContext(GlobalDecisionContext);

  const decisions = active.decisions as DecisionType[];
  const colors = generateColors(decisions.length);

  return (
    <>
      {decisions.map((decision, key) => (
        <Decision key={decision.key} decision={decision} color={colors[key]} />
      ))}
    </>
  );
}

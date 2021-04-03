import React, { useContext, useEffect } from "react";

import { generateColors } from "../../theme";
import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import Decision from "./Decision";
import { Decision as DecisionType } from "@/../lib/presets";
import { scrollToTargetOffset } from "@/../lib/helpers";

export default function Calculator({
  lastAdded,
  setLastAdded
}: {
  lastAdded: string;
  setLastAdded: (_value: null | number) => void;
}): JSX.Element {
  const { active } = useContext(GlobalDecisionContext);
  const decisions = active.decisions as DecisionType[];

  // Scroll to last added decision if on card view
  useEffect(() => {
    if (decisions.find((item) => item.key === lastAdded)) {
      scrollToTargetOffset(lastAdded);
      setLastAdded(null);
    }
  }, [decisions, lastAdded, setLastAdded]);

  const colors = generateColors(decisions.length);

  return (
    <>
      {decisions.map((decision, key) => (
        <Decision key={decision.key} decision={decision} color={colors[key]} />
      ))}
    </>
  );
}

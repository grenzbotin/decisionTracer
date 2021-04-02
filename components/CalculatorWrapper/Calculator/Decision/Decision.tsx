import React, { useContext, useEffect, useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import i18next from "i18next";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";

import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { Decision as DecisionType } from "@/../lib/presets";
import EditableTitle from "../CalculatorElements/EditableTitle";
import SubItem from "../SubItem";
import CustomIcon from "@/../assets/CustomIcon";
import CardMenu from "../CalculatorElements/CardMenu";
import { getRoundedValue, getUniqueNumber, scrollToTargetOffset } from "@/../lib/helpers";

function getResult(decision: DecisionType): number | string {
  let total = 0;
  decision.sub.forEach((item) => {
    total += item.value * (item.probability / 100);
  });

  return getRoundedValue(total, 3);
}

export default function Decision({ decision, color }: { decision: DecisionType; color: string }): JSX.Element {
  const { active, setTitle, removeItem, addItem } = useContext(GlobalDecisionContext);
  const [lastAddedSub, setLastAddedSub] = useState(null);

  const handleClickAddItem = (): void => {
    const uniqueNumber = getUniqueNumber();
    setLastAddedSub(uniqueNumber);
    addItem(uniqueNumber, decision.key);
  };

  // Scroll to last added decision
  useEffect(() => {
    if (decision.sub.find((item) => item.key === lastAddedSub)) {
      scrollToTargetOffset(lastAddedSub);
      setLastAddedSub(null);
    }
  }, [decision, lastAddedSub]);

  return (
    <Grid
      id={decision.key}
      item
      xs={12}
      sm={12}
      md={12}
      lg={active.decisions.length > 1 ? 6 : 12}
      style={{ position: "relative" }}
    >
      <div
        style={{
          position: "absolute",
          left: "24px",
          height: "50px",
          width: "50px",
          background: color,
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white"
        }}
      >
        {decision.icon ? <CustomIcon fontSize="large" name={decision.icon} /> : <TurnedInNotIcon fontSize="default" />}
      </div>
      <Paper
        style={{
          padding: "0.5rem 1rem",
          borderTop: `5px solid ${color}`
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
            marginLeft: "calc(1rem + 50px)"
          }}
        >
          <EditableTitle
            title={decision.title}
            onChange={(title: string) => setTitle(title, decision.key)}
            variant="subtitle1"
            component="h2"
          />
          <CardMenu
            listContent={[
              {
                text: i18next.t("calculator.add_scenario"),
                icon: <AddCircleIcon fontSize="small" />,
                onClick: handleClickAddItem
              },
              {
                text: i18next.t("calculator.remove_decision"),
                icon: <DeleteIcon fontSize="small" />,
                onClick: () => removeItem(decision.key)
              }
            ]}
          />
        </div>
        <Grid container spacing={2}>
          {decision.sub.map((item) => (
            <SubItem key={item.key} color={color} decisionKey={decision.key} item={item} />
          ))}
        </Grid>
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            alignItems: "center"
          }}
        >
          <span
            style={{
              width: "1rem",
              height: "1rem",
              display: "inline-block",
              marginRight: ".5rem",
              background: color,
              borderRadius: "4px"
            }}
          />
          {i18next.t("calculator.expected_utility")} {getResult(decision)}
        </div>
      </Paper>
    </Grid>
  );
}

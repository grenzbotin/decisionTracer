import React, { useContext, useEffect, useState } from "react";
import { Button, Grid, IconButton, Paper } from "@material-ui/core";
import i18next from "i18next";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";

import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { Decision as DecisionType } from "@/../lib/presets";
import EditableTitle from "@/../components/elements/EditableTitle";
import SubItem from "../SubItem";
import CustomIcon from "@/../assets/CustomIcon";
import { getResult, getUniqueNumber, scrollToTargetOffset } from "@/../lib/helpers";

export default function Decision({ decision, color }: { decision: DecisionType; color: string }): JSX.Element {
  const { setTitle, removeItem, addItem } = useContext(GlobalDecisionContext);
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
    <Grid id={decision.key} item xs style={{ position: "relative" }}>
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
          borderTop: `5px solid ${color}`,
          minWidth: "312px"
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
          <IconButton onClick={() => removeItem(decision.key)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
        <Grid container spacing={2}>
          {decision.sub.map((item) => (
            <SubItem key={item.key} color={color} decisionKey={decision.key} item={item} />
          ))}
        </Grid>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleClickAddItem}
          startIcon={<AddCircleIcon />}
          style={{ margin: "1rem 0", borderColor: color, color: color }}
        >
          {i18next.t("calculator.add_scenario")}
        </Button>
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

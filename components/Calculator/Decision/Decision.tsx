import React, { useContext } from "react";
import { Grid, Paper } from "@material-ui/core";
import i18next from "i18next";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";

import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { Decision as DecisionType } from "@/../lib/presets";
import EditableTitle from "../CalculatorElements/EditableTitle";
import SubItem from "../SubItem";
import CustomIcon from "@/../assets/CustomIcon";
import CardMenu from "../CalculatorElements/CardMenu";

function getResult(decision: DecisionType): number | string {
  let total = 0;
  decision.sub.forEach((item) => {
    if (item.cases.length !== 0) {
      let subs = 0;
      item.cases.map((c) => {
        subs += c.value * (c.probability / 100);
      });
      total += subs * (item.probability / 100);
    } else {
      total += item.value * (item.probability / 100);
    }
  });

  return Math.round((total * 100) / 100);
}

export default function Decision({ decision, color }: { decision: DecisionType; color: string }): JSX.Element {
  const { setTitle, removeItem, addItem } = useContext(GlobalDecisionContext);

  return (
    <Grid key={decision.key} item xs style={{ position: "relative" }}>
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
          justifyContent: "center"
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255,255,255,.8)",
            border: "2px solid rgba(0,0,0,.1)",
            height: "30px",
            width: "30px",
            borderRadius: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {decision.icon && <CustomIcon fontSize="large" name={decision.icon} />}
        </div>
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
            variant="h5"
            component="h2"
          />
          <CardMenu
            listContent={[
              {
                text: i18next.t("calculator.add_scenario"),
                icon: <AddCircleIcon fontSize="small" />,
                onClick: () => addItem(decision.key)
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

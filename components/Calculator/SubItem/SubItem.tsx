import { Card, Grid, CardContent, Typography } from "@material-ui/core";
import i18next from "i18next";
import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { SubItem as SubItemType } from "@/../lib/presets";
import EditableTitle from "../CalculatorElements/EditableTitle";
import ValidatedProbabilityField from "../CalculatorElements/ValidatedProbabilityField";
import NonLinearSlider from "../CalculatorElements/NonLinearSlider";
import GrowingSlider from "../CalculatorElements/GrowingSlider";
import CaseItem from "../CaseItem";

export default function SubItem({
  item,
  decisionKey,
  color
}: {
  item: SubItemType;
  decisionKey: string;
  color: string;
}): JSX.Element {
  const { setTitle, setProbability, setValue, removeItem, addItem } = useContext(GlobalDecisionContext);

  const handleProbabilityChange = (value: number): void => {
    setProbability(value, decisionKey, item.key);
  };

  const handleValueChange = (value: number): void => {
    setValue(value, decisionKey, item.key);
  };

  return (
    <Grid key={item.key} item xs>
      <Card variant="outlined" style={{ padding: ".5rem", minWidth: "250px" }}>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <EditableTitle
              title={item.title}
              onChange={(title: string) => setTitle(title, decisionKey, item.key)}
              variant="h6"
              component="h3"
            />
            <div style={{ color: color, display: "flex", alignSelf: "baseline" }}>
              <IconButton
                aria-label="remove scenario"
                component="span"
                onClick={() => removeItem(decisionKey, item.key)}
              >
                <DeleteForeverIcon fontSize="small" color="inherit" />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="add scenario"
                component="span"
                onClick={() => addItem(decisionKey, item.key)}
              >
                <AddCircleIcon />
              </IconButton>
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "2rem", justifyContent: "space-between", alignItems: "flex-end" }}>
            <Typography variant="caption">{i18next.t("calculator.probability")}</Typography>
            <ValidatedProbabilityField onChange={handleProbabilityChange} value={item.probability} />
          </div>
          <NonLinearSlider
            marks={[
              { value: 0, label: 0 },
              { value: 0.1, label: 0.1 },
              { value: 1, label: 1 },
              { value: 10, label: 10 },
              { value: 20, label: 20 },
              { value: 50, label: 50 },
              { value: 100, label: 100 }
            ]}
            steps={1000}
            onChange={(value: number) => setProbability(value, decisionKey, item.key)}
            style={{ color: color }}
            value={item.probability}
            numFormatter={(val: number) => Math.round(val)}
          />
          {item.cases.length === 0 ? (
            <>
              <div
                style={{
                  display: "flex",
                  margin: "1.5rem 0 .5rem 0",
                  justifyContent: "space-between",
                  alignItems: "flex-end"
                }}
              >
                <Typography variant="caption" display="block" gutterBottom>
                  {i18next.t("calculator.value")}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  {item.value}
                </Typography>
              </div>
              <GrowingSlider onChange={handleValueChange} value={item.value} />
            </>
          ) : (
            <>
              <Typography variant="caption" display="block" style={{ marginTop: "1.5rem" }} gutterBottom>
                {i18next.t("calculator.subcases")}
              </Typography>
              {item.cases.map((caseItem) => (
                <CaseItem
                  key={caseItem.key}
                  decisionKey={decisionKey}
                  itemKey={item.key}
                  caseItem={caseItem}
                  color={color}
                />
              ))}
            </>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}

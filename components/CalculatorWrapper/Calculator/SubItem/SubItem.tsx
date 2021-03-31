import { Card, Grid, CardContent, Typography, IconButton, useMediaQuery, useTheme } from "@material-ui/core";
import MuiCardHeader from "@material-ui/core/CardHeader";
import { withStyles } from "@material-ui/core/styles";
import i18next from "i18next";
import React, { useContext } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";

import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { SubItem as SubItemType } from "@/../lib/presets";
import EditableTitle from "../CalculatorElements/EditableTitle";
import ValidatedProbabilityField from "../CalculatorElements/ValidatedProbabilityField";
import NonLinearSlider from "../CalculatorElements/NonLinearSlider";
import GrowingSlider from "../CalculatorElements/GrowingSlider";
import CaseItem from "../CaseItem";
import CardMenu from "../CalculatorElements/CardMenu";
import ValidatedValueField from "../CalculatorElements/ValidatedValueField";
import { getUniqueNumber } from "@/../lib/helpers";

const CardHeader = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    padding: "0rem .5rem"
  },
  action: {
    marginTop: 0
  }
})(MuiCardHeader);

export default function SubItem({
  item,
  decisionKey,
  color
}: {
  item: SubItemType;
  decisionKey: string;
  color: string;
}): JSX.Element {
  const { setTitle, setProbability, setValue, removeItem, addItem, toggleIndependent, toggleClose } = useContext(
    GlobalDecisionContext
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleProbabilityChange = (value: number): void => {
    setProbability(value, decisionKey, item.key);
  };

  const handleValueChange = (value: number): void => {
    setValue(value, decisionKey, item.key);
  };

  return (
    <Grid id={item.key} key={item.key} item xs={12} sm={12} md={12} lg>
      <Card variant="outlined" style={{ minWidth: "250px" }}>
        <CardHeader
          title={
            <EditableTitle
              alignItems="center"
              title={item.title}
              onChange={(title: string) => setTitle(title, decisionKey, item.key)}
              variant="body2"
              component="h3"
            />
          }
          action={
            <CardMenu
              listContent={[
                {
                  text: i18next.t("calculator.add_case"),
                  icon: <AddCircleIcon fontSize="small" />,
                  onClick: () => addItem(getUniqueNumber(), decisionKey, item.key)
                },
                {
                  text: i18next.t("calculator.remove_scenario"),
                  icon: <DeleteIcon fontSize="small" />,
                  onClick: () => removeItem(decisionKey, item.key)
                }
              ]}
            />
          }
          style={{
            borderLeft: `10px solid ${color}`
          }}
        />
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="caption">
              {i18next.t(isMobile ? "calculator.probability_short" : "calculator.probability")}
            </Typography>
            <div style={{ display: "flex" }}>
              <IconButton
                onClick={() => toggleIndependent(decisionKey, item.key)}
                size="small"
                style={{ marginRight: ".2rem" }}
              >
                {item.isIndependent ? (
                  <LockIcon fontSize="small" style={{ color: color }} />
                ) : (
                  <LockOpenIcon fontSize="small" />
                )}
              </IconButton>
              <ValidatedProbabilityField onChange={handleProbabilityChange} value={item.probability} />
            </div>
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
                  margin: "1rem 0 .5rem 0",
                  justifyContent: "space-between",
                  alignItems: "flex-end"
                }}
              >
                <Typography variant="caption" display="block" gutterBottom>
                  {i18next.t("calculator.value")}
                </Typography>
                <div style={{ display: "flex" }}>
                  <IconButton
                    onClick={() => toggleClose(decisionKey, item.key)}
                    size="small"
                    style={{ marginRight: ".2rem" }}
                  >
                    {item.isClosed ? (
                      <LockIcon fontSize="small" style={{ color: color }} />
                    ) : (
                      <LockOpenIcon fontSize="small" />
                    )}
                  </IconButton>
                  <ValidatedValueField onChange={handleValueChange} value={item.value} />
                </div>
              </div>
              <GrowingSlider onChange={handleValueChange} value={item.value} />
            </>
          ) : (
            <>
              <Typography variant="caption" display="block" style={{ marginTop: "1rem" }} gutterBottom>
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

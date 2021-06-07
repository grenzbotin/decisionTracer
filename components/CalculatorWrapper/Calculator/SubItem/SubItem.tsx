import { Card, Grid, CardContent, Typography, IconButton, Button } from "@material-ui/core";
import MuiCardHeader from "@material-ui/core/CardHeader";
import { withStyles } from "@material-ui/core/styles";
import i18next from "i18next";
import React, { useContext, useState } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";

import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { SubItem as SubItemType } from "@/../lib/presets";
import CaseItem from "../CaseItem";
import { applyFormatting, getHasChangeableSiblings, getUniqueNumber } from "@/../lib/helpers";
import EditableTitle from "@/../components/elements/EditableTitle";
import ValidatedProbabilityField from "@/../components/elements/ValidatedProbabilityField";
import NonLinearSlider from "@/../components/elements/NonLinearSlider";
import ValidatedValueField from "@/../components/elements/ValidatedValueField";
import GrowingSlider from "@/../components/elements/GrowingSlider";
import Dialog from "@/../components/elements/Dialog";
import { getHelperDialog } from "../constants";
import CustomIcon from "@/../assets/CustomIcon";

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
  const {
    setTitle,
    setProbabilityByKey,
    setValue,
    removeItem,
    addItem,
    toggleIndependent,
    toggleIntersecting,
    toggleClose,
    active
  } = useContext(GlobalDecisionContext);

  const [popUp, setPopUp] = useState(null);

  const handleProbabilityChange = (value: number): void => {
    setProbabilityByKey(value, decisionKey, item.key);
  };

  const handleValueChange = (value: number): void => {
    setValue(value, decisionKey, item.key);
  };

  const handlePopUpClose = (): void => {
    setPopUp(null);
  };

  const isProbabilityChangeable = item.isProbabilityIntersecting
    ? getHasChangeableSiblings(active.decisions, decisionKey, item.key)
    : true;

  return (
    <>
      {popUp && (
        <Dialog open={popUp !== null}>
          <Dialog.Header onClose={handlePopUpClose}>{i18next.t("calculator.helper_title")}</Dialog.Header>
          <Dialog.Body>{getHelperDialog(popUp, { handleClose: handlePopUpClose })}</Dialog.Body>
        </Dialog>
      )}
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
              <IconButton onClick={() => removeItem(decisionKey, item.key)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            }
            style={{
              borderLeft: `10px solid ${color}`
            }}
          />
          <CardContent>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="caption">{i18next.t("calculator.probability_short")}</Typography>
              <div style={{ display: "flex" }}>
                <IconButton
                  size="small"
                  onClick={() => toggleIntersecting(decisionKey, item.key)}
                  style={{
                    marginRight: ".2rem",
                    color: item.isProbabilityIntersecting ? color : null
                  }}
                >
                  <CustomIcon fontSize="small" name="intersectioning" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => toggleIndependent(decisionKey, item.key)}
                  style={{ marginRight: ".2rem" }}
                >
                  {item.isProbabilityLocked ? (
                    <LockIcon fontSize="small" style={{ color: color }} />
                  ) : (
                    <LockOpenIcon fontSize="small" />
                  )}
                </IconButton>
                <ValidatedProbabilityField
                  disabled={!isProbabilityChangeable}
                  onChange={handleProbabilityChange}
                  value={item.probability}
                />
                {item.probabilityHelper && (
                  <Button
                    style={{
                      borderColor: color,
                      padding: 0,
                      color: "#fff",
                      marginLeft: ".2rem",
                      minWidth: "40px",
                      backgroundColor: color
                    }}
                    variant="outlined"
                    onClick={() => setPopUp(item.probabilityHelper)}
                    size="small"
                  >
                    Info
                  </Button>
                )}
              </div>
            </div>
            <NonLinearSlider
              disabled={!isProbabilityChangeable}
              marks={[
                { value: 0, label: 0 },
                { value: 0.0001, label: 0.0001 },
                { value: 0.1, label: 0.1 },
                { value: 1, label: 1 },
                { value: 20, label: 20 },
                { value: 50, label: 50 },
                { value: 100, label: 100 }
              ]}
              steps={1000}
              onChange={(value: number) => setProbabilityByKey(value, decisionKey, item.key)}
              style={{ color: isProbabilityChangeable ? color : "grey" }}
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
                    {applyFormatting(i18next.t("calculator.value"))}
                  </Typography>
                  <div style={{ display: "flex" }}>
                    <IconButton
                      onClick={() => toggleClose(decisionKey, item.key)}
                      size="small"
                      style={{ marginRight: ".2rem" }}
                    >
                      {item.isValueLocked ? (
                        <LockIcon fontSize="small" style={{ color: color }} />
                      ) : (
                        <LockOpenIcon fontSize="small" />
                      )}
                    </IconButton>
                    <ValidatedValueField onChange={handleValueChange} value={item.value} />
                    {item.valueHelper && (
                      <Button
                        style={{
                          borderColor: color,
                          padding: 0,
                          color: "#fff",
                          marginLeft: ".2rem",
                          minWidth: "40px",
                          backgroundColor: color
                        }}
                        variant="outlined"
                        onClick={() => setPopUp(item.valueHelper)}
                        size="small"
                      >
                        Info
                      </Button>
                    )}
                  </div>
                </div>
                <GrowingSlider onChange={handleValueChange} value={item.value} />
              </>
            ) : (
              <>
                <Typography variant="caption" display="block" style={{ marginTop: "1rem" }} gutterBottom>
                  {applyFormatting(i18next.t("calculator.subcases"))}
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
            <Button
              fullWidth
              variant="outlined"
              onClick={() => addItem(getUniqueNumber(), decisionKey, item.key)}
              startIcon={<AddCircleIcon />}
              style={{ margin: "1.5rem 0", borderColor: color, color: color }}
            >
              {i18next.t("calculator.add_case")}
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

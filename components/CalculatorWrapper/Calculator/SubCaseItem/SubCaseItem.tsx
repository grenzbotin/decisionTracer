import { Typography, AccordionDetails, IconButton, Button } from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import i18next from "i18next";
import { withStyles } from "@material-ui/core/styles";
import React, { useContext, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";

import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { SubCaseItem as SubCaseItemType } from "@/../lib/presets";
import EditableTitle from "@/../components/elements/EditableTitle";
import ValidatedProbabilityField from "@/../components/elements/ValidatedProbabilityField";
import NonLinearSlider from "@/../components/elements/NonLinearSlider";
import ValidatedValueField from "@/../components/elements/ValidatedValueField";
import GrowingSlider from "@/../components/elements/GrowingSlider";
import { applyFormatting, getHasChangeableSiblings, getRoundedValue } from "@/../lib/helpers";
import CustomIcon from "@/../assets/CustomIcon";
import Dialog from "@/../components/elements/Dialog";
import { getHelperDialog } from "../constants";

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:before": {
      display: "none"
    },
    "&$expanded": {
      margin: "auto"
    }
  }
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .02)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 30,
    "&$expanded": {
      minHeight: 30
    },
    padding: "0 .2rem"
  },
  content: {
    alignItems: "center",
    margin: "2px 0",
    "&$expanded": {
      margin: "2px 0"
    },
    padding: "0 .2rem"
  },
  expanded: {}
})(MuiAccordionSummary);

export default function SubCaseItem({
  itemKey,
  caseKey,
  subCaseItem,
  decisionKey,
  color,
  open = false,
  noBottomMargin = false
}: {
  itemKey: string;
  caseKey: string;
  subCaseItem: SubCaseItemType;
  decisionKey: string;
  color: string;
  open?: boolean;
  noBottomMargin?: boolean;
}): JSX.Element {
  const {
    setTitle,
    setProbabilityByKey,
    setValue,
    removeItem,
    toggleIndependent,
    toggleIntersecting,
    toggleClose,
    active
  } = useContext(GlobalDecisionContext);
  const [popUp, setPopUp] = useState(null);

  const handleProbabilityChange = (value: number): void => {
    setProbabilityByKey(value, decisionKey, itemKey, caseKey, subCaseItem.key);
  };

  const handleValueChange = (value: number): void => {
    setValue(value, decisionKey, itemKey, caseKey, subCaseItem.key);
  };

  const handlePopUpClose = (): void => {
    setPopUp(null);
  };

  const isProbabilityChangeable = subCaseItem.isProbabilityIntersecting
    ? getHasChangeableSiblings(active.decisions, decisionKey, itemKey, caseKey, subCaseItem.key)
    : true;

  return (
    <>
      {popUp && (
        <Dialog open={popUp !== null}>
          <Dialog.Header onClose={handlePopUpClose}>Helper</Dialog.Header>
          <Dialog.Body>{getHelperDialog(popUp, { handleClose: handlePopUpClose })}</Dialog.Body>
        </Dialog>
      )}
      <Accordion defaultExpanded={open} style={{ borderLeft: `1px solid ${color}`, marginBottom: noBottomMargin && 0 }}>
        <AccordionSummary
          color={color}
          expandIcon={<ExpandMoreIcon fontSize="small" />}
          IconButtonProps={{
            size: "small"
          }}
        >
          <EditableTitle
            alignItems="center"
            title={subCaseItem.title}
            onChange={(title: string) => setTitle(title, decisionKey, itemKey, caseKey, subCaseItem.key)}
            variant="caption"
            component="h4"
          />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", flex: 1 }}>
            <Typography variant="caption" display="block">
              {getRoundedValue((subCaseItem.value * subCaseItem.probability) / 100, 2)}
            </Typography>
            <IconButton
              style={{ marginLeft: ".2rem" }}
              size="small"
              onClick={() => removeItem(decisionKey, itemKey, caseKey, subCaseItem.key)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        </AccordionSummary>
        <AccordionDetails style={{ flexDirection: "column", padding: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="caption">{i18next.t("calculator.probability_short")}</Typography>
            <div style={{ display: "flex" }}>
              <IconButton
                size="small"
                onClick={() => toggleIntersecting(decisionKey, itemKey, caseKey, subCaseItem.key)}
                style={{
                  marginRight: ".2rem",
                  color: subCaseItem.isProbabilityIntersecting ? color : null
                }}
              >
                <CustomIcon fontSize="small" name="intersectioning" />
              </IconButton>
              <IconButton
                onClick={() => toggleIndependent(decisionKey, itemKey, caseKey, subCaseItem.key)}
                size="small"
                style={{ marginRight: ".5rem" }}
              >
                {subCaseItem.isProbabilityLocked ? (
                  <LockIcon fontSize="small" style={{ color: color }} />
                ) : (
                  <LockOpenIcon fontSize="small" />
                )}
              </IconButton>
              <ValidatedProbabilityField
                disabled={!isProbabilityChangeable}
                value={subCaseItem.probability}
                onChange={handleProbabilityChange}
              />
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
            onChange={(value: number) => setProbabilityByKey(value, decisionKey, itemKey, caseKey, subCaseItem.key)}
            style={{ color: isProbabilityChangeable ? color : "grey" }}
            value={subCaseItem.probability}
            numFormatter={(val: number) => Math.round(val)}
          />
          <div
            style={{ display: "flex", marginTop: "1.5rem", justifyContent: "space-between", alignItems: "flex-end" }}
          >
            <Typography variant="caption" display="block" gutterBottom>
              {applyFormatting(i18next.t("calculator.value"))}
            </Typography>
            <div style={{ display: "flex" }}>
              <IconButton
                onClick={() => toggleClose(decisionKey, itemKey, caseKey, subCaseItem.key)}
                size="small"
                style={{ marginRight: ".2rem" }}
              >
                {subCaseItem.isValueLocked ? (
                  <LockIcon fontSize="small" style={{ color: color }} />
                ) : (
                  <LockOpenIcon fontSize="small" />
                )}
              </IconButton>
              <ValidatedValueField onChange={handleValueChange} value={subCaseItem.value} />
              {subCaseItem.valueHelper && (
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
                  onClick={() => setPopUp(subCaseItem.valueHelper)}
                  size="small"
                >
                  Info
                </Button>
              )}
            </div>
          </div>
          <GrowingSlider value={subCaseItem.value} onChange={handleValueChange} />
        </AccordionDetails>
      </Accordion>
    </>
  );
}

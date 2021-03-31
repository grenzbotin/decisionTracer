import { Typography, AccordionDetails, IconButton } from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import i18next from "i18next";
import { withStyles } from "@material-ui/core/styles";
import React, { useContext } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";

import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { SubCaseItem as SubCaseItemType } from "@/../lib/presets";
import EditableTitle from "../CalculatorElements/EditableTitle";
import ValidatedProbabilityField from "../CalculatorElements/ValidatedProbabilityField";
import NonLinearSlider from "../CalculatorElements/NonLinearSlider";
import GrowingSlider from "../CalculatorElements/GrowingSlider";
import CardMenu from "../CalculatorElements/CardMenu";
import ValidatedValueField from "../CalculatorElements/ValidatedValueField";

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
  color
}: {
  itemKey: string;
  caseKey: string;
  subCaseItem: SubCaseItemType;
  decisionKey: string;
  color: string;
}): JSX.Element {
  const { setTitle, setProbability, setValue, removeItem, toggleIndependent, toggleClose } = useContext(
    GlobalDecisionContext
  );

  const handleProbabilityChange = (value: number): void => {
    setProbability(value, decisionKey, itemKey, caseKey, subCaseItem.key);
  };

  const handleValueChange = (value: number): void => {
    setValue(value, decisionKey, itemKey, caseKey, subCaseItem.key);
  };

  return (
    <Accordion style={{ borderLeft: `1px solid ${color}` }}>
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
            {((subCaseItem.value * subCaseItem.probability) / 100).toFixed(1)}
          </Typography>
          <CardMenu
            size="small"
            listContent={[
              {
                text: i18next.t("calculator.remove_sub_case"),
                icon: <DeleteIcon fontSize="small" />,
                onClick: () => removeItem(decisionKey, itemKey, caseKey, subCaseItem.key)
              }
            ]}
          />
        </div>
      </AccordionSummary>
      <AccordionDetails style={{ flexDirection: "column", padding: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="caption">{i18next.t("calculator.probability_short")}</Typography>
          <div>
            <IconButton
              onClick={() => toggleIndependent(decisionKey, itemKey, caseKey, subCaseItem.key)}
              size="small"
              style={{ marginRight: ".5rem" }}
            >
              {subCaseItem.isIndependent ? (
                <LockIcon fontSize="small" style={{ color: color }} />
              ) : (
                <LockOpenIcon fontSize="small" />
              )}
            </IconButton>
            <ValidatedProbabilityField value={subCaseItem.probability} onChange={handleProbabilityChange} />
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
          onChange={(value: number) => setProbability(value, decisionKey, itemKey, caseKey, subCaseItem.key)}
          style={{ color: color }}
          value={subCaseItem.probability}
          numFormatter={(val: number) => Math.round(val)}
        />
        <div style={{ display: "flex", marginTop: "1.5rem", justifyContent: "space-between", alignItems: "flex-end" }}>
          <Typography variant="caption" display="block" gutterBottom>
            {i18next.t("calculator.value")}
          </Typography>
          <div style={{ display: "flex" }}>
            <IconButton
              onClick={() => toggleClose(decisionKey, itemKey, caseKey, subCaseItem.key)}
              size="small"
              style={{ marginRight: ".2rem" }}
            >
              {subCaseItem.isClosed ? (
                <LockIcon fontSize="small" style={{ color: color }} />
              ) : (
                <LockOpenIcon fontSize="small" />
              )}
            </IconButton>
            <ValidatedValueField onChange={handleValueChange} value={subCaseItem.value} />
          </div>
        </div>
        <GrowingSlider value={subCaseItem.value} onChange={handleValueChange} />
      </AccordionDetails>
    </Accordion>
  );
}

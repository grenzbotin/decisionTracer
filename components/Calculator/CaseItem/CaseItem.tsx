import { Typography, AccordionDetails } from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import i18next from "i18next";
import { withStyles } from "@material-ui/core/styles";
import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { SubItem as SubItemType } from "@/../lib/presets";
import EditableTitle from "../CalculatorElements/EditableTitle";
import ValidatedInputField from "../CalculatorElements/ValidatedInputField";
import NonLinearSlider from "../CalculatorElements/NonLinearSlider";
import GrowingSlider from "../CalculatorElements/GrowingSlider";

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
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 40,
    "&$expanded": {
      minHeight: 40
    }
  },
  content: {
    alignItems: "center",
    margin: "2px 0",
    "&$expanded": {
      margin: "2px 0"
    }
  },
  expanded: {}
})(MuiAccordionSummary);

export default function CaseItem({
  itemKey,
  decisionKey,
  caseItem,
  color
}: {
  itemKey: string;
  caseItem: SubItemType;
  decisionKey: string;
  color: string;
}): JSX.Element {
  const { setTitle, setProbability, setValue, removeItem } = useContext(GlobalDecisionContext);

  const handleProbabilityChange = (value: number): void => {
    setProbability(value, decisionKey, itemKey, caseItem.key);
  };

  const handleValueChange = (value: number): void => {
    setValue(value, decisionKey, itemKey, caseItem.key);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon fontSize="small" />}>
        <EditableTitle
          alignItems="center"
          title={caseItem.title}
          onChange={(title: string) => setTitle(title, decisionKey, itemKey, caseItem.key)}
          variant="subtitle2"
          component="h4"
        />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", flex: 1 }}>
          {caseItem.value} ({caseItem.probability.toFixed(3)}%)
          <IconButton
            aria-label="remove scenario"
            component="span"
            onClick={() => removeItem(decisionKey, itemKey, caseItem.key)}
          >
            <DeleteForeverIcon fontSize="small" color="inherit" />
          </IconButton>
        </div>
      </AccordionSummary>
      <AccordionDetails style={{ flexDirection: "column", padding: "1rem 2rem" }}>
        <div style={{ display: "flex", marginTop: "2rem", justifyContent: "space-between", alignItems: "flex-end" }}>
          <Typography variant="caption">{i18next.t("calculator.probability")}</Typography>
          <ValidatedInputField value={caseItem.probability} onChange={handleProbabilityChange} />
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
          onChange={(value: number) => setProbability(value, decisionKey, itemKey, caseItem.key)}
          style={{ color: color }}
          value={caseItem.probability}
          numFormatter={(val: number) => Math.round(val)}
        />
        <Typography variant="caption" display="block" style={{ marginTop: "1.5rem" }} gutterBottom>
          {i18next.t("calculator.value")}
        </Typography>
        <GrowingSlider value={caseItem.value} onChange={handleValueChange} />
      </AccordionDetails>
    </Accordion>
  );
}

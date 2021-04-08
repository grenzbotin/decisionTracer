import React, { useContext } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  Card,
  Divider,
  Grid,
  withStyles
} from "@material-ui/core";
import i18next from "i18next";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";

import { generateColors } from "../../theme";
import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { Decision as DecisionType } from "@/../lib/presets";
import { getResult, getRoundedValue } from "@/../lib/helpers";
import CustomIcon from "@/../assets/CustomIcon";

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)"
  },
  content: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  expanded: {}
})(MuiAccordionSummary);

export default function Calculation(): JSX.Element {
  const { active } = useContext(GlobalDecisionContext);
  const decisions = active.decisions as DecisionType[];

  const colors = generateColors(decisions.length);

  return (
    <>
      <Grid item xs={12}>
        {decisions.map((decision, b) => (
          <Accordion key={decision.key} defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
              aria-controls={`${decision.title}-content`}
              id={`${decision.title}-header`}
              style={{ backgroundColor: colors[b], color: "#fff" }}
            >
              <div style={{ alignItems: "center", display: "flex" }}>
                {decision.icon ? (
                  <CustomIcon fontSize="default" name={decision.icon} style={{ marginRight: "1rem" }} />
                ) : (
                  <TurnedInNotIcon fontSize="default" style={{ marginRight: "1rem" }} />
                )}
                {decision.title}
              </div>
              <div>
                {i18next.t("calculator.value")}: {getResult(decision)}
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {decision.sub.map((sub, i) => (
                  <Grid container item key={sub.key}>
                    <Grid item xs={12}>
                      <Card variant="outlined" style={{ padding: ".5rem", backgroundColor: `${colors[b]}1A` }}>
                        {sub.title}
                        <Grid container item style={{ marginTop: "1rem" }}>
                          {sub.cases.map((c, l) => (
                            <Grid
                              key={c.key}
                              item
                              xs={12}
                              style={{
                                marginTop: "1rem",
                                marginLeft: "1rem"
                              }}
                            >
                              <Card variant="outlined" style={{ padding: ".5rem", backgroundColor: `${colors[b]}1A` }}>
                                {c.title}
                                <Grid container item>
                                  {c.subCases.map((sc, k) => (
                                    <Grid
                                      key={sc.key}
                                      item
                                      xs={12}
                                      style={{
                                        marginTop: "1rem",
                                        marginLeft: "1rem"
                                      }}
                                    >
                                      <Card
                                        variant="outlined"
                                        style={{ padding: ".5rem", backgroundColor: `${colors[b]}1A` }}
                                      >
                                        {sc.title}
                                        <Divider style={{ margin: ".5rem 0" }} />
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                          <DragHandleIcon style={{ color: colors[b] }} />{" "}
                                          {getRoundedValue(sc.probability, 3)}% * {getRoundedValue(sc.value, 3)}{" "}
                                          <DragHandleIcon style={{ color: colors[b] }} />{" "}
                                          {getRoundedValue((sc.probability / 100) * sc.value, 3)}
                                        </div>
                                      </Card>
                                      <Grid
                                        item
                                        xs={12}
                                        style={{ marginTop: "1rem", alignItems: "center", display: "flex" }}
                                      >
                                        {k === c.subCases.length - 1 ? (
                                          <>
                                            <DragHandleIcon style={{ color: colors[b] }} />
                                            {getRoundedValue(c.value, 3)}
                                          </>
                                        ) : (
                                          <AddIcon style={{ color: colors[b] }} />
                                        )}
                                      </Grid>
                                    </Grid>
                                  ))}
                                  {c.subCases.length === 0 && (
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                      <DragHandleIcon style={{ color: colors[b] }} />
                                      {getRoundedValue(c.value, 3)} * {getRoundedValue(c.probability, 3)}%{" "}
                                      <DragHandleIcon style={{ color: colors[b] }} />
                                      {getRoundedValue((c.probability / 100) * c.value, 3)}
                                    </div>
                                  )}
                                </Grid>
                              </Card>
                              <Grid item xs={12} style={{ marginTop: "1rem", alignItems: "center", display: "flex" }}>
                                {l === sub.cases.length - 1 ? (
                                  <>
                                    <DragHandleIcon style={{ color: colors[b] }} />
                                    {getRoundedValue(sub.value, 3)} * {getRoundedValue(sub.probability, 3)}%{" "}
                                    <DragHandleIcon style={{ color: colors[b] }} />
                                    {getRoundedValue((sub.probability / 100) * sub.value, 3)}
                                  </>
                                ) : (
                                  <AddIcon style={{ color: colors[b] }} />
                                )}
                              </Grid>
                            </Grid>
                          ))}
                          {sub.cases.length === 0 && (
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <DragHandleIcon style={{ color: colors[b] }} />
                              {getRoundedValue(sub.value, 3)} * {getRoundedValue(sub.probability, 3)}%{" "}
                              <DragHandleIcon style={{ color: colors[b] }} />
                              {getRoundedValue((sub.probability / 100) * sub.value, 3)}
                            </div>
                          )}
                        </Grid>
                      </Card>
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: "1rem", alignItems: "center", display: "flex" }}>
                      {i === decision.sub.length - 1 ? (
                        <DragHandleIcon style={{ color: colors[b] }} />
                      ) : (
                        <AddIcon style={{ color: colors[b] }} />
                      )}
                      {i === decision.sub.length - 1 && getResult(decision)}
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid>
    </>
  );
}

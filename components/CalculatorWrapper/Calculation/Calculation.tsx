import React, { Fragment, useContext } from "react";
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
import { applyFormatting, getResult, getRoundedValue } from "@/../lib/helpers";
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
              {applyFormatting(i18next.t("calculator.expected_utility"))}: {getResult(decision)}
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {decision.sub.map((sub, i) => (
                <Grid container item key={sub.key}>
                  <Grid item xs={12}>
                    <Card variant="outlined" style={{ padding: ".5rem", backgroundColor: `${colors[b]}1A` }}>
                      {sub.title}
                      <Grid container item>
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
                                        {getRoundedValue(sc.probability, 2)}% * {getRoundedValue(sc.value, 2)}{" "}
                                        <DragHandleIcon style={{ color: colors[b] }} />{" "}
                                        {getRoundedValue((sc.probability / 100) * sc.value, 2)}
                                      </div>
                                    </Card>
                                    <Grid
                                      item
                                      xs={12}
                                      style={{
                                        marginTop: "1rem",
                                        flexWrap: "wrap",
                                        alignItems: "center",
                                        display: "flex"
                                      }}
                                    >
                                      {k !== c.subCases.length - 1 && <AddIcon style={{ color: colors[b] }} />}
                                    </Grid>
                                  </Grid>
                                ))}
                                <div style={{ alignItems: "center", display: "flex" }}>
                                  {c.subCases.map((sc, k) => (
                                    <Fragment key={sc.key}>
                                      {getRoundedValue((sc.probability / 100) * sc.value, 2)}
                                      {k === c.subCases.length - 1 ? (
                                        <>
                                          <DragHandleIcon style={{ color: colors[b] }} />
                                          {getRoundedValue(c.value, 2)}
                                        </>
                                      ) : (
                                        <AddIcon style={{ color: colors[b] }} />
                                      )}
                                    </Fragment>
                                  ))}
                                </div>
                                {/* result */}
                                <Grid
                                  item
                                  xs={12}
                                  style={{
                                    marginTop: "1rem",
                                    flexWrap: "wrap",
                                    alignItems: "center",
                                    display: "flex"
                                  }}
                                >
                                  {getRoundedValue(c.value, 2)} * {getRoundedValue(c.probability, 2)}%
                                  <DragHandleIcon style={{ color: colors[b] }} />{" "}
                                  {getRoundedValue((c.probability / 100) * c.value, 2)}
                                </Grid>
                              </Grid>
                            </Card>
                            <Grid
                              item
                              xs={12}
                              style={{ marginTop: "1rem", flexWrap: "wrap", alignItems: "center", display: "flex" }}
                            >
                              {l !== sub.cases.length - 1 && <AddIcon style={{ color: colors[b] }} />}
                            </Grid>
                          </Grid>
                        ))}
                        <Grid
                          item
                          xs={12}
                          style={{ marginTop: "1rem", flexWrap: "wrap", alignItems: "center", display: "flex" }}
                        >
                          {sub.cases.map((c, k) => (
                            <Fragment key={c.key}>
                              {getRoundedValue((c.probability / 100) * c.value, 2)}
                              {k === sub.cases.length - 1 ? (
                                <>
                                  <DragHandleIcon style={{ color: colors[b] }} />
                                  {getRoundedValue(sub.value, 2)}
                                </>
                              ) : (
                                <AddIcon style={{ color: colors[b] }} />
                              )}
                            </Fragment>
                          ))}
                        </Grid>
                        <Grid item xs={12} style={{ alignItems: "center", display: "flex" }}>
                          {getRoundedValue(sub.value, 3)} * {getRoundedValue(sub.probability, 2)}%
                          <DragHandleIcon style={{ color: colors[b] }} />{" "}
                          {getRoundedValue((sub.probability / 100) * sub.value, 2)}
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{ marginTop: "1rem", flexWrap: "wrap", alignItems: "center", display: "flex" }}
                  >
                    {i !== decision.sub.length - 1 && <AddIcon style={{ color: colors[b] }} />}
                  </Grid>
                </Grid>
              ))}
              <Grid item xs={12} style={{ alignItems: "center", display: "flex" }}>
                {decision.sub.map((sub, k) => (
                  <Fragment key={sub.key}>
                    {getRoundedValue((sub.probability / 100) * sub.value, 2)}
                    {k === decision.sub.length - 1 ? (
                      <>
                        <DragHandleIcon style={{ color: colors[b] }} />
                        {getResult(decision)}
                      </>
                    ) : (
                      <AddIcon style={{ color: colors[b] }} />
                    )}
                  </Fragment>
                ))}
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Grid>
  );
}

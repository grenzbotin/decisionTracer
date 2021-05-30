import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import i18next from "i18next";

import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { applyFormatting, getPresetValueByField } from "@/../lib/helpers";
import ValidatedValueField from "@/../components/elements/ValidatedValueField";
import CustomTooltip from "@/../components/elements/CustomTooltip";
import { CoronaPresetContext } from "./CoronaPresetContextProvider";

export default function ValuesProgressionSelection(): JSX.Element {
  const i18nPrefix = "presets.corona.questionnaire.3b";
  const { active, setValue } = useContext(GlobalDecisionContext);
  const { valuesProgression, setValuesByStep } = useContext(CoronaPresetContext);
  const [tasks, setTasks] = useState([]);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    // Ensure to change one by one
    if (tasks.length > 0) {
      if (tasks[0].length > 3) {
        if (
          typeof getPresetValueByField(active.decisions, "value", tasks[0][1], tasks[0][2], tasks[0][3]) === "number"
        ) {
          setValue(tasks[0][0], tasks[0][1], tasks[0][2], tasks[0][3]).then(
            (val: boolean) => val && setTasks((tasks) => tasks.slice(1))
          );
        } else {
          tasks.slice(1);
        }
      } else {
        if (typeof getPresetValueByField(active.decisions, "value", tasks[0][1], tasks[0][2]) === "number") {
          setValue(tasks[0][0], tasks[0][1], tasks[0][2]).then(
            (val: boolean) => val && setTasks((tasks) => tasks.slice(1))
          );
        } else {
          tasks.slice(1);
        }
      }
    }
  }, [tasks, active, setValue]);

  const tableData = [
    {
      type: "type1",
      hospitalised: 5,
      "severely-hospitalised": 10,
      death: 500,
      "vaccination-damage": 150
    },
    {
      type: "type2",
      hospitalised: 8,
      "severely-hospitalised": 20,
      death: 200,
      "vaccination-damage": 150
    },
    valuesProgression
  ];

  const tableColumns = Object.keys(tableData[0]);

  const handleSave = (key: number): void => {
    // setup tasks
    const tasks: Array<Array<string | number | number[]>> = [
      [
        tableData[key].hospitalised * -14,
        "unvaccinated",
        "unvaccinated-infection",
        "unvaccinated-infection-hospitalised"
      ],
      [
        tableData[key]["severely-hospitalised"] * -14,
        "unvaccinated",
        "unvaccinated-infection",
        "unvaccinated-infection-severely-hospitalised"
      ],
      [tableData[key].death * -14, "unvaccinated", "unvaccinated-infection", "unvaccinated-infection-death"],
      [tableData[key].hospitalised * -14, "vaccinated", "vaccinated-infection", "vaccinated-infection-hospitalised"],
      [
        tableData[key]["severely-hospitalised"] * -14,
        "vaccinated",
        "vaccinated-infection",
        "vaccinated-infection-severely-hospitalised"
      ],
      [tableData[key].death * -14, "vaccinated", "vaccinated-infection", "vaccinated-infection-death"],
      [tableData[key]["vaccination-damage"] * -14, "vaccinated", "vaccinated-vaccination_damage"]
    ];
    setTasks(tasks);
  };

  return (
    <>
      <Container maxWidth="lg" style={{ padding: 0 }}>
        <Typography variant="h6" gutterBottom>
          {i18next.t(`${i18nPrefix}.title`)}
        </Typography>
        <Typography variant="body1">
          {i18next.t(`${i18nPrefix}.subtitle`)}{" "}
          <CustomTooltip
            content={
              <>
                {i18next
                  .t(`${i18nPrefix}.tooltip`)
                  .split("\n")
                  .map((c) => (
                    <Typography key={c} variant="caption" component="p" style={{ marginBottom: ".4rem" }}>
                      {applyFormatting(c)}
                    </Typography>
                  ))}
              </>
            }
          />
        </Typography>
        {isTablet ? (
          <Grid container spacing={2} style={{ marginTop: "1.5rem" }}>
            {tableData.map((item, key) => (
              <Grid key={item.type} item sm={4} xs={12}>
                <Card style={{ padding: "1rem" }}>
                  <Typography variant="body2" style={{ fontWeight: 500 }}>
                    {i18next.t(`${i18nPrefix}.calc.${item.type}`)}
                  </Typography>
                  <Divider style={{ margin: "1rem 0" }} />
                  <Typography variant="caption" component="p" gutterBottom>
                    {i18next.t(`${i18nPrefix}.calc.hospitalised`)}:
                  </Typography>
                  {item.type === "typecustom" ? (
                    <>
                      <ValidatedValueField
                        value={valuesProgression["hospitalised"]}
                        onChange={(value) =>
                          setValuesByStep({ ...valuesProgression, hospitalised: value }, "valuesProgression")
                        }
                        onlyPositive
                      />
                      <br />
                    </>
                  ) : (
                    <Typography variant="caption" style={{ fontSize: "1.2rem", fontWeight: 400, marginRight: ".2rem" }}>
                      {item.hospitalised}
                    </Typography>
                  )}
                  <Typography variant="caption" style={{ fontSize: "0.7rem" }}>
                    {i18next.t(`${i18nPrefix}.calc.x_times_worse`)}
                  </Typography>
                  <Typography variant="caption" component="p" gutterBottom style={{ marginTop: "1.5rem" }}>
                    {i18next.t(`${i18nPrefix}.calc.severely-hospitalised`)}:
                  </Typography>
                  {item.type === "typecustom" ? (
                    <>
                      <ValidatedValueField
                        value={valuesProgression["severely-hospitalised"]}
                        onChange={(value) =>
                          setValuesByStep({ ...valuesProgression, "severely-hospitalised": value }, "valuesProgression")
                        }
                        onlyPositive
                      />
                      <br />
                    </>
                  ) : (
                    <Typography variant="caption" style={{ fontSize: "1.2rem", fontWeight: 400, marginRight: ".2rem" }}>
                      {item["severely-hospitalised"]}
                    </Typography>
                  )}
                  <Typography variant="caption" style={{ fontSize: "0.7rem" }}>
                    {i18next.t(`${i18nPrefix}.calc.x_times_worse`)}
                  </Typography>
                  <Typography variant="caption" component="p" gutterBottom style={{ marginTop: "1.5rem" }}>
                    {i18next.t(`${i18nPrefix}.calc.death`)}:
                  </Typography>
                  {item.type === "typecustom" ? (
                    <>
                      <ValidatedValueField
                        value={valuesProgression["death"]}
                        onChange={(value) =>
                          setValuesByStep({ ...valuesProgression, death: value }, "valuesProgression")
                        }
                        onlyPositive
                      />
                      <br />
                    </>
                  ) : (
                    <Typography variant="caption" style={{ fontSize: "1.2rem", fontWeight: 400, marginRight: ".2rem" }}>
                      {item.death}
                    </Typography>
                  )}
                  <Typography variant="caption" style={{ fontSize: "0.7rem" }}>
                    {i18next.t(`${i18nPrefix}.calc.x_times_worse`)}
                  </Typography>
                  <Typography variant="caption" component="p" gutterBottom style={{ marginTop: "1.5rem" }}>
                    {i18next.t(`${i18nPrefix}.calc.vaccination-damage`)}:
                  </Typography>
                  {item.type === "typecustom" ? (
                    <>
                      <ValidatedValueField
                        value={valuesProgression["vaccination-damage"]}
                        onChange={(value) =>
                          setValuesByStep({ ...valuesProgression, "vaccination-damage": value }, "valuesProgression")
                        }
                        onlyPositive
                      />
                      <br />
                    </>
                  ) : (
                    <Typography variant="caption" style={{ fontSize: "1.2rem", fontWeight: 400, marginRight: ".2rem" }}>
                      {item["vaccination-damage"]}
                    </Typography>
                  )}
                  <Typography variant="caption" style={{ fontSize: "0.7rem" }}>
                    {i18next.t(`${i18nPrefix}.calc.x_times_worse`)}
                  </Typography>
                  <Divider style={{ margin: "1rem 0" }} />
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button size="small" color="primary" variant="contained" onClick={() => handleSave(key)}>
                      {i18next.t("presets.corona.save")}
                    </Button>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <TableContainer component={Paper} style={{ marginTop: "2rem" }}>
            <Table aria-label="Type selection">
              <TableHead>
                <TableRow>
                  {tableColumns.map((key) =>
                    key === "type" ? (
                      <TableCell key={key} />
                    ) : (
                      <TableCell style={{ minWidth: 120 }} align="center" key={key}>
                        {i18next.t(`${i18nPrefix}.calc.${key}`)}
                      </TableCell>
                    )
                  )}
                  <TableCell key="action" />
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row, key) => (
                  <TableRow key={row.type}>
                    {tableColumns.map((key) =>
                      key === "type" ? (
                        <TableCell key={row[key]} component="th" scope="row" style={{ fontSize: "0.8rem" }}>
                          {i18next.t(`${i18nPrefix}.calc.${row[key]}`)}
                        </TableCell>
                      ) : (
                        <TableCell key={`${key}-${key}`}>
                          <div style={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
                            <Typography variant="subtitle1" component="div" style={{ fontSize: "1.2rem" }}>
                              {row.type === "typecustom" ? (
                                <ValidatedValueField
                                  value={valuesProgression[key]}
                                  onChange={(value) =>
                                    setValuesByStep({ ...valuesProgression, [key]: value }, "valuesProgression")
                                  }
                                  onlyPositive
                                />
                              ) : (
                                row[key]
                              )}
                            </Typography>
                            <Typography variant="caption" component="div" style={{ fontSize: "0.7rem" }}>
                              {i18next.t(`${i18nPrefix}.calc.x_times_worse`)}
                            </Typography>
                          </div>
                        </TableCell>
                      )
                    )}
                    <TableCell key={`action-${row.type}`}>
                      <Button size="small" color="primary" variant="contained" onClick={() => handleSave(key)}>
                        {i18next.t("presets.corona.save")}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </>
  );
}

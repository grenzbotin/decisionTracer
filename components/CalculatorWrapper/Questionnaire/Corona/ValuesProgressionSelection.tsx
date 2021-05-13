import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";
import i18next from "i18next";

import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { applyFormatting, getPresetValueByField } from "@/../lib/helpers";
import ValidatedValueField from "@/../components/elements/ValidatedValueField";
import CustomTooltip from "@/../components/elements/CustomTooltip";

export default function ValuesProgressionSelection(): JSX.Element {
  const i18nPrefix = "presets.corona.questionnaire.3b";
  const { active, setValue } = useContext(GlobalDecisionContext);
  const [tasks, setTasks] = useState([]);
  const [custom, setCustom] = useState({
    type: "typecustom",
    hospitalised: 10,
    "severely-hospitalised": 30,
    death: 500,
    "vaccination-damage": 50
  });

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
    custom
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
      <Typography variant="h6" gutterBottom>
        {i18next.t(`${i18nPrefix}.title`)}
      </Typography>
      <Container maxWidth="md" style={{ marginTop: "1rem", padding: 0 }}>
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
        <TableContainer component={Paper} style={{ marginTop: "2rem" }}>
          <Table aria-label="Type selection">
            <TableHead>
              <TableRow>
                {tableColumns.map((key) =>
                  key === "type" ? (
                    <TableCell key={key} />
                  ) : (
                    <TableCell align="center" key={key}>
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
                      <TableCell key={row[key]} component="th" scope="row">
                        {i18next.t(`${i18nPrefix}.calc.${row[key]}`)}
                      </TableCell>
                    ) : (
                      <TableCell key={`${key}-${key}`}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Typography variant="subtitle1" component="div" style={{ fontSize: "1.5rem" }}>
                            {row.type === "typecustom" ? (
                              <ValidatedValueField
                                value={custom[key]}
                                onChange={(value) => setCustom({ ...custom, [key]: value })}
                              />
                            ) : (
                              row[key]
                            )}
                          </Typography>
                          <Typography variant="caption" component="div" style={{ marginLeft: ".5rem" }}>
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
      </Container>
    </>
  );
}

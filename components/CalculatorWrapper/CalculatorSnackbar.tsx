import { useContext, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import i18next from "i18next";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { GlobalUiContext } from "@/../hooks/GlobalUiContextProvider";

function Alert(props: AlertProps): JSX.Element {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CalculatorSnackbar(): JSX.Element {
  const { active } = useContext(GlobalDecisionContext);
  const { expert } = useContext(GlobalUiContext);
  const [open, setOpen] = useState(true);

  return (
    expert &&
    active.key === "corona" && (
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={open} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="info">
          {i18next.t("presets.corona.video_tutorial_snackbar")}
        </Alert>
      </Snackbar>
    )
  );
}

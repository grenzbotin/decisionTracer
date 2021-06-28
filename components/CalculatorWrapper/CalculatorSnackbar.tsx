import { useContext, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import i18next from "i18next";

import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { GlobalUiContext } from "@/../hooks/GlobalUiContextProvider";

export default function CalculatorSnackbar(): JSX.Element {
  const { active } = useContext(GlobalDecisionContext);
  const { expert } = useContext(GlobalUiContext);
  const [open, setOpen] = useState(true);

  return (
    expert &&
    active.key === "corona" && (
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        onClose={() => setOpen(false)}
        message={i18next.t("presets.corona.video_tutorial_snackbar")}
      />
    )
  );
}

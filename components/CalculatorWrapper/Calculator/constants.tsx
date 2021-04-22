import PersonalData from "../Questionnaire/Corona/PersonalData";
import ProbabilityInfection from "../Questionnaire/Corona/ProbabilityInfection";
import ProbabilityVaccinationDamage from "../Questionnaire/Corona/ProbabilityVaccinationDamage";
import ValuesProgression from "../Questionnaire/Corona/ValuesProgression";

export function getHelperDialog(mode: string, props: Record<string, undefined | (() => void)>): JSX.Element {
  switch (mode) {
    case "coronaProbabilityInfection":
      return <ProbabilityInfection {...props} />;
    case "coronaPersonalData":
      return <PersonalData {...props} />;
    case "coronaValuesProgression":
      return <ValuesProgression {...props} />;
    case "coronaProbabilityVaccinationDamage":
      return <ProbabilityVaccinationDamage {...props} />;
    default:
      return null;
  }
}

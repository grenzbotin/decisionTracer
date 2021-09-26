import ProbabilityInfection from "../Questionnaire/Corona/HelperDialogs/ProbabilityInfection";
import ProbabilityVaccinationDamage from "../Questionnaire/Corona/HelperDialogs/ProbabilityVaccinationDamage";
import ValuesProgression from "../Questionnaire/Corona/HelperDialogs/ValuesProgression";
import PersonalDataSelectedInfo from "../Questionnaire/Corona/HelperDialogs/PersonalDataSelectedInfo";
import PersonalDataVaccinationInfo from "../Questionnaire/Corona/HelperDialogs/PersonalDataVaccinationInfo";

export function getHelperDialog(mode: string, props: Record<string, undefined | (() => void)>): JSX.Element {
  switch (mode) {
    case "coronaProbabilityInfection":
      return <ProbabilityInfection {...props} />;
    case "coronaValuesProgression":
      return <ValuesProgression {...props} />;
    case "coronaProbabilityVaccinationDamage":
      return <ProbabilityVaccinationDamage {...props} />;
    case "coronaPersonalDataSelectedInfo":
      return <PersonalDataSelectedInfo {...props} />;
    case "coronaPersonalDataVaccinationInfo":
      return <PersonalDataVaccinationInfo {...props} />;
    default:
      return null;
  }
}

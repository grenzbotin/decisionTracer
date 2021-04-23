import ProbabilityInfection from "../Questionnaire/Corona/ProbabilityInfection";
import ProbabilityVaccinationDamage from "../Questionnaire/Corona/ProbabilityVaccinationDamage";
import ValuesProgression from "../Questionnaire/Corona/ValuesProgression";
import PersonalDataSelectedInfo from "../Questionnaire/Corona/PersonalDataSelectedInfo";
import PersonalDataVaccinationInfo from "../Questionnaire/Corona/PersonalDataVaccinationInfo";

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

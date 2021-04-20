export interface SubCaseItem {
  key: string;
  title: string;
  probability: number;
  value: number;
  isIndependent?: boolean;
  isClosed?: boolean;
}

export interface CaseItem {
  key: string;
  title: string;
  probability: number;
  probabilityHelper?: string;
  value: number;
  valueHelper?: string;
  isIndependent?: boolean;
  isClosed?: boolean;
  subCases?: SubCaseItem[];
}

export interface SubItem {
  key: string;
  title: string;
  probability: number;
  probabilityHelper?: string;
  value: number;
  valueHelper?: string;
  isIndependent?: boolean;
  isClosed?: boolean;
  cases?: CaseItem[];
}

export interface Decision {
  key: string;
  title: string;
  icon?: string;
  sub?: SubItem[];
}

export interface Resource {
  title: string;
  link: string;
}

export interface Preset {
  key: string;
  title: string;
  description: string;
  image?: string;
  icon?: string;
  url?: string;
  question?: string;
  resources?: Resource[];
  decisions: Decision[];
}

const CORONA_PRESET = {
  key: "corona",
  title: "presets.corona.title",
  url: "corona",
  icon: "virus",
  image: "virus",
  question: "presets.corona.question",
  description: "presets.corona.description",
  resources: [{ title: "title", link: "link" }],
  decisions: [
    {
      key: "unvaccinated",
      title: "presets.corona.decisions.unvaccinated.title",
      icon: "noVaccination",
      sub: [
        {
          key: "unvaccinated-noInfection",
          title: "presets.corona.decisions.unvaccinated.sub.noInfection.title",
          probability: 0,
          value: 0,
          cases: [] as CaseItem[]
        },
        {
          key: "unvaccinated-infection",
          title: "presets.corona.decisions.unvaccinated.sub.infection.title",
          probability: 0,
          probabilityHelper: 'coronaProbabilityInfection',
          value: -28.15,
          cases: [
            {
              key: "unvaccinated-infection-asymptomatic",
              title: "presets.corona.decisions.unvaccinated.sub.infection.cases.asymptomatic.title",
              probability: 24.47296093845960000,
              probabilityHelper: 'coronaPersonalData',
              value: 0,
              valueHelper: 'coronaValuesProgression',
              isIndependent: true,
              subCases: [] as SubCaseItem[]
            },
            {
              key: "unvaccinated-infection-mild",
              title: "presets.corona.decisions.unvaccinated.sub.infection.cases.mild.title",
              probability: 70.94414076894730000,
              probabilityHelper: 'coronaPersonalData',
              value: -14,
              valueHelper: 'coronaValuesProgression',
              isIndependent: true,
              subCases: [] as SubCaseItem[]
            },
            {
              key: "unvaccinated-infection-hospitalised",
              title: "presets.corona.decisions.unvaccinated.sub.infection.cases.hospitalised.title",
              probability: 4.08234553494657000,
              probabilityHelper: 'coronaPersonalData',
              value: -200,
              valueHelper: 'coronaValuesProgression',
              isIndependent: true,
              subCases: [] as SubCaseItem[]
            },
            {
              key: "unvaccinated-infection-severely-hospitalised",
              title: "presets.corona.decisions.unvaccinated.sub.infection.cases.severelyHospitalised.title",
              probability: 0.25296339516030000,
              probabilityHelper: 'coronaPersonalData',
              value: -400,
              valueHelper: 'coronaValuesProgression',
              isIndependent: true,
              subCases: [] as SubCaseItem[],
            },
            {
              key: "unvaccinated-infection-death",
              title: "presets.corona.decisions.unvaccinated.sub.infection.cases.death.title",
              probability: 0.24758936248618100,
              probabilityHelper: 'coronaPersonalData',
              value: -3650,
              valueHelper: 'coronaValuesProgression',
              isIndependent: true,
              subCases: [] as SubCaseItem[]
            }
          ]
        }
      ]
    },
    {
      key: "vaccinated",
      title: "presets.corona.decisions.vaccinated.title",
      icon: "vaccination",
      sub: [
        {
          key: "vaccinated-noInfection",
          title: "presets.corona.decisions.vaccinated.sub.noInfection.title",
          probability: 0,
          value: 0,
          cases: [] as CaseItem[]
        },
        {
          key: "vaccinated-infection",
          title: "presets.corona.decisions.vaccinated.sub.infection.title",
          probability: 0,
          probabilityHelper: 'coronaProbabilityInfection',
          value: -28.15,
          cases: [
            {
              key: "vaccinated-infection-asymptomatic",
              title: "presets.corona.decisions.vaccinated.sub.infection.cases.asymptomatic.title",
              probability: 24.47296093845960000,
              probabilityHelper: 'coronaPersonalData',
              value: 0,
              valueHelper: 'coronaValuesProgression',
              isIndependent: true,
              subCases: [] as SubCaseItem[]
            },
            {
              key: "vaccinated-infection-mild",
              title: "presets.corona.decisions.vaccinated.sub.infection.cases.mild.title",
              probability: 70.94414076894730000,
              probabilityHelper: 'coronaPersonalData',
              value: -14,
              valueHelper: 'coronaValuesProgression',
              isIndependent: true,
              subCases: [] as SubCaseItem[]
            },
            {
              key: "vaccinated-infection-hospitalised",
              title: "presets.corona.decisions.vaccinated.sub.infection.cases.hospitalised.title",
              probability: 4.08234553494657000,
              probabilityHelper: 'coronaPersonalData',
              value: -200,
              valueHelper: 'coronaValuesProgression',
              isIndependent: true,
              subCases: [] as SubCaseItem[]
            },
            {
              key: "vaccinated-infection-severely-hospitalised",
              title: "presets.corona.decisions.vaccinated.sub.infection.cases.severelyHospitalised.title",
              probability: 0.25296339516030000,
              probabilityHelper: 'coronaPersonalData',
              value: -400,
              valueHelper: 'coronaValuesProgression',
              isIndependent: true,
              subCases: [] as SubCaseItem[],
            },
            {
              key: "vaccinated-infection-death",
              title: "presets.corona.decisions.vaccinated.sub.infection.cases.death.title",
              probability: 0.24758936248618100,
              probabilityHelper: 'coronaPersonalData',
              value: -3650,
              valueHelper: 'coronaValuesProgression',
              isIndependent: true,
              subCases: [] as SubCaseItem[]
            }
          ]
        },
        {
          key: "vaccinated-vaccination_damage",
          title: "presets.corona.decisions.vaccinated.sub.vaccinationDamage.title",
          probability: 0,
          probabilityHelper: 'coronaProbabilityVaccinationDamage',
          value: 0,
          isIndependent: true,
          cases: [] as CaseItem[]
        }
      ]
    }
  ]
};

const COIN_TOSS = {
  key: "coin-toss",
  title: "presets.coin-toss.title",
  url: "coin-toss",
  icon: "coin",
  image: "coin",
  question: "presets.coin-toss.question",
  description: "presets.coin-toss.description",
  decisions: [
    {
      key: "game-1",
      title: "presets.coin-toss.decisions.0.title",
      sub: [
        {
          key: "game-1-head",
          title: "presets.coin-toss.decisions.0.sub.0.title",
          probability: 50,
          value: 10,
          cases: [] as CaseItem[]
        },
        {
          key: "game-1-tail",
          title: "presets.coin-toss.decisions.0.sub.1.title",
          probability: 50,
          value: 0,
          cases: [] as CaseItem[]
        }
      ]
    },
    {
      key: "no-game",
      title: "presets.coin-toss.decisions.1.title",
      sub: [
        {
          key: "no-game-keep",
          title: "presets.coin-toss.decisions.1.sub.0.title",
          probability: 100,
          value: 5,
          cases: [] as CaseItem[]
        }
      ]
    },
    {
      key: "game-2",
      title: "presets.coin-toss.decisions.2.title",
      sub: [
        {
          key: "game-2-head",
          title: "presets.coin-toss.decisions.2.sub.0.title",
          probability: 53,
          value: 12,
          cases: [] as CaseItem[]
        },
        {
          key: "game-2-tail",
          title: "presets.coin-toss.decisions.2.sub.1.title",
          probability: 47,
          value: -2,
          cases: [] as CaseItem[]
        }
      ]
    }
  ]
};

const CUSTOM_PRESET = {
  key: "custom",
  title: "presets.custom.title",
  url: "custom",
  icon: "custom",
  image: "custom",
  question: "presets.custom.question",
  description: "presets.custom.description",
  decisions: [] as Decision[]
};

const PRESETS = <Preset[]>[COIN_TOSS, CORONA_PRESET, CUSTOM_PRESET];

export { PRESETS };

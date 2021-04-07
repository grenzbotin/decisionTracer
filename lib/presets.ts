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
  value: number;
  isIndependent?: boolean;
  isClosed?: boolean;
  subCases?: SubCaseItem[];
}

export interface SubItem {
  key: string;
  title: string;
  probability: number;
  value: number;
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
      title: "presets.corona.decisions.0.title",
      icon: "noVaccination",
      sub: [
        {
          key: "unvaccinated-noInfection",
          title: "presets.corona.decisions.0.sub.0.title",
          probability: 0,
          value: 0,
          cases: [] as CaseItem[]
        },
        {
          key: "unvaccinated-infection",
          title: "presets.corona.decisions.0.sub.1.title",
          probability: 0,
          value: 0,
          cases: [
            {
              key: "unvaccinated-infection-asymptomatic",
              title: "presets.corona.decisions.0.sub.1.cases.0.title",
              probability: 50,
              value: 0,
              isIndependent: true,
              subCases: [] as SubCaseItem[]
            },
            {
              key: "unvaccinated-infection-mild",
              title: "presets.corona.decisions.0.sub.1.cases.1.title",
              probability: 35,
              value: -14,
              isIndependent: true,
              subCases: [] as SubCaseItem[]
            },
            {
              key: "unvaccinated-infection-difficult",
              title: "presets.corona.decisions.0.sub.1.cases.2.title",
              probability: 14.99,
              value: -200,
              isIndependent: true,
              subCases: [] as SubCaseItem[]
            },
            {
              key: "unvaccinated-infection-death",
              title: "presets.corona.decisions.0.sub.1.cases.3.title",
              probability: 0.01,
              value: -3650,
              isIndependent: true,
              subCases: [] as SubCaseItem[]
            }
          ]
        }
      ]
    },
    {
      key: "vaccinated",
      title: "presets.corona.decisions.1.title",
      icon: "vaccination",
      sub: [
        {
          key: "vaccinated-noInfection",
          title: "presets.corona.decisions.1.sub.0.title",
          probability: 0,
          value: 0,
          cases: [] as CaseItem[]
        },
        {
          key: "vaccinated-infection",
          title: "presets.corona.decisions.1.sub.1.title",
          probability: 0,
          value: 0,
          cases: [
            {
              key: "vaccinated-infection-asymptomatic",
              title: "presets.corona.decisions.0.sub.1.cases.0.title",
              probability: 80,
              value: 0,
              isIndependent: true,
              subCases: [] as SubCaseItem[]
            },
            {
              key: "vaccinated-infection-mild",
              title: "presets.corona.decisions.0.sub.1.cases.1.title",
              probability: 19.9999,
              value: -14,
              isIndependent: true,
              subCases: [] as SubCaseItem[]
            },
            {
              key: "vaccinated-infection-difficult",
              title: "presets.corona.decisions.0.sub.1.cases.2.title",
              probability: 0.00009,
              value: -200,
              isIndependent: true,
              subCases: [] as SubCaseItem[]
            },
            {
              key: "vaccinated-infection-death",
              title: "presets.corona.decisions.0.sub.1.cases.3.title",
              probability: 0.00001,
              value: -3650,
              isIndependent: true,
              subCases: [] as SubCaseItem[]
            }
          ]
        },
        {
          key: "vaccinated-vaccination_damage",
          title: "presets.corona.decisions.1.sub.2.title",
          probability: 0,
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

const CORONA_PRESET_2 = {
  key: "corona-2",
  title: "presets.corona-2.title",
  url: "corona-2",
  icon: "virus",
  image: "virus",
  question: "presets.corona-2.question",
  description: "presets.corona-2.description",
  resources: [{ title: "title", link: "link" }],
  decisions: [
    {
      key: "unvaccinated",
      title: "presets.corona-2.decisions.0.title",
      icon: "noVaccination",
      sub: [
        {
          key: "unvaccinated-noInfection",
          title: "presets.corona-2.decisions.0.sub.0.title",
          probability: 0,
          value: 0,
          cases: [] as CaseItem[]
        },
        {
          key: "unvaccinated-infection",
          title: "presets.corona-2.decisions.0.sub.1.title",
          probability: 0,
          value: 0,
          cases: [
            {
              key: "unvaccinated-infection-asymptomatic",
              title: "presets.corona-2.decisions.0.sub.1.cases.0.title",
              probability: 0,
              value: 0,
              subCases: [] as SubCaseItem[]
            },
            {
              key: "unvaccinated-infection-mild",
              title: "presets.corona-2.decisions.0.sub.1.cases.1.title",
              probability: 0,
              value: 0,
              subCases: [
                {
                  key: "unvaccinated-infection-mild-subcase-0",
                  title: "presets.corona-2.decisions.0.sub.1.cases.1.subcases.0.title",
                  probability: 0,
                  value: 0
                },
                {
                  key: "unvaccinated-infection-mild-subcase-1",
                  title: "presets.corona-2.decisions.0.sub.1.cases.1.subcases.1.title",
                  probability: 0,
                  value: 0
                },
                {
                  key: "unvaccinated-infection-mild-subcase-2",
                  title: "presets.corona-2.decisions.0.sub.1.cases.1.subcases.2.title",
                  probability: 0,
                  value: 0
                }
              ]
            },
            {
              key: "unvaccinated-infection-difficult",
              title: "presets.corona-2.decisions.0.sub.1.cases.2.title",
              probability: 0,
              value: 0,
              subCases: [
                {
                  key: "unvaccinated-infection-difficult-subcase-0",
                  title: "presets.corona-2.decisions.0.sub.1.cases.2.subcases.0.title",
                  probability: 0,
                  value: 0
                },
                {
                  key: "unvaccinated-infection-difficult-subcase-1",
                  title: "presets.corona-2.decisions.0.sub.1.cases.2.subcases.1.title",
                  probability: 0,
                  value: 0
                },
                {
                  key: "unvaccinated-infection-difficult-subcase-2",
                  title: "presets.corona-2.decisions.0.sub.1.cases.2.subcases.2.title",
                  probability: 0,
                  value: 0
                }
              ]
            },
            {
              key: "unvaccinated-infection-death",
              title: "presets.corona-2.decisions.0.sub.1.cases.3.title",
              probability: 0,
              value: 0,
              subCases: [] as SubCaseItem[]
            }
          ]
        },
        {
          key: "unvaccinated-sub-2",
          title: "presets.corona-2.decisions.0.sub.2.title",
          probability: 0,
          value: 0,
          isIndependent: true,
          cases: [] as CaseItem[]
        },
        {
          key: "unvaccinated-sub-3",
          title: "presets.corona-2.decisions.0.sub.3.title",
          probability: 0,
          value: 0,
          isIndependent: true,
          cases: [] as CaseItem[]
        }
      ]
    },
    {
      key: "vaccinated",
      title: "presets.corona-2.decisions.1.title",
      icon: "vaccination",
      sub: [
        {
          key: "vaccinated-noInfection",
          title: "presets.corona-2.decisions.1.sub.0.title",
          probability: 0,
          value: 0,
          cases: [] as CaseItem[]
        },
        {
          key: "vaccinated-infection",
          title: "presets.corona-2.decisions.1.sub.1.title",
          probability: 0,
          value: 0,
          cases: [
            {
              key: "vaccinated-infection-asymptomatic",
              title: "presets.corona-2.decisions.1.sub.1.cases.0.title",
              probability: 0,
              value: 0,
              subCases: [] as SubCaseItem[]
            },
            {
              key: "vaccinated-infection-mild",
              title: "presets.corona-2.decisions.1.sub.1.cases.1.title",
              probability: 0,
              value: 0,
              subCases: [
                {
                  key: "vaccinated-infection-mild-subcase-0",
                  title: "presets.corona-2.decisions.1.sub.1.cases.1.subcases.0.title",
                  probability: 0,
                  value: 0
                },
                {
                  key: "vaccinated-infection-mild-subcase-1",
                  title: "presets.corona-2.decisions.1.sub.1.cases.1.subcases.1.title",
                  probability: 0,
                  value: 0
                },
                {
                  key: "vaccinated-infection-mild-subcase-2",
                  title: "presets.corona-2.decisions.1.sub.1.cases.1.subcases.2.title",
                  probability: 0,
                  value: 0
                }
              ]
            },
            {
              key: "vaccinated-infection-difficult",
              title: "presets.corona-2.decisions.1.sub.1.cases.2.title",
              probability: 0,
              value: 0,
              subCases: [
                {
                  key: "vaccinated-infection-difficult-subcase-0",
                  title: "presets.corona-2.decisions.1.sub.1.cases.2.subcases.0.title",
                  probability: 0,
                  value: 0
                },
                {
                  key: "vaccinated-infection-difficult-subcase-1",
                  title: "presets.corona-2.decisions.1.sub.1.cases.2.subcases.1.title",
                  probability: 0,
                  value: 0
                },
                {
                  key: "vaccinated-infection-difficult-subcase-2",
                  title: "presets.corona-2.decisions.1.sub.1.cases.2.subcases.2.title",
                  probability: 0,
                  value: 0
                }
              ]
            },
            {
              key: "vaccinated-infection-death",
              title: "presets.corona-2.decisions.1.sub.1.cases.3.title",
              probability: 0,
              value: 0,
              subCases: [] as SubCaseItem[]
            }
          ]
        },
        {
          key: "vaccinated-vaccination_damage",
          title: "presets.corona-2.decisions.1.sub.2.title",
          probability: 0,
          value: 0,
          cases: [] as CaseItem[]
        },
        {
          key: "vaccinated-sub-3",
          title: "presets.corona-2.decisions.1.sub.3.title",
          probability: 0,
          value: 0,
          isIndependent: true,
          cases: [] as CaseItem[]
        },
        {
          key: "vaccinated-sub-4",
          title: "presets.corona-2.decisions.1.sub.4.title",
          probability: 0,
          value: 0,
          isIndependent: true,
          cases: [] as CaseItem[]
        },
        {
          key: "vaccinated-sub-5",
          title: "presets.corona-2.decisions.1.sub.5.title",
          probability: 0,
          value: 0,
          isIndependent: true,
          cases: [] as CaseItem[]
        },
        {
          key: "vaccinated-sub-6",
          title: "presets.corona-2.decisions.1.sub.6.title",
          probability: 0,
          value: 0,
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

const PRESETS = <Preset[]>[COIN_TOSS, CORONA_PRESET, CORONA_PRESET_2, CUSTOM_PRESET];

export { PRESETS };

export interface SubCaseItem {
  key: string;
  title: string;
  probability: number;
  value: number;
  isIndependent?: boolean;
  isClosed?: boolean,
}

export interface CaseItem {
  key: string;
  title: string;
  probability: number;
  value: number;
  isIndependent?: boolean;
  isClosed?: boolean,
  subCases?: SubCaseItem[], 
}

export interface SubItem {
  key: string;
  title: string;
  probability: number;
  value: number;
  isIndependent?: boolean;
  isClosed?: boolean,
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
  icon?: string;
  url?: string;
  question?: string;
  resources?: Resource[];
  decisions: Decision[];
}

const CORONA_PRESET = {
  key: 'corona',
  title: "presets.corona.title",
  url: 'corona',
  icon:'virus',
  question: "presets.corona.question",
  description: "presets.corona.description",
  resources: [{ title: "title", link: "link" }],
  decisions: [
    {
      key: "main-0",
      title: "presets.corona.decisions.0.title",
      icon: 'noVaccination',
      sub: [
        {
          key: "main-0-sub-0",
          title: "presets.corona.decisions.0.sub.0.title",
          probability: 0,
          value: 0,
          cases: [] as CaseItem[]
        },
        {
          key: "main-0-sub-1",
          title: "presets.corona.decisions.0.sub.1.title",
          probability: 0,
          value: 0,
          cases: [
            {
              key: "main-0-sub-1-case-0",
              title: "presets.corona.decisions.0.sub.1.cases.0.title",
              probability: 0,
              value: 0,
              subCases: [] as SubCaseItem[],
            },
            {
              key: "main-0-sub-1-case-1",
              title: "presets.corona.decisions.0.sub.1.cases.1.title",
              probability: 0,
              value: 0,
              subCases: [] as SubCaseItem[],
            },
            {
              key: "main-0-sub-1-case-2",
              title: "presets.corona.decisions.0.sub.1.cases.2.title",
              probability: 0,
              value: 0,
              subCases: [] as SubCaseItem[],
            },
            {
              key: "main-0-sub-1-case-3",
              title: "presets.corona.decisions.0.sub.1.cases.3.title",
              probability: 0,
              value: 0,
              subCases: [] as SubCaseItem[],
            }
          ]
        }
      ]
    },
    {
      key: "main-1",
      title: "presets.corona.decisions.1.title",
      icon: 'vaccination',
      sub: [
        {
          key: "main-1-sub-0",
          title: "presets.corona.decisions.1.sub.0.title",
          probability: 0,
          value: 1000,
          cases: [] as CaseItem[]
        },
        {
          key: "main-1-sub-1",
          title: "presets.corona.decisions.1.sub.1.title",
          probability: 0,
          value: 0,
          cases: [
            {
              key: "main-1-sub-1-case-0",
              title: "presets.corona.decisions.0.sub.1.cases.0.title",
              probability: 0,
              value: 0,
              subCases: [] as SubCaseItem[],
            },
            {
              key: "main-1-sub-1-case-1",
              title: "presets.corona.decisions.0.sub.1.cases.1.title",
              probability: 0,
              value: 0,
              subCases: [] as SubCaseItem[],
            },
            {
              key: "main-1-sub-1-case-2",
              title: "presets.corona.decisions.0.sub.1.cases.2.title",
              probability: 0,
              value: 0,
              subCases: [] as SubCaseItem[],
            },
            {
              key: "main-1-sub-1-case-3",
              title: "presets.corona.decisions.0.sub.1.cases.3.title",
              probability: 0,
              value: 0,
              subCases: [] as SubCaseItem[],
            }
          ]
        },
        {
          key: "main-1-sub-2",
          title: "presets.corona.decisions.1.sub.2.title",
          probability: 0,
          value: 0,
          isIndependent: true,
          cases: [] as CaseItem[]
        },
      ]
    }
  ]
};

const CORONA_PRESET_2 = {
  key: 'corona-2',
  title: "presets.corona-2.title",
  url: 'corona-2',
  icon:'virus',
  question: "presets.corona-2.question",
  description: "presets.corona-2.description",
  resources: [{ title: "title", link: "link" }],
  decisions: [
    {
      key: "decision-0",
      title: "presets.corona-2.decisions.0.title",
      icon: 'noVaccination',
      sub: [
        {
          key: "decision-0-sub-0",
          title: "presets.corona-2.decisions.0.sub.0.title",
          probability: 0,
          value: 0,
          cases: [] as CaseItem[]
        },
        {
          key: "decision-0-sub-1",
          title: "presets.corona-2.decisions.0.sub.1.title",
          probability: 0,
          value: 0,
          cases: [
            {
              key: "decision-0-sub-1-case-0",
              title: "presets.corona-2.decisions.0.sub.1.cases.0.title",
              probability: 0,
              value: 0,
              subCases: [] as SubCaseItem[],
            },
            {
              key: "decision-0-sub-1-case-1",
              title: "presets.corona-2.decisions.0.sub.1.cases.1.title",
              probability: 0,
              value: 0,
              subCases: [
                {
                  key: "decision-0-sub-1-case-1-subcase-0",
                  title: "presets.corona-2.decisions.0.sub.1.cases.1.subcases.0.title",
                  probability: 0,
                  value: 0,
                },
                {
                  key: "decision-0-sub-1-case-1-subcase-1",
                  title: "presets.corona-2.decisions.0.sub.1.cases.1.subcases.1.title",
                  probability: 0,
                  value: 0,
                },
                {
                  key: "decision-0-sub-1-case-1-subcase-2",
                  title: "presets.corona-2.decisions.0.sub.1.cases.1.subcases.2.title",
                  probability: 0,
                  value: 0,
                }
              ],
            },
            {
              key: "decision-0-sub-1-case-2",
              title: "presets.corona-2.decisions.0.sub.1.cases.2.title",
              probability: 0,
              value: 0,
              subCases: [
                {
                  key: "decision-0-sub-1-case-2-subcase-0",
                  title: "presets.corona-2.decisions.0.sub.1.cases.2.subcases.0.title",
                  probability: 0,
                  value: 0,
                },
                {
                  key: "decision-0-sub-1-case-2-subcase-1",
                  title: "presets.corona-2.decisions.0.sub.1.cases.2.subcases.1.title",
                  probability: 0,
                  value: 0,
                },
                {
                  key: "decision-0-sub-1-case-2-subcase-2",
                  title: "presets.corona-2.decisions.0.sub.1.cases.2.subcases.2.title",
                  probability: 0,
                  value: 0,
                }
              ],
            },
            {
              key: "decision-0-sub-1-case-3",
              title: "presets.corona-2.decisions.0.sub.1.cases.3.title",
              probability: 0,
              value: 0,
              subCases: [] as SubCaseItem[],
            }
          ]
        },
        {
          key: "decision-0-sub-2",
          title: "presets.corona-2.decisions.0.sub.2.title",
          probability: 0,
          value: 0,
          isIndependent: true,
          cases: [] as CaseItem[]
        },
        {
          key: "decision-0-sub-3",
          title: "presets.corona-2.decisions.0.sub.3.title",
          probability: 0,
          value: 0,
          isIndependent: true,
          cases: [] as CaseItem[]
        },
      ]
    },
    {
      key: "decision-1",
      title: "presets.corona-2.decisions.1.title",
      icon: 'vaccination',
      sub: [
        {
          key: "decision-1-sub-0",
          title: "presets.corona-2.decisions.1.sub.0.title",
          probability: 0,
          value: 0,
          cases: [] as CaseItem[]
        },
        {
          key: "decision-1-sub-1",
          title: "presets.corona-2.decisions.1.sub.1.title",
          probability: 0,
          value: 0,
          cases: [
            {
              key: "decision-1-sub-1-case-0",
              title: "presets.corona-2.decisions.1.sub.1.cases.0.title",
              probability: 0,
              value: 0,
              subCases: [] as SubCaseItem[],
            },
            {
              key: "decision-1-sub-1-case-1",
              title: "presets.corona-2.decisions.1.sub.1.cases.1.title",
              probability: 0,
              value: 0,
              subCases: [
                {
                  key: "decision-1-sub-1-case-1-subcase-0",
                  title: "presets.corona-2.decisions.1.sub.1.cases.1.subcases.0.title",
                  probability: 0,
                  value: 0,
                },
                {
                  key: "decision-1-sub-1-case-1-subcase-1",
                  title: "presets.corona-2.decisions.1.sub.1.cases.1.subcases.1.title",
                  probability: 0,
                  value: 0,
                },
                {
                  key: "decision-1-sub-1-case-1-subcase-2",
                  title: "presets.corona-2.decisions.1.sub.1.cases.1.subcases.2.title",
                  probability: 0,
                  value: 0,
                }
              ],
            },
            {
              key: "decision-1-sub-1-case-2",
              title: "presets.corona-2.decisions.1.sub.1.cases.2.title",
              probability: 0,
              value: 0,
              subCases: [
                {
                  key: "decision-1-sub-1-case-2-subcase-0",
                  title: "presets.corona-2.decisions.1.sub.1.cases.2.subcases.0.title",
                  probability: 0,
                  value: 0,
                },
                {
                  key: "decision-1-sub-1-case-2-subcase-1",
                  title: "presets.corona-2.decisions.1.sub.1.cases.2.subcases.1.title",
                  probability: 0,
                  value: 0,
                },
                {
                  key: "decision-1-sub-1-case-2-subcase-2",
                  title: "presets.corona-2.decisions.1.sub.1.cases.2.subcases.2.title",
                  probability: 0,
                  value: 0,
                }
              ],
            },
            {
              key: "decision-1-sub-1-case-3",
              title: "presets.corona-2.decisions.1.sub.1.cases.3.title",
              probability: 0,
              value: 0,
              subCases: [] as SubCaseItem[],
            }
          ]
        },
        {
          key: "decision-1-sub-2",
          title: "presets.corona-2.decisions.1.sub.2.title",
          probability: 0,
          value: 0,
          cases: [] as CaseItem[]
        },
        {
          key: "decision-1-sub-3",
          title: "presets.corona-2.decisions.1.sub.3.title",
          probability: 0,
          value: 0,
          isIndependent: true,
          cases: [] as CaseItem[]
        },
        {
          key: "decision-1-sub-4",
          title: "presets.corona-2.decisions.1.sub.4.title",
          probability: 0,
          value: 0,
          isIndependent: true,
          cases: [] as CaseItem[]
        },
        {
          key: "decision-1-sub-5",
          title: "presets.corona-2.decisions.1.sub.5.title",
          probability: 0,
          value: 0,
          isIndependent: true,
          cases: [] as CaseItem[]
        },
        {
          key: "decision-1-sub-6",
          title: "presets.corona-2.decisions.1.sub.6.title",
          probability: 0,
          value: 0,
          cases: [] as CaseItem[]
        },
      ]
    }
  ]
};

const PRESETS = <Preset[]> [
  CORONA_PRESET,
  CORONA_PRESET_2
];

export {
  PRESETS,
}
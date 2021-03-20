interface CaseItem {
  key: string;
  title: string;
  probability: number;
  value: number;
}

interface SubItem {
  key: string;
  title: string;
  probability: number;
  value: number;
  cases?: Array<CaseItem>;
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
  title: string;
  decription: string;
  icon?: string;
  resources?: Resource[];
  decisions: Decision[];
}

const PRESETS = <Preset[]> [
  {
    title: "Soll ich mich impfen lassen?",
    decription: "Entscheidungshilfe",
    icon: null as string,
    resources: [{ title: "title", link: "link" }],
    decisions: [
      {
        key: "main-0",
        title: "Impfen",
        icon: null as string,
        sub: [
          {
            key: "sub-0",
            title: "Gesund",
            probability: 89,
            value: 1000,
            cases: [] as CaseItem[]
          },
          {
            key: "sub-1",
            title: "Krank",
            probability: 10,
            value: 1000,
            cases: [] as CaseItem[]
          },
          {
            key: "sub-3",
            title: "Tod",
            probability: 1,
            value: -1000,
            cases: [] as CaseItem[]
          }
        ]
      },
      {
        key: "main-1",
        title: "Nicht impfen",
        icon: null as string,
        sub: [
          {
            key: "main-1-sub-0",
            title: "Gesund",
            probability: 20,
            value: 20,
            cases: [] as CaseItem[]
          },
          {
            key: "main-1-sub-1",
            title: "Krank",
            probability: 70,
            value: -100,
            cases: [] as CaseItem[]
          },
          {
            key: "main-1-sub-2",
            title: "Tod",
            probability: 10,
            value: -1000,
            cases: [] as CaseItem[]
          }
        ]
      }
    ]
  }
];

export {
  PRESETS,
  
}
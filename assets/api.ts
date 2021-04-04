/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';

export interface CoronaData {
  cases: number,
  deaths: number,
  recovered: number,
  weekIncidence: number,
  casesPer100k: number,
  casesPerWeek: number,
  delta: {
    cases: number,
    deaths: number,
    recovered: number
  },
 r: {
    value: number,
    date: Date
  },
  meta: {
    source: string,
    contact: string,
    info: string,
    lastUpdate: Date,
    lastCheckedForUpdate: Date
  }
}

export function loadCoronaDataGermany(): Promise<AxiosResponse<CoronaData>> {
  return axios.get<CoronaData>('https://api.corona-zahlen.org/germany');
}

export function loadVaccinationDataGermany(): Promise<AxiosResponse<any>> {
  return axios.get<any>('https://api.corona-zahlen.org/vaccinations');
}
import { ImpressaoCDLoja } from "./impressaoCDLoja";

export const GET_NOTAS_A_IMPRIMIR = 'GET_NOTAS_A_IMPRIMIR';
export const GET_NOTAS_A_IMPRIMIR_SUCCESS = 'GET_NOTAS_A_IMPRIMIR_SUCCESS';


export interface notasAImprimirState {
    pendencias: NotasAImprimir[],
}


export interface NotasAImprimir {
    chaves: string[],
    usuario: number,
    filtros?: ImpressaoCDLoja
}

export interface GetNotasAImprimir {
    type: typeof GET_NOTAS_A_IMPRIMIR_SUCCESS,
    payload: NotasAImprimir[]
}


export type NotasAImprimirActions = NotasAImprimir;
import { GetNotaCDLoja, NotaCDLoja } from "./notas";
import { PendenciaCDLoja } from "./pendencias";

export const GET_NOTAIMPRESSAO_CDLOJA = 'GET_NOTAIMPRESSAO_CDLOJA';
export const GET_NOTAIMPRESSAO_CDLOJA_SUCCESS = 'GET_NOTAIMPRESSAO_CDLOJA_SUCCESS';


export interface notaImpressaoState {    
    nota: NotaImpressao[],
}
 

export interface NotaImpressao {
    pendencias: PendenciaCDLoja[],
    notas: NotaCDLoja[]
}

export interface GetNotaImpressao {
    type: typeof GET_NOTAIMPRESSAO_CDLOJA_SUCCESS,
    payload: NotaImpressao[]
}
 

export type notaImpressaoActions = GetNotaImpressao;
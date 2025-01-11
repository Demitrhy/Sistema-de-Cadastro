import { FilialDeposito } from "./filialDeposito";


export const GET_IMPRESSAO_NOTA_CDLOJA = 'GET_IMPRESSAO_NOTA_CDLOJA';
export const GET_IMPRESSAO_NOTA_CDLOJA_SUCCESS = 'GET_IMPRESSAO_NOTA_CDLOJA_SUCCESS';


export interface impressaoCDLojaState {    
    filtros: ImpressaoCDLoja[],
}
 

export interface ImpressaoCDLoja {
    dataInclusao: string,
    deposito?: number
    rotaId: number,
    filiais: number[],
    tipoPedido: string,
    tipoImpressao: number,
    imprimirCapa: boolean,
    faltantesImpressao: boolean
}

export interface GetImpressaoCDLoja {
    type: typeof GET_IMPRESSAO_NOTA_CDLOJA_SUCCESS,
    payload: ImpressaoCDLoja[]
}
 

export type impressaoCDLojaActions = GetImpressaoCDLoja;
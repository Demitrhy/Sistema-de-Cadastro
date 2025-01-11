export const GET_FILIAL = 'GET_FILIAL_DEPOSITO';
export const GET_FILIAL_SUCCESS = 'GET_FILIAL_DEPOSITO_SUCCESS';

export interface filialDepositoState {    
    filial: FilialDeposito[],
}
 

export interface FilialDeposito {
    codigoFilial: number,
    fantasiaFilial: string
    rotaId: number,
    rotaDescricao: string
}

export interface GetFilialDeposito {
    type: typeof GET_FILIAL_SUCCESS,
    payload: FilialDeposito[]
}
 

export type filialDepositoActions = GetFilialDeposito;
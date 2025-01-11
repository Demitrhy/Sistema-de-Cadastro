import { FilialDeposito } from "./filialDeposito";

export const GET_DEPOSITO = 'GET_DEPOSITO';
export const GET_DEPOSITO_SUCCESS = 'GET_DEPOSITO_SUCCESS';

export interface depositoState {    
    deposito: Deposito[],
}
 

export interface Deposito {
    codigoDeposito: number,
    fantasiaDeposito: string,
    contingencia: boolean,
    contingenciaSvc: boolean,
    filiais: FilialDeposito[]
}

export interface GetDeposito {
    type: typeof GET_DEPOSITO_SUCCESS,
    payload: Deposito[]
}
 

export type depositoActions = GetDeposito;
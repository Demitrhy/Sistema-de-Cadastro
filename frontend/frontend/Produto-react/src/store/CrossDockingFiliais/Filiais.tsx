export const GET_CROSSDOCKING_FILIAL = 'GET_CROSSDOCKING_FILIAL';
export const GET_CROSSDOCKING_FILIAL_SUCCESS = 'GET_CROSSDOCKING_FILIAL_SUCCESS';

export interface crossDockingFilialState {    
    crossDockingFilial: CrossDockingFilial[],
}
 

export interface CrossDockingFilial {
    codigoFilial: number,
    fantasiaFilial: string,
    codigoDeposito: number,
    fantasiaDeposito: string
}

export interface GetCrossDockingFilial {
    type: typeof GET_CROSSDOCKING_FILIAL_SUCCESS,
    payload: CrossDockingFilial[]
}
 

export type crossDockingFilialActions = GetCrossDockingFilial;
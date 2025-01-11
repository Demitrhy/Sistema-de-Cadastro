export const GET_CROSSDOCKING_GERADADOS = 'GET_CROSSDOCKING_GERADADOS';
export const GET_CROSSDOCKING_GERADADOS_SUCCESS = 'GET_CROSSDOCKING_GERADADOS_SUCCESS';

export interface crossDockingGeraDadosState {    
    crossDockingFilial: CrossDockingPendente[],
}
 

export interface CrossDockingPendente {
    pedido: number,
    deposito: number,
    filial: number,
    caixas: number,
    descricao: string
}

export interface GetCrossDockingGeraDados {
    type: typeof GET_CROSSDOCKING_GERADADOS_SUCCESS,
    payload: CrossDockingPendente[]
}
 

export type crossDockingGeraDadosActions = GetCrossDockingGeraDados;
export const GET_PEDIDOAVULSO = 'GET_PEDIDOAVULSO';
export const GET_PEDIDOAVULSO_SUCCESS = 'GET_PEDIDOAVULSO_SUCCESS';

export interface pedidoAvulsoState {    
    pedidoAvulso: pedidoAvulso[],
}
 

export interface pedidoAvulso {
    DiaMes: string,
    ValorSugestaoDia: string,
        
}

export interface GetpedidoAvulso {
    type: typeof GET_PEDIDOAVULSO_SUCCESS,
    payload: pedidoAvulso[]
}
 

export type pedidoAvulsoActions = GetpedidoAvulso;
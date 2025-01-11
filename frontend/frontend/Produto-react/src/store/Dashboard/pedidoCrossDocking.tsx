export const GET_PEDIDOS_CROSS_DOCKING = 'GET_PEDIDOS_CROSS_DOCKING';
export const GET_PEDIDOS_CROSS_DOCKING_SUCCESS = 'GET_PEDIDOS_CROSS_DOCKING_SUCCESS';

export interface pedidoCrossDocking {    
    pedidoCrossdocking: pedidoCrossDocking[],
}
 

export interface pedidoCrossDocking {
    filial: number,
    deposito: number,
    caixas: number,
    dataAcerto: string,
    dataRecebimentoCrossDocking: string       
}

export interface getPedidoCrossDocking {
    type: typeof GET_PEDIDOS_CROSS_DOCKING_SUCCESS,
    payload: pedidoCrossDocking[]
}
 

export type pedidoCrossDockingActions = getPedidoCrossDocking;
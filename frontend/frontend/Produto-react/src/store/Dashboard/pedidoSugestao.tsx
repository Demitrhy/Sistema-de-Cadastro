export const GET_PEDIDOSUGESTAO = 'GET_PEDIDOSUGESTAO';
export const GET_PEDIDOSUGESTAO_SUCCESS = 'GET_PEDIDOSUGESTAO_SUCCESS';

export interface pedidoSugestaoState {    
    autorizacoesEA: pedidoSugestao[],
}
 

export interface pedidoSugestao {
    DiaMes: string,
    ValorSugestaoDia: string,
        
}

export interface GetpedidoSugestao {
    type: typeof GET_PEDIDOSUGESTAO_SUCCESS,
    payload: pedidoSugestao[]
}
 

export type pedidoSugestaoActions = GetpedidoSugestao;
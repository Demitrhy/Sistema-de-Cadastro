export const GET_AUTORIZACOESEA = 'GET_AUTORIZACOESEA';
export const GET_AUTORIZACOESEA_SUCCESS = 'GET_AUTORIZACOESEA_SUCCESS';

export interface autorizacoesEAState {    
    autorizacoesEA: autorizacoesEA[],
}
 

export interface autorizacoesEA {
    id: number,
    deposito: number,
    filial: number,
    produto: number,
    descricao: string,
    ea: number,
    ea_atual: number,
    venda: number,
    venda3: number,
    venda2: number,
    venda1: number,
    usuario: number,
        
}

export interface GetautorizacoesEA {
    type: typeof GET_AUTORIZACOESEA_SUCCESS,
    payload: autorizacoesEA[]
}
 

export type autorizacoesEAActions = GetautorizacoesEA;

export const GET_PENDENCIAS_CD_LOJA = 'GET_PENDENCIAS_CD_LOJA';
export const GET_PENDENCIAS_CD_LOJA_SUCCESS = 'GET_PENDENCIAS_CD_LOJA_SUCCESS';


export interface pendenciaState {
    pendencias: PendenciaCDLoja[],
}


export interface PendenciaCDLoja {
    codigoFilial: number,
    pendencia: string
}

export interface GetPendenciaCDLoja {
    type: typeof GET_PENDENCIAS_CD_LOJA_SUCCESS,
    payload: PendenciaCDLoja[]
}


export type pendenciaCDLojaActions = PendenciaCDLoja;
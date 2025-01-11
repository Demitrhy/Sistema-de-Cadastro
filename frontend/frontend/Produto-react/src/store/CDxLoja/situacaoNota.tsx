export const GET_SITUACAO_NOTA = 'GET_SITUACAO_NOTA';
export const GET_SITUACAO_NOTA_SUCCESS = 'GET_SITUACAO_NOTA_SUCCESS';

export interface situacaoDepositoState {    
    situacaoNota: SituacaoNota[],
}
 

export interface SituacaoNota {
    dataInclusao: Date,
    codigoFilial: number,
    situacaoNota: string,
    quantidade: number
}

export interface GetSituacaoNotas {
    type: typeof GET_SITUACAO_NOTA_SUCCESS,
    payload: SituacaoNota[]
}
 

export type situacaoNotasActions = GetSituacaoNotas;
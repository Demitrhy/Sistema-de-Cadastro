export const GET_MOTIVO_DESATIVACAO_COMPRA_SUSPENSA = 'GET_MOTIVO_DESATIVACAO_COMPRA_SUSPENSA';
export const GET_MOTIVO_DESATIVACAO_COMPRA_SUSPENSA_SUCCESS = 'GET_MOTIVO_DESATIVACAO_COMPRA_SUSPENSA_SUCCESS';

export interface MotivoDesativacaoCompraSuspensa {
    id: number,
    descricao: string,
    necessitaData: boolean
}
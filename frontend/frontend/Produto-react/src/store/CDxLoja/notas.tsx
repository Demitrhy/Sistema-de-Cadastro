
export const GET_NOTA_CDLOJA = 'GET_NOTA_CDLOJA';
export const GET_NOTA_CDLOJA_SUCCESS = 'GET_NOTA_CDLOJA_SUCCESS';


export interface notaCDLojasState {    
    nota: NotaCDLoja[],
}
 

export interface NotaCDLoja {
    dataInclusao: string,
    codigoFilial: number,
    filial: string,
    usuario: number,
    sequencialNota: number,
    dataContingencia: string,
    numeroNota: number,
    chaveNfe: string,
    chaveCosmos: string,
    pedido: string,
    sequencialPedido: number,
}

export interface GetNotaCDLoja {
    type: typeof GET_NOTA_CDLOJA_SUCCESS,
    payload: NotaCDLoja[]
}
 

export type notaCDLojaActions = GetNotaCDLoja;
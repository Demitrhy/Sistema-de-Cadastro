export const STATUS_DOOTAX = 'STATUS_DOOTAX';
export const STATUS_DOOTAX_SUCCESS = 'STATUS_DOOTAX_SUCCESS';

export interface StatusPagamentoImposto {
    numNota: number,
    deposito: number,
    chaveNota: string,
    uf: string,
    filial:string,
    statusDootax: string
}
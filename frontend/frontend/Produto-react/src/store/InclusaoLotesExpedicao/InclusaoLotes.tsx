export interface LotesExpedicaoDto{
    produto: produto,
    lotes: lote[]
} 

export interface produto {
    sequencial: string,
    sequencialDet: string,
    deposito: string,
    filial: number,
    nota: number,
    produto: number,
    digito: number,
    quantidade: number
}

export interface lote{
    lote: string,
    fabricacao: string,
    vencimento: string,
    sequencial: number,
    sequencialDet: number
}

  
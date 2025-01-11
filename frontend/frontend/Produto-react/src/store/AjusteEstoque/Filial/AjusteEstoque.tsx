export interface ItemAjusteEstoque {
    documento: number,
    filial: number,
    cod_dv: number,
    descricao_produto: string,
    quantidade: number,
    sigla: string,
    erro: string,
    usuario: number,
    arquivoImportado: string
}

export interface AjusteEstoqueFilial {
    matricula: number,
    itens: ItemAjusteEstoque[]   
}

export interface Planilha {
    arquivo: string,
    dataImportado: string,
    usuarioImportou: string,
    dataAprovado: string,
    dataRejeitacao: string,
    usuarioFinal: string
}

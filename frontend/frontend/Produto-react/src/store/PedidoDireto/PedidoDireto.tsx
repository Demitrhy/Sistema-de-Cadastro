export interface PedidoDiretoDto {
    pedidoDiretoCab: PedidoDireto,
    pedidoDiretoDet: Produto[]
}
export interface PedidoDireto {
    codPedido: number,
    sequencial: number,
    codDeposito?: number,
    nomeFantasiaDeposito: string,
    codFilial?: number,
    nomeFantasiaFilial: string,
    solicitante?: string,
    // vendaGarantida: string,
    tipoPedido?: string,
    cadUsuario?: number,
    dataCadastro?: string,
    dataLiberacao?: string,
    pedidoRequisitado: boolean,
    observacao: string,
    itens: Produto[],
    somenteNota: boolean,
    dataAprovacaoANE: string,
    existeAme: boolean,
    aguardando: boolean,
    temNotaGerada?: boolean
}

export interface PesquisaParametrosPedidoDireto {
    pedido: number,
    codPedido: number,
    seqPedido: number,
    codDeposito: number,
    codFilial: number,
    nomeFantasiaFilial: string,
    dataCadastro: string,
    pendencia: string
}

export interface Produto {
    pedido: number,
    sequencial: number,
    codigo: number,
    codigoSemDv: number,
    descricao: string,
    deposito: number,
    precoVenda: number,
    precoPromocao?: number,
    estoqueFilial?: number,
    qntdPedida: number,
    qntdAtendida?: number,
    lote?: string,
    embalagemTP?: string,
    embalagemQntd?: number,
    dataVencimentoStr?: string,
    dataIniPromocStr?: string,
    dataFimPromocStr?: string,
    ap?: string,
    endereco?: string,
    enderecoID?: number,
    estoqueAlvo?: number,
    estoqueAtual?: number,
    estoqueTransito: number,
    estoqueAtualDeposito: number,
    usuarioAutorizadoAME: boolean,
    reprovadoAme?: string,
    estoqueTotalFilial: number,
    enviarEmail: boolean,
    tipoAme: number
}

export interface PedDiretoDetEnvioEmailDto {
    filial?: number,
    deposito?: number,
    codigo?: number,
    estoqueAtualDeposito?: number,
    quantidade?: number,
    descricao?: string,
    enviarEmail: boolean
}

export interface ProdutoSemLote {
    id: string,
    codigoDeposito: number,
    nomeFantasiaDeposito: string,
    numeroPedido: number,
    sequencialPedido: number,
    codigoProduto: number,
    codigoProdutoDv: string,
    descricaoProduto: string,
    quantidadePedida: number,
    idEnderecoProdutoDeposito: number,
    dataCadastro: string,
    codigoFilial: number
    lotes: Lote[]
}

export interface Lote {
    lote: string,
    dataFabricacao: string,
    dataVencimento: string,
    quantidadeItem: number
}

export interface LotesPorProduto {
    lote: string,
    fabricacao: string,
    vencimento: string,
    produto: number
}


export interface TipoUsuario {
    tipoUsuario: string,
    filial: number,
    nomeFantasiaFilial: string,
    deposito: number,
    nomeFantasiaDeposito: string,
    nomeUsuario: string
}

export interface Deposito {
    codigo: number,
    descricao: string
}

export interface Filial {
    codigo: number,
    descricao: string,
    depositoPrincipal: number,
    descricaoDeposito: string,
    filialDesativada?: boolean,
    pedidoBloqueado?: boolean
}

export interface PedidoDiretoAprovacaoAme {
    id: number,
    codPedido: number,
    sequencial: number
    codFilial: number
    codDeposito: number,
    solicitante: string,
    codProduto: number,
    descricaoProduto: string,
    quantPedida: string,
    usuario: number,
    produto: string,
    dataCadastro: string
}

export interface FiltroStatus {
    codFilial?: number,
    codDeposito?: number,
    dataCadastro?: Date,
    status?: PendenciaPedido[]
}

export enum PendenciaPedido {
    PendenteAME,
    PendenteLote,
    PendenteANE,
    PendenteLiberacaoCD,
    Finalizado
}

export interface PedidoDiretoPendente {
    pedido: string,
    codigoPedido: number,
    sequencial: number,
    filial: number,
    deposito: number,
    pendencia: string,
    status: PendenciaPedido,
    pedidoGerou: string,
    corPendencia: string,
    somenteNota: boolean,
    somenteNotaStr: string 
}

export interface PedidoDiretoImportacao {
    arquivo: string,
    filial: number,
    deposito: number,
    produto: any,
    quantidade: number
}

export interface Planilha {
    arquivo: string,
    usuario: number,
    pedido: number,
    sequencial: number,
    datahora: string 
    
}
export interface PedidoExcluido {
    filial: number
    pedido : number
    sequencial : number
    codUsuario : number
    nome: string
    dataHora : string
    motivo : string
}

export interface PedidoExluidoItens {
    produto:  number
    codigoProduto: number
    qtdAtendida: number
}

export interface DepositoBloqueadoInventario {
    id: number,
    deposito: number,
    depositoDescricao: string,
    dataCadastro: string,
    usuarioCadastro: string
}
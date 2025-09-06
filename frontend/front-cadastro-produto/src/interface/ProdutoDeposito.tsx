export interface ProdutoDeposito {
    estoqueAtual: number;
    estoqueEA: number;
    lote: string;
    validade: Date; 
}
export interface Produto {
    produto: number;
    digito: number;
    nome: string;
}

export interface Deposito {
      codigo: number;
    nome: string;
  }

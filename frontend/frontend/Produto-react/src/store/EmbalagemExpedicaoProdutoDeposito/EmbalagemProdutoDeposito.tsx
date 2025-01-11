export const GET_EMBALAGEM_PRODUTO_DEPOSITO = 'GET_EMBALAGEM_PRODUTO_DEPOSITO';
export const GET_EMBALAGEM_PRODUTO_DEPOSITO_SUCCESS = 'GET_EMBALAGEM_PRODUTO_DEPOSITO_SUCCESS';

export interface EmbalagemProdutoDepositoState {    
    embalagemProdutoDeposito: EmbalagemProdutoDeposito[],
}
 

export interface EmbalagemProdutoDeposito {
    deposito?: number,
    produto?: number,
    descricaoEmbalagem?: string,
    quantidadeEmbalagem?: number,
}

export interface GetEmbalagemProdutoDeposito {
    type: typeof GET_EMBALAGEM_PRODUTO_DEPOSITO_SUCCESS,
    payload: EmbalagemProdutoDeposito[]
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: EmbalagemProdutoDeposito;
    index: number;
    children: React.ReactNode;
}

export type embalagemProdutoDepositoActions = EmbalagemProdutoDeposito;
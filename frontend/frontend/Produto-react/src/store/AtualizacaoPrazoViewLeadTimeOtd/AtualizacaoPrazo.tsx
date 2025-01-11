export const GET_ATUALIZACAO_PRAZO = 'GET_ATUALIZACAO_PRAZO';
export const GET_ATUALIZACAO_PRAZO_SUCCESS = 'GET_ATUALIZACAO_PRAZO_SUCCESS';

export interface AtualizacaoPrazoState {    
    atualizacaoPrazo: AtualizacaoPrazo[],
}
 

export interface AtualizacaoPrazo {
    uf: string,
    municipio: string,
    prazo: number,
}

export interface GetAtualizacaoPrazo {
    type: typeof GET_ATUALIZACAO_PRAZO_SUCCESS,
    payload: AtualizacaoPrazo[]
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: AtualizacaoPrazo;
    index: number;
    children: React.ReactNode;
}

export type atualizacaoPrazoActions = AtualizacaoPrazo;
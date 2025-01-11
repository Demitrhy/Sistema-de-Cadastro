export const GET_IMPRESSORA = 'GET_IMPRESSORA';
export const GET_IMPRESSORA_SUCCESS = 'GET_IMPRESSORA_SUCCESS';

export interface impressoraState {    
    deposito: Impressora[],
}
 
export interface Impressora {
    value: number,
    label: string
}

export interface GetImpressora {
    type: typeof GET_IMPRESSORA_SUCCESS,
    payload: Impressora[]
}
 

export type impressoraActions = GetImpressora;
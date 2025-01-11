export const GET_EXCESSOEA = 'GET_EXCESSOEA';
export const GET_EXCESSOEA_SUCCESS = 'GET_EXCESSOEA_SUCCESS';

export interface excessoEAState {    
    excessoea: excessoEA[],
}
 

export interface excessoEA {
    Status: string,
    Contador: number,
        
}

export interface GetExcessoEA {
    type: typeof GET_EXCESSOEA_SUCCESS,
    payload: excessoEA[]
}
 

export type excessoEaActions = GetExcessoEA;
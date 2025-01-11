import { action } from 'typesafe-actions';
import { ProcessamentoTypes, Processamento } from './types'; 

export const buscarProcessamentoRequest = () => action(ProcessamentoTypes.BUSCAR_PROCESSAMENTO_REQUEST);
export const buscarProcessamentoSuccess = (processamento: Processamento[]) => action(ProcessamentoTypes.BUSCAR_PROCESSAMENTO_SUCCCES, { processamento });
export const buscarProcessamentoFailure = (error: any) => action(ProcessamentoTypes.BUSCAR_PROCESSAMENTO_FAILURE, { error });

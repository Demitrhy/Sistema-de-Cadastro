import { combineReducers } from 'redux';

import processamento from './Processamento/reducer';
import autenticacao from './Autenticacao/reducer';
import { BuscarProcessamentoState } from './Processamento/types';
import { AutenticarUsuarioState } from './Autenticacao/types';

/**
 * Importa os reducers
 */

export interface ICombineReducers {

  autenticacao: AutenticarUsuarioState;
  processamento: BuscarProcessamentoState;

}


const storeApp = combineReducers<ICombineReducers>({

  autenticacao,
  processamento

});

export default storeApp;



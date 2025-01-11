import { all, takeLatest } from 'redux-saga/effects';

import { 
  buscarProcessamento 
} from './Processamento/saga';
import { autenticarUsuario } from './Autenticacao/saga'


import { AutenticarUsuarioTypes } from './Autenticacao/types';
import { ProcessamentoTypes } from './Processamento/types';

/**
 * Importa os observadores de actions
 */
export default function* rootSaga() {
    yield all([
      takeLatest(AutenticarUsuarioTypes.AUTENTICAR_USUARIO_REQUEST, autenticarUsuario),
      takeLatest(ProcessamentoTypes.BUSCAR_PROCESSAMENTO_REQUEST, buscarProcessamento),

    ]);
}







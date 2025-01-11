import { call, put } from 'redux-saga/effects';
import api from '../../services/';

import { 
  buscarProcessamentoSuccess, 
  buscarProcessamentoFailure

  } from './actions'; 

export function* buscarProcessamento() {
 
  try {
    const response = yield call(api.get, `${process.env.REACT_APP_DISTRIBUICAO_API}/pedidos/_workers`);
    yield put(buscarProcessamentoSuccess(response.data));
  } catch (error) {
    yield put(buscarProcessamentoFailure(error));
  } 
}

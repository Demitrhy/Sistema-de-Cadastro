import { call, put } from 'redux-saga/effects';
import { api } from '../../services/';
import { autenticarUsuarioSuccess, autenticarUsuarioFailure } from './actions';

export function* autenticarUsuario({payload}: any) {
  
  const IdentityServer = new URLSearchParams({
    username: payload.data.username,
    password: payload.data.password,
    grant_type: `${process.env.REACT_APP_IDENTITY_GRANT_TYPE}`,
    client_id: `${process.env.REACT_APP_IDENTITY_CLIENT_ID}`,
    client_secret: `${process.env.REACT_APP_IDENTITY_CLIENT_SECRET}`,
    app: `${process.env.REACT_APP_IDENTITY_APP}`,
    scope: `${process.env.REACT_APP_IDENTITY_SCOPE}`
  });

  const data = IdentityServer.toString()
  console.log("skdlfhskldfhksjdhfjks", process.env.REACT_APP_AUTH)

  try {
    const response = yield call(api.post, `${process.env.REACT_APP_AUTH}/connect/token`, data);

    yield put(autenticarUsuarioSuccess(response.data));
  } catch (err) {
    yield put(autenticarUsuarioFailure(err));
  }
}

export function* permissaoUsuario() {

  try {
    const response = yield call(api.get, `${process.env.REACT_APP_AUTH}/connect/userinfo`);

    yield put(autenticarUsuarioSuccess(response.data));
  } catch (err) {
    yield put(autenticarUsuarioFailure(err));
  }
}
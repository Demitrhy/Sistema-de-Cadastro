import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

// Import Types from Store 
import { AutenticarUsuarioState } from './Autenticacao/types';


export interface ApplicationState {
  autenticacao: AutenticarUsuarioState;
  }


export const createReduxStore = () => {
const sagaMiddleware = createSagaMiddleware();
const store: Store<ApplicationState> = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);
return store;
}

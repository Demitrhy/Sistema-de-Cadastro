import { Reducer } from 'redux';
import { produce } from 'immer';
import * as mapper  from './mapper';
import { AutenticarUsuarioState, AutenticarUsuarioTypes, PermissaoUsuarioTypes } from './types';


const INITIAL_STATE: AutenticarUsuarioState = {
  data: {
    access_token: '',
    expires_in: 0,
    token_type: '',
    refresh_token: '',
    scope: ''
  },
  error: false,
  loading: false,
  onAuthenticated: false, 
  permissao: [
    {
      usuario: {},
      menu: []
    }
  ]
};

const reducer: Reducer<AutenticarUsuarioState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case AutenticarUsuarioTypes.AUTENTICAR_USUARIO_REQUEST:
        mapper.aguardarRetorno(draft, action) 
        break;
      case AutenticarUsuarioTypes.AUTENTICAR_USUARIO_SUCCCES:
        mapper.validarAutenticacao(draft, action)
        break;
      case AutenticarUsuarioTypes.AUTENTICAR_USUARIO_FAILURE:
        mapper.verificarErroAutenticacao(draft, action)
        mapper.limparDraft(draft)
        break;
      case PermissaoUsuarioTypes.PERMISSAO_USUARIO_REQUEST:
        draft.loading = true
        break;
      case PermissaoUsuarioTypes.PERMISSAO_USUARIO_SUCCCES:
        mapper.validarPermissao(draft, action)
        break;
      case PermissaoUsuarioTypes.PERMISSAO_USUARIO_FAILURE:
        mapper.verificarErroPermissao(draft, action)
        mapper.limparDraft(draft)
        break;  
      default:

    }
  })
};
  

export default reducer;

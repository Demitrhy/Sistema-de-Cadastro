import nprogress from 'nprogress';
import { setToken, setRefreshToken } from  '../../utils/AuthService' 
import { AutenticarUsuarioState } from './types';
import { notification } from 'antd';


export const aguardarRetorno = (draft: any, action: any ) => {

  draft.loading = true
  nprogress.start() 

} 


export const validarAutenticacao = async (draft: AutenticarUsuarioState, action: any ) => {
  draft.data = action.payload.data;
  action.payload.data.access_token && setToken(action.payload.data.access_token);
  action.payload.data.refresh_token && setRefreshToken(action.payload.data.refresh_token);
  nprogress.done(); 
  draft.loading = false; 
}
 
export const verificarErroAutenticacao = (draft: any, action: any ) => {
  nprogress.done()
  draft.loading = false
  notification.error({
    message: `Ops! erro ao processar requisição.`,
    description: `${action.payload.err.response.data && action.payload.err.response.data.error_description}`
  });

  limparDraft(draft)
  
}

export const validarPermissao = (draft: any, action: any ) => {
  
  if(action.payload.data.access_token !== 'undefined' && action.payload.data.token_type === 'bearer' ) {  
    setToken(action.payload.data.access_token)
    nprogress.done()
    draft.loading = false  
  } 
}


export const verificarErroPermissao = (draft: any, action: any ) => {
 
  nprogress.done()
  draft.loading = false
  notification.error({
    message: `Ops! erro ao processar requisição.`,
    description: `${action.payload.error.message}`
  });

  limparDraft(draft)
}


export const limparDraft = (draft: any) => {
  draft.loading = false;
  draft.error = true; 
  draft.data = [];
}
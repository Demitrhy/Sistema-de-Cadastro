/**
 * Action types
 */
export enum AutenticarUsuarioTypes {
  AUTENTICAR_USUARIO_REQUEST = '@autenticar-usuario/LOAD_REQUEST',
  AUTENTICAR_USUARIO_SUCCCES = '@autenticar-usuario/LOAD_SUCCCES',
  AUTENTICAR_USUARIO_FAILURE = '@autenticar-usuario/LOAD_FAILURE'
}

export enum PermissaoUsuarioTypes {
  PERMISSAO_USUARIO_REQUEST = '@permissao-usuario/LOAD_REQUEST',
  PERMISSAO_USUARIO_SUCCCES = '@permissao-usuario/LOAD_SUCCCES',
  PERMISSAO_USUARIO_FAILURE = '@permissao-usuario/LOAD_FAILURE',
  ATUALIZAR_PERMISSAO_USUARIO = "ATUALIZAR_PERMISSAO_USUARIO"
}

/**
 * Data types
 */
export interface AutenticarUsuario {
  access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token: string;
  scope: string;
}

export interface PermissaoUsuario {
  usuario: {};
  menu: [];
}

/**
 * State type
 */
export interface AutenticarUsuarioState {
   data: AutenticarUsuario;
   loading: boolean
   onAuthenticated: boolean;
   error: boolean
   permissao: PermissaoUsuario[]
}

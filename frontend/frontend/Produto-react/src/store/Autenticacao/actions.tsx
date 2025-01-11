import { action } from 'typesafe-actions';
import { AutenticarUsuarioTypes, PermissaoUsuarioTypes, AutenticarUsuario, PermissaoUsuario } from './types';

// Ações de Autenticação
export const autenticarUsuarioRequest = (data: {}) => action(AutenticarUsuarioTypes.AUTENTICAR_USUARIO_REQUEST, { data });
export const autenticarUsuarioSuccess = (data: AutenticarUsuario[]) => action(AutenticarUsuarioTypes.AUTENTICAR_USUARIO_SUCCCES, { data });
export const autenticarUsuarioFailure = (err: any) => action(AutenticarUsuarioTypes.AUTENTICAR_USUARIO_FAILURE, { err });

// Ações de Permissão
export const permissaoUsuarioRequest = () => action(PermissaoUsuarioTypes.PERMISSAO_USUARIO_REQUEST);
export const permissaoUsuarioSuccess = (permissao: PermissaoUsuario[]) => action(PermissaoUsuarioTypes.PERMISSAO_USUARIO_SUCCCES, { permissao });
export const permissaoUsuarioFailure = (err: any) => action(PermissaoUsuarioTypes.PERMISSAO_USUARIO_FAILURE, { err });

// Nova ação para atualizar permissões, se necessário
export const atualizarPermissaoUsuario = (permissao: PermissaoUsuario[]) => 
  action(PermissaoUsuarioTypes.ATUALIZAR_PERMISSAO_USUARIO, { permissao });

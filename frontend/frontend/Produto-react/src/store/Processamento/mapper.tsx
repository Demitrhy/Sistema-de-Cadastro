import nprogress from 'nprogress';
import { BuscarProcessamentoState } from './types';
import { notification } from 'antd';
import { statusProcessamento } from '../../utils/StatusProcessamento';

export const aguardarRetorno = (draft: BuscarProcessamentoState, action: any ) => {

  draft.loading = true
  nprogress.start()

}

export const validarProcessamento = (draft: BuscarProcessamentoState, action: any ) => {

  const _data = action.payload.processamento
  let _listaProcessamento: any[] = []
  
  _data.map((i: any) => 
    
    _listaProcessamento.push({
      id: i.Id,
      codigoSistema: i.CodigoSistema,
      codigoUsuarioCadastro: i.CodigoUsuarioCadastro,
      comando: JSON.parse(i.Comando),
      comandoNome: i.ComandoNome,
      dataHoraCadastro: i.DataHoraCadastro,
      dataHoraFimProcessamento: i.DataHoraFimProcessamento,
      dataHoraInicioProcessamento: i.DataHoraInicioProcessamento,
      descricao: i.Descricao,
      error: i.Error,
      quantidadeTentativas: i.QuantidadeTentativas,
      resultado: JSON.parse(i.Resultado),
      status: statusProcessamento(
        i.DataHoraFimProcessamento, 
        i.DataHoraInicioProcessamento, 
        i.Resultado, 
        i.Error, 
        i.QuantidadeTentativas
        ),
    })
  )
  
  draft.loading = false
  nprogress.done()

  if(action.payload.data !== 'undefined') { 
    draft.processamento = _listaProcessamento.reverse(); 
  } 
}



export const tratarErros = (draft: BuscarProcessamentoState, action: any ) => {
  nprogress.done()
  draft.error = true;
  // draft.acaoEmMassa.statusEnvio

  notification.error({
    message: `Ops! erro ao processar requisição.`,
    description: `${action.payload.error.message}`
  });

  if(action.payload.error.response.status === 401) {
    notification.error({
      message: `Faça login novamente!`,
      description: `Suas credenciais estão incorretas, ou expiraram.` 
    }); 
    localStorage.clear();
    // window.location.reload(true);
  }


}

export const limparDraft = (draft: BuscarProcessamentoState) => {
  draft.loading = false;
  draft.error = false; 
  draft.processamento = [];
}

export const setQueryParamsPedido = (draft: BuscarProcessamentoState, action: any ) => {

  let _origens: string = action.payload.params;
    _origens && _origens.trim() !== ""  
    ? 
    draft.params.Q = action.payload.params
    : draft.params.Q = undefined; 
}

export const setQueryParamsPaginacao = (draft: BuscarProcessamentoState, action: any ) => {

  let _paginacacao = action.payload.params;
  _paginacacao ? draft.paginacao.Page = _paginacacao.page : draft.paginacao.Page = undefined;
  _paginacacao ? draft.paginacao.Limit = _paginacacao.limit : draft.paginacao.Limit = undefined; 
  
}
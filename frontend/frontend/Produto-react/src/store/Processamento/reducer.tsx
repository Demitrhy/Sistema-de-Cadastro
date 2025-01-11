import { Reducer } from 'redux';
import { produce } from 'immer';
import * as mapper  from './mapper';
import { BuscarProcessamentoState, ProcessamentoTypes } from './types';

const INITIAL_STATE: BuscarProcessamentoState = {
  processamento: [],
  error: false,
  loading: false,
  params: {
    // DataPedido: moment().format("YYYY-MM-DD"),
  },
  paginacao: {
    Page: 1,
    Limit: 70
  }
};

const reducer: Reducer<BuscarProcessamentoState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ProcessamentoTypes.BUSCAR_PROCESSAMENTO_REQUEST:
        mapper.aguardarRetorno(draft, action)
        break;
      case ProcessamentoTypes.BUSCAR_PROCESSAMENTO_SUCCCES:
        mapper.validarProcessamento(draft, action)
        break;
      case ProcessamentoTypes.BUSCAR_PROCESSAMENTO_FAILURE:
        mapper.tratarErros(draft, action)
        mapper.limparDraft(draft)     
        break;
      default:

    }
  })
};
  

export default reducer;


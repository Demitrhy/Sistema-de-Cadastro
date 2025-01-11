/**
 * Action types
 */
export enum ProcessamentoTypes {
  BUSCAR_PROCESSAMENTO_REQUEST = '@buscar-processamento/LOAD_REQUEST',
  BUSCAR_PROCESSAMENTO_SUCCCES = '@buscar-processamento/LOAD_SUCCCES',
  BUSCAR_PROCESSAMENTO_FAILURE = '@buscar-processamento/LOAD_FAILURE',
  
  BUSCAR_NOTIFICACOES_REQUEST = '@buscar-notificacoes/LOAD_REQUEST',
  BUSCAR_NOTIFICACOES_SUCCCES = '@buscar-notificacoes/LOAD_SUCCCES',
  BUSCAR_NOTIFICACOES_FAILURE = '@buscar-notificacoes/LOAD_FAILURE',
  
  SET_STATUS_NOTIFICACAO = '@set-status-notificacao/SET_STATUS_EM_MASSA',
  SET_STATUS_NOTIFICACAO_EM_MASSA = '@set-status-notificacao-em-massa/SET_STATUS_NOTIFICACAO_EM_MASSA',
  SET_QUERYSTRING_PAGINACAO = '@set-querystring-paginacao/SET_QUERYSTRING_PAGINACAO',

  
}

/**
 * Data types
 */

  interface ProcessamentoEmMassa {
      id?: string;
      codigoSistema?: string;
      descricao?: string;
      codigoUsuarioCadastro?: number;
      dataHoraCadastro?: Date;
      dataHoraInicioProcessamento?: Date;
      dataHoraFimProcessamento?: Date;
      comandoNome?: string;
      comando?: string;
      rersultado?: string;
      error?: string;
      quantidadeTentativas?: number;

  }

  interface PushNotification {
      tipo: string;
      codigo: number;
      nome: string;
      razaoSocial: string;
      bairro: string;
      municipio: string;
      logradouro: string;
      uf: string;
      cep: string;
      cnpj: string;
      inscricaoEstadual: string;
  }

    /**
 * Return type request BUSCAR_PROCESSAMENTO_REQUEST
 */
  export interface Processamento {
      processamentoEmMassa: ProcessamentoEmMassa;
      notificacao: PushNotification;
  }

/**
 * Query String Type for send request BUSCAR_PROCESSAMENTO_REQUEST
 */

export interface QueryString {

    Page?: number;
    Limit?: number; 
    Fields?: string;
    Q?: string;
}

export interface Pagination {
    Page?: number;
    Limit?: number; 
}

/**
 * State type
 */
export interface BuscarProcessamentoState {
  processamento: Processamento[];
  loading: boolean;
  error: boolean;
  params: QueryString;
  paginacao: Pagination;
}

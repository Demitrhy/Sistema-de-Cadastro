export const situacaoEnvio = (name: string) => {


  const acoesEmMassa = {
    FECHAR: 'pendente-fechar',
    GERAR_ARQUIVO: 'pendente-gerar-arquivo',
    ENVIAR_ARQUIVO: 'pendente-enviar-arquivo',
    CONCLUIDO: 'acoes-em-massa-concluida'
  }

  let _situacaoAcoesEmMassa = {
    enum: 0,
    descricao: '',
    statusSteps: ''
  }

  switch (true) {
    case name === acoesEmMassa.FECHAR:
      _situacaoAcoesEmMassa.enum = 0
      _situacaoAcoesEmMassa.descricao = 'Fechar'
      _situacaoAcoesEmMassa.statusSteps = 'wait'
      break;
    case name === acoesEmMassa.GERAR_ARQUIVO:
      _situacaoAcoesEmMassa.enum = 1
      _situacaoAcoesEmMassa.descricao = 'Gerar Arquivo'
      _situacaoAcoesEmMassa.statusSteps = 'wait'
      break;
    case name === acoesEmMassa.ENVIAR_ARQUIVO:
      _situacaoAcoesEmMassa.enum = 2
      _situacaoAcoesEmMassa.descricao = 'Enviar ao Fornecedor'
      _situacaoAcoesEmMassa.statusSteps = 'wait'
      break;
    case name === acoesEmMassa.CONCLUIDO:
        _situacaoAcoesEmMassa.enum = 3
        _situacaoAcoesEmMassa.descricao = 'Concluído'
        _situacaoAcoesEmMassa.statusSteps = 'finish'
        break;
    default:
      break;
  }

      return _situacaoAcoesEmMassa;
}
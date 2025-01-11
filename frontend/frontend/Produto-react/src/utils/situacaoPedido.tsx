export const situacaoPedido = (name: string) => {


  const situacao = {
    ABERTO: 'aberto',
    FECHADO: 'fechado',
    PENDENTE: 'pendente',
    CANCELADO: 'cancelado',
    ENCERRADO: 'encerrado'
  }

  let _situacaoPedido = {
    enum: 0,
    descricao: '',
    statusSteps: ''
  }

  switch (true) {
    case name === situacao.ABERTO:
      _situacaoPedido.enum = 1
      _situacaoPedido.descricao = 'Aberto'
      _situacaoPedido.statusSteps = 'wait'
      break;
    case name === situacao.FECHADO:
      _situacaoPedido.enum = 2
      _situacaoPedido.descricao = 'Fechado'
      _situacaoPedido.statusSteps = 'finish'
      break;
    case name === situacao.PENDENTE:
      _situacaoPedido.enum = 3
      _situacaoPedido.descricao = 'Pendente'
      _situacaoPedido.statusSteps = 'process'
      break;
    case name === situacao.CANCELADO:
      _situacaoPedido.enum = 4
      _situacaoPedido.descricao = 'Cancelado'
      _situacaoPedido.statusSteps = 'finish'
      break;
    case name === situacao.ENCERRADO:
      _situacaoPedido.enum = 5
      _situacaoPedido.descricao = 'Encerrado'
      _situacaoPedido.statusSteps = 'finish'
      break;     
    default:
      break;
  }

      return _situacaoPedido;
}
export const statusAnalisadorAutomatico = (name: string) => {


  const analisador = {
    AGUARDANDO: 'pendente-analise-automatica',
    ANALISADO_AUTOMATICAMENTE: 'analisado-automaticamente',
    AGUARDANDO_MANUAL: 'pendente-analise-manual',
    ANALISAD0_MANUALMENTE: 'analisado-manualmente'
  }

  let _statusAnaliseAutomatica = {
    enum: 0,
    descricao: '',
    statusSteps: ''
  }

  switch (true) {
    case name === analisador.AGUARDANDO:
      _statusAnaliseAutomatica.enum = 0
      _statusAnaliseAutomatica.descricao = 'Aguardando Analise'
      _statusAnaliseAutomatica.statusSteps = 'wait'
      break;
    case name === analisador.ANALISADO_AUTOMATICAMENTE:
      _statusAnaliseAutomatica.enum = 1
      _statusAnaliseAutomatica.descricao = 'Analisado Automaticamente'
      _statusAnaliseAutomatica.statusSteps = 'finish'
      break;
    case name === analisador.AGUARDANDO_MANUAL:
      _statusAnaliseAutomatica.enum = 1
      _statusAnaliseAutomatica.descricao = 'Analisar Manualmente'
      _statusAnaliseAutomatica.statusSteps = 'error'
      break;
    case name === analisador.ANALISAD0_MANUALMENTE:
      _statusAnaliseAutomatica.enum = 1
      _statusAnaliseAutomatica.descricao = 'Analisado Manualmente'
      _statusAnaliseAutomatica.statusSteps = 'finish'
      break;
      
    default:
      break;
  }

      return _statusAnaliseAutomatica;
}
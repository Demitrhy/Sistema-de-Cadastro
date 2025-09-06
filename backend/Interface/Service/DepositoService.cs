using LOG_RT_DISTRIBUICAO_CORE.Dto;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Service
{
    public class DepositoService : IDepositoService
    {
        private readonly IDepositoRepositorio _depositoRepositorio;
        

        public DepositoService(IDepositoRepositorio depositoRepositorio)
        {
            _depositoRepositorio = depositoRepositorio;
          
        }

        public IEnumerable<DepositoDto> BuscarDeposito()
        {
            var codigo = _depositoRepositorio.Buscar();
            return codigo;
        }

        public async Task Importar(List<DepositoDto> depositos)
        {
            try
            {
                foreach (var deposito in depositos)
                {
                    int codigo =  _depositoRepositorio.Deposito();

                    await _depositoRepositorio.ImportarDeposito(deposito, ++codigo);
                }
            }
            catch (ArgumentException ex)
            {
                throw new ArgumentException("Erro ao importar o novo Deposito", ex.Message);
            }
        }
    }
}

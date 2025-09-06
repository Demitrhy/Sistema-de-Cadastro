using LOG_RT_DISTRIBUICAO_CORE.Dto;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface
{
    public interface IDepositoService
    {
        Task Importar(List<DepositoDto> depositos);
        IEnumerable<DepositoDto> BuscarDeposito();
    }
}

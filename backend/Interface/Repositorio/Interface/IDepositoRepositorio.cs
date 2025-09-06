using LOG_RT_DISTRIBUICAO_CORE.Dto;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface
{
    public interface IDepositoRepositorio
    {
        int Deposito();
        Task ImportarDeposito(DepositoDto deposito, int codigo);
        IEnumerable<DepositoDto> Buscar();
    }
}

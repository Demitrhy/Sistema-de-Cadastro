using LOG_RT_DISTRIBUICAO_CORE.Dto;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface
{
    public interface IProdutoDepositoService
    {
        Task ImportarProdutoDeposito(ProdutoDepositoDto lista);
        Task ImportarMovimentacao(MovimentacaoDto lista);
    }
}

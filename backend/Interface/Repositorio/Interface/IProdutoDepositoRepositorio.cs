using LOG_RT_DISTRIBUICAO_CORE.Dto;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface
{
    public interface IProdutoDepositoRepositorio
    {
        int GetProdutoDeposito(int produto, int deposito);
        Task AtualizarEstoque(int produto, int deposito,int ea, int estoque);
        int GetFornecedor(int produto);
        Task Importar(ProdutoDepositoDto lista, int fornecedor);
        Task InserirMovimentacao(MovimentacaoDto lista);
        Task AtualizarEntrada(MovimentacaoDto lista);
        Task AtualizarSaida(MovimentacaoDto lista);
        Task AtualizarReserva(MovimentacaoDto lista);
        Task AtualizarLiberacao(MovimentacaoDto lista);
        Task AtualizarPendente(MovimentacaoDto lista);
    }
}

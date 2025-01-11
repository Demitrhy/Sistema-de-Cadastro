using LOG_RT_DISTRIBUICAO_CORE.Dto;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface {
    public interface IProdutoService
    {
        IEnumerable<ProdutoDto> BuscarProduto(int codigo);
        Task AdicionarNovoProduto(int produto, string? descricao, string? categoria);
        Task MudarNovoProduto(List<ProdutoDto> produto, string situacao);
        Task DeletarProduto(ProdutoDto produto);
    }
}

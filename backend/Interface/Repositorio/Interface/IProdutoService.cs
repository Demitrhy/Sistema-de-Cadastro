using LOG_RT_DISTRIBUICAO_CORE.Dto;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface {
    public interface IProdutoService
    {
        IEnumerable<ProdutoDto> BuscarProduto(int codigo);
        IEnumerable<ProdutoDto> BuscarProdutos();
        Task AdicionarNovoProduto(List<ProdutoDto> produtos );
        Task MudarNovoProduto(List<ProdutoDto> produto, string situacao);
        Task MudarProduto(int produto, int digito, decimal? liquido, decimal? comissao, decimal? precoVenda, decimal? percLucro, decimal? custo);
        Task ExcluirProduto(int produto, int digito);
        
    }
}

using LOG_RT_DISTRIBUICAO_CORE.Dto;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface {
    public interface IProdutoRepositorio 
    {
        IEnumerable<ProdutoDto> BuscarProdutoRepositorio(int codigo);
        int BuscarProduto(int produto);
        Task InserirProdutoNovo(List<ProdutoDto> produto, int digito);
        Task MudarProdutoNovo(int produto, int digito, string situacao);
        Task DeletarProduto(ProdutoDto produto);
    }
}

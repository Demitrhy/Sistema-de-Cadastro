using LOG_RT_DISTRIBUICAO_CORE.Dto;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface {
    public interface IProdutoRepositorio 
    {
        IEnumerable<ProdutoDto> BuscarProdutoRepositorio(int codigo);
        IEnumerable<ProdutoDto> BuscarProdutosRepositorio();
        int BuscarProduto(int produto);
        int BuscarTipo(string tipo);
        int BuscarGrupo(string tipo);
        int BuscarUnidade(string tipo);
        int VerificarSeExisteProduto(ProdutoDto produto);
        int VerificarSeExisteCodigo(int produto);
        Task<int> BuscarMaiorCodigo();
        Task InserirProdutoNovo(List<ProdutoDto> produto,int produtoAleatorio, int digito, int tipo, int grupo, int unidade);
        Task MudarProdutoNovo(int produto, int digito, string situacao);
        Task EditarProduto(int produto, int digito, decimal? liquido, decimal? comissao, decimal? precoVenda, decimal? percLucro, decimal? custo);
    }
}

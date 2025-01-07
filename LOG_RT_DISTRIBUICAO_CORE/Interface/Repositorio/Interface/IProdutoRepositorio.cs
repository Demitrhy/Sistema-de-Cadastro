using LOG_RT_DISTRIBUICAO_CORE.Dto;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface {
    public interface IProdutoRepositorio 
    {
        IEnumerable<ProdutoDto> BuscarProdutoReposityrio(int codigo);
    }
}

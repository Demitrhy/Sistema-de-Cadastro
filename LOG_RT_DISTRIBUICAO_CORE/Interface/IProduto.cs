using LOG_RT_DISTRIBUICAO_CORE.Dto;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface
{
    public interface IProduto
    {
        IEnumerable<ProdutoDto> BuscarProduto(int codigo);
    }
}

using LOG_RT_DISTRIBUICAO_CORE.Dto;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface
{
    public interface IFornecedorService
    {
        IEnumerable<FornecedorDto> BuscarProdutos();
        Task Importar(List<FornecedorDto> produtos);
    }
}

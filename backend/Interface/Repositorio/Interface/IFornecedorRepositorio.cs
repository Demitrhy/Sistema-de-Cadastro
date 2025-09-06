using LOG_RT_DISTRIBUICAO_CORE.Dto;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface
{
    public interface IFornecedorRepositorio
    {
        IEnumerable<FornecedorDto> BuscarFornecedorRepositorio();
        Task ImportarFornecedor(FornecedorDto produtos, int codigo);
        int GetFornecedor();
    }
}

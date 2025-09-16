using LOG_RT_DISTRIBUICAO_CORE.Dto;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface
{
    public interface IFilialRepository
    {
        IEnumerable<FilialDto> BuscarFilialRepository();
        
        Task InserirNovaFilial(FilialDto filial);
    }
}

using LOG_RT_DISTRIBUICAO_CORE.Dto;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface
{
    public interface IFilialService
    {
        IEnumerable<FilialDto> BuscarFilial();

        Task InserirNovaFilial(FilialDto filial);
    }
}

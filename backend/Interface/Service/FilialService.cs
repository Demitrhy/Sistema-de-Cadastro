using LOG_RT_DISTRIBUICAO_CORE.Dto;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Service
{
    public class FilialService : IFilialService
    {
        private readonly IFilialRepository _filialRepository;



        public FilialService(IFilialRepository filialRepository)
        {
            _filialRepository = filialRepository;

        }

        public IEnumerable<FilialDto> BuscarFilial()
        {
            var buscar = _filialRepository.BuscarFilialRepository();
            return buscar;
        }

        public async Task InserirNovaFilial(FilialDto filial)
        {
            try
            {
                await _filialRepository.InserirNovaFilial(filial);
            }
            catch (ArgumentException ex)
            {
                throw new ArgumentException("Erro ao inserir o novo filial");
            }

        }
    }
}
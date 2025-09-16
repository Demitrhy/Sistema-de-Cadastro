using LOG_RT_DISTRIBUICAO_CORE.Dto;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace LOG_RT_DISTRIBUICAO_CORE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilialController : ControllerBase
    {
        private readonly IFilialService _filial;

        public FilialController(IFilialService filial)
        {
            _filial = filial;
        }

        [HttpGet]
        public IEnumerable<FilialDto> BuscarFilial()
        {
            var buscar = _filial.BuscarFilial();
            return buscar;
        }

        [HttpPost("InserirNovaFilial")]
        public async Task<IActionResult> InserirFiial(FilialDto filial)
        {
            try
            {
                await _filial.InserirNovaFilial(filial);
                return Ok("Importado com sucesso! ");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}

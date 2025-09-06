using System.Threading.Tasks;
using LOG_RT_DISTRIBUICAO_CORE.Dto;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface;
using Microsoft.AspNetCore.Mvc;

namespace LOG_RT_DISTRIBUICAO_CORE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepositoController : ControllerBase
    {
        private readonly IDepositoService deposito;

        public DepositoController(IDepositoService _deposito)
        {
            deposito = _deposito;
        }

        [HttpGet("BuscarDepositos")]
        public IEnumerable<DepositoDto> BuscarDeposito()
        {
           var codigo = deposito.BuscarDeposito();
            return codigo;

        }

        [HttpPost("InserirNovoDeposito")]
        public async Task<IActionResult> ImportarDeposito(List<DepositoDto> depositos)
        {
            try
            {
                await deposito.Importar(depositos);
                return Ok("Importado com sucesso");
            }
            catch (ArgumentException ex)
            {
                throw new ArgumentException("Erro ao importar o novo depósito", ex.Message);
            }
        }
    }
}

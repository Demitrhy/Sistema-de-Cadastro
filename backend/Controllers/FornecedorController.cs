using LOG_RT_DISTRIBUICAO_CORE.Dto;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface;
using Microsoft.AspNetCore.Mvc;

namespace LOG_RT_DISTRIBUICAO_CORE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FornecedorController : ControllerBase
    {
        private readonly IFornecedorService _fornecedor;

        public FornecedorController(IFornecedorService fornecedor)
        {
            _fornecedor = fornecedor;
        }

        [HttpGet("BucarFornecedor")]
        public IEnumerable<FornecedorDto> BuscarFornecedor()
        {
            var produto = _fornecedor.BuscarProdutos();
            return produto;
        }

        [HttpPost("InserirNovoFornecedor")]
       public async Task InserirNovoProduto([FromBody] List<FornecedorDto> produto)
        {
            try
            {
                await _fornecedor.Importar(produto);
            }
            catch (Exception ex) 
            {
                throw new ArgumentException(ex.Message);
            }

        }
    }
}

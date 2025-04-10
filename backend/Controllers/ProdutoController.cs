using LOG_RT_DISTRIBUICAO_CORE.Dto;
using LOG_RT_DISTRIBUICAO_CORE.Interface;
using Microsoft.AspNetCore.Mvc;

namespace LOG_RT_DISTRIBUICAO_CORE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutoController : ControllerBase
    {

        private readonly IProdutoService _produto; 

        public ProdutoController(IProdutoService produto) {
            _produto = produto;
        }


        [HttpGet("BuscarProdutos")]
        public IEnumerable<ProdutoDto> BuscarProduto(int codigo) {

            var produto = _produto.BuscarProduto(codigo);
            return produto;
        }

        [HttpPost("Importar")]
        public async Task InserirNovoProduto([FromBody] List<ProdutoDto> produto)
        {
            try {
                await _produto.AdicionarNovoProduto(produto);
            }
            catch (Exception ex )
            {
                throw new ArgumentException(ex.Message);
            }   
        }
        [HttpPut("MudarStatusProduto")]
        public async Task MudarStatusProduto(List<ProdutoDto> produto,  string situacao) {
            try 
            {
                await _produto.MudarNovoProduto(produto, situacao);
            }
            catch (Exception ex) {
                throw new ArgumentException(ex.Message);
            }
        }
        [HttpDelete("DeletarProduto")]
        public async Task DeletarProduto (ProdutoDto produto) {
            try {
                await _produto.DeletarProduto(produto);
            }
            catch (Exception ex) {
                throw new ArgumentException(ex.Message);
            }
        }


    }
}

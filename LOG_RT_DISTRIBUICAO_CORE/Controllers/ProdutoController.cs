using LOG_RT_DISTRIBUICAO_CORE.Dto;
using LOG_RT_DISTRIBUICAO_CORE.Interface;
using Microsoft.AspNetCore.Mvc;

namespace LOG_RT_DISTRIBUICAO_CORE.Controllers
{
    [ApiController]
    [Route("Produto")]
    public class ProdutoController : ControllerBase, IProduto {

        private readonly IProduto _produto; 

        public ProdutoController(IProduto produto) {
            _produto = produto;
        }

        [HttpGet("BuscarProduto")]
        public IEnumerable<ProdutoDto> BuscarProduto(int codigo) {

            var produto = _produto.BuscarProduto(codigo);
            return produto;
        }
    }
}

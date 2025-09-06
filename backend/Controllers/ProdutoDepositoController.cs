using LOG_RT_DISTRIBUICAO_CORE.Dto;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LOG_RT_DISTRIBUICAO_CORE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    
    public class ProdutoDepositoController : ControllerBase
    {
        private readonly IProdutoDepositoService _produtoDepositoService;

        public ProdutoDepositoController(IProdutoDepositoService produtoDepositoService)
        {
            _produtoDepositoService = produtoDepositoService;
        }

        [HttpPost("InserirNovoProdutoDeposito")]
        public IActionResult ImportaProdutoDeposito([FromBody] ProdutoDepositoDto produtos)
        {
            try
            {
                _produtoDepositoService.ImportarProdutoDeposito(produtos);
                return Ok("Importado com sucesso!");

            }
            catch (ArgumentException ex)
            {
                throw new ArgumentException("Algo deu errado ao inserir novo produto deposito", ex.Message);
            }
        }

        [HttpPost("InserirNovaMovimentacao")]
        public async Task ImportaMovimentacao([FromBody] MovimentacaoDto movimentacao)
        {
            try
            {
                await _produtoDepositoService.ImportarMovimentacao(movimentacao);
            }
            catch (ArgumentException ex)
            {
                throw new ArgumentException("Algo deu errado ao fazer a movimentação", ex.Message);
            }
        }

    }
}

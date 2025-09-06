using LOG_RT_DISTRIBUICAO_CORE.Dto;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Service
{
    public class ProdutoDepositoService : IProdutoDepositoService
    {
        private readonly IProdutoDepositoRepositorio _produtoDeposito;

        public ProdutoDepositoService(IProdutoDepositoRepositorio produtoDeposito)
        {
            _produtoDeposito = produtoDeposito;
        }

        public async Task ImportarProdutoDeposito(ProdutoDepositoDto lista)
        {
            try
            {
                int codigo = _produtoDeposito.GetProdutoDeposito(lista.Produto, lista.Deposito);
                int fornecedor = _produtoDeposito.GetFornecedor(lista.Produto);
                if (codigo == 0)
                {
                    await _produtoDeposito.Importar(lista, fornecedor);
                }
                else
                {
                    await _produtoDeposito.AtualizarEstoque(lista.Produto, lista.Deposito, lista.EA,lista.EstoqueAtual);
                }
            }
            catch (ArgumentException ex)
            {
                throw new ArgumentException("Algo deu errado ao importar produto depósito");
            }
           
        }
        public async Task ImportarMovimentacao(MovimentacaoDto lista)
        {
            await _produtoDeposito.InserirMovimentacao(lista);

            if (lista.TipoMovimentacao == "ENTRADA")
            {
                await _produtoDeposito.AtualizarEntrada(lista);
            }
            else if (lista.TipoMovimentacao == "SAIDA")
            {
                await _produtoDeposito.AtualizarSaida(lista);
            }
            else if (lista.TipoMovimentacao == "RESERVA")
            {
                await _produtoDeposito.AtualizarReserva(lista);
            }
            else if (lista.TipoMovimentacao == "LIBERACAO")
            {
                await _produtoDeposito.AtualizarLiberacao(lista);
            }
            else if (lista.TipoMovimentacao == "PENDENTE")
            {
                await _produtoDeposito.AtualizarPendente(lista);
            }
            else { throw new ArgumentException("Algo deu errado na atualização do estoque!"); }
        }
    }
}

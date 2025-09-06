using System.Data.SqlClient;
using Dapper;
using LOG_RT_DISTRIBUICAO_CORE.Dto;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Script;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio
{
    public class ProdutoDepositoRepositorio : IProdutoDepositoRepositorio
    {
        private readonly SqlConnection _sqlConnection;

        public ProdutoDepositoRepositorio(SqlConnection sqlConnection)
        {
            _sqlConnection = sqlConnection ?? throw new ArgumentNullException(nameof(sqlConnection));
        }

        public int GetProdutoDeposito(int produto, int deposito)
        {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {
                connection.Open();

                DynamicParameters dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("Produto",  produto);
                dynamicParameters.Add("Deposito", deposito);

                int codigo = connection.QuerySingleOrDefault<int>(ProdutoDepositoScript.BuscarProdutoDeposito, dynamicParameters);
                connection.Close();
                return codigo;
            }
        } 
        public async Task AtualizarEstoque(int produto, int deposito,int ea, int estoque)
        {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {
                connection.Open();

                DynamicParameters dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("Produto",  produto);
                dynamicParameters.Add("Deposito", deposito);
                dynamicParameters.Add("ESTOQUE_ATUAL", estoque);
                dynamicParameters.Add("EA", ea);

                await  connection.ExecuteAsync(ProdutoDepositoScript.AtualizarProdutoDeposito, dynamicParameters);
                connection.Close();
               
            }
        }  
        public int GetFornecedor(int produto)
        {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {
                connection.Open();

                DynamicParameters dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("Produto", produto);

                int codigo = connection.QuerySingleOrDefault<int>(ProdutoDepositoScript.BuscarFornecedor, dynamicParameters);
                connection.Close();
                return codigo;
            }
        }

        public async Task Importar(ProdutoDepositoDto produto, int fornecedor)
        {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {
                connection.Open();

                DynamicParameters dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("Produto",produto.Produto);
                dynamicParameters.Add("Deposito",produto.Deposito);
                dynamicParameters.Add("EstoqueAtual", produto.EstoqueAtual);
                dynamicParameters.Add("EA",produto.EA);
                dynamicParameters.Add("Lote", produto.Lote);
                dynamicParameters.Add("Validade",produto.DataValidade);
                dynamicParameters.Add("FOR_CD_FORNECEDOR", fornecedor);

                 
                await connection.ExecuteAsync(ProdutoDepositoScript.InserirNovoProdutoDeposito, dynamicParameters); 
                connection.Close();

            }
        }

        public async Task InserirMovimentacao(MovimentacaoDto lista)
        {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {
                connection.Open();

                DynamicParameters dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("PRODUTO", lista.Produto);
                dynamicParameters.Add("DEPOSITO", lista.Deposito);
                dynamicParameters.Add("TIPO_MOVIMENTACAO", lista.TipoMovimentacao);
                dynamicParameters.Add("QUANTIDADE", lista.Quantidade);
                dynamicParameters.Add("OBSERVACAO", lista.Observacao);
                dynamicParameters.Add("USUARIOID", lista.Usuario);
               
                await connection.ExecuteAsync(ProdutoDepositoScript.Movimentacao, dynamicParameters);
                connection.Close();

            }
        }
        public async Task AtualizarEntrada(MovimentacaoDto lista)
        {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {
                connection.Open();
                DynamicParameters dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("PRODUTO", lista.Produto);
                dynamicParameters.Add("DEPOSITO", lista.Deposito);
                dynamicParameters.Add("QUANTIDADE", lista.Quantidade);

                await connection.ExecuteAsync(ProdutoDepositoScript.AtualizarEntrada, dynamicParameters);
                connection.Close();
            }
        }
        public async Task AtualizarSaida(MovimentacaoDto lista)
        {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {
                connection.Open();
                DynamicParameters dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("PRODUTO", lista.Produto);
                dynamicParameters.Add("DEPOSITO", lista.Deposito);
                dynamicParameters.Add("QUANTIDADE", lista.Quantidade);

                await connection.ExecuteAsync(ProdutoDepositoScript.AtualizarSaida, dynamicParameters);
                connection.Close();
            }
        }
        public async Task AtualizarReserva(MovimentacaoDto lista)
        {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {
                connection.Open();
                DynamicParameters dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("PRODUTO", lista.Produto);
                dynamicParameters.Add("DEPOSITO", lista.Deposito);
                dynamicParameters.Add("QUANTIDADE", lista.Quantidade);

                await connection.ExecuteAsync(ProdutoDepositoScript.AtualizarReserva, dynamicParameters);
                connection.Close();
            }
        }
        public async Task AtualizarLiberacao(MovimentacaoDto lista)
        {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {
                connection.Open();
                DynamicParameters dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("PRODUTO", lista.Produto);
                dynamicParameters.Add("DEPOSITO", lista.Deposito);
                dynamicParameters.Add("QUANTIDADE", lista.Quantidade);

                await connection.ExecuteAsync(ProdutoDepositoScript.AtualizarLiberacao, dynamicParameters);
                connection.Close();
            }
        }
        public async Task AtualizarPendente(MovimentacaoDto lista)
        {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {
                connection.Open();
                DynamicParameters dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("PRODUTO", lista.Produto);
                dynamicParameters.Add("DEPOSITO", lista.Deposito);
                dynamicParameters.Add("QUANTIDADE", lista.Quantidade);

                await connection.ExecuteAsync(ProdutoDepositoScript.AtualizarPendente, dynamicParameters);
                connection.Close();
            }
        }
  
    }
}

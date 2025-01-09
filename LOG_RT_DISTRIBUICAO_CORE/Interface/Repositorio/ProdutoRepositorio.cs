using Dapper;
using LOG_RT_DISTRIBUICAO_CORE.Dto;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Script;
using System.Data.SqlClient;
using System.Runtime.InteropServices;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio {
    public class ProdutoRepositorio : IProdutoRepositorio {
        private readonly SqlConnection _sqlConnection;

        public ProdutoRepositorio(SqlConnection sqlConnection) {
            _sqlConnection = sqlConnection ?? throw new ArgumentNullException(nameof(sqlConnection));
        }

        public IEnumerable<ProdutoDto> BuscarProdutoRepositorio(int codigo) {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString)) {

                connection.Open();

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("Produto", codigo);

                var buscar = connection.Query<ProdutoDto>(ProdutoScript.BuscarProduto, parameters);
                connection.Close();

                return buscar;
            }
        }

        public int BuscarProduto(int produto) {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString)) {

                connection.Open();

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("Produto", produto);

                int buscar = connection.QueryFirstOrDefault<int>(ProdutoScript.BuscarProdutoExistente, parameters);

                connection.Close();

                return buscar;

            }
        }

        public async Task InserirProdutoNovo(int produto, int digito, string? descricao, string? caregoria) {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString)) {
                connection.Open();

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("Produto", produto);
                parameters.Add("Digito", digito);
                parameters.Add("Descricao", descricao);
                parameters.Add("Categoria", caregoria);

                await connection.ExecuteAsync(ProdutoScript.InserirNovoProduto, parameters);

            }
        }

        public async Task MudarProdutoNovo(int produto, int digito, string situacao) {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString)) {
                connection.Open();

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("Produto", produto);
                parameters.Add("Digito", digito);
                parameters.Add("Situacao", situacao);
               
                await connection.ExecuteAsync(ProdutoScript.AlterarSituacaoProduto, parameters);

            }
        }
        public async Task DeletarProduto(ProdutoDto produto) {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString)) {
                connection.Open();

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("Produto", produto.Produto);
                parameters.Add("Digito", produto.Digito);

                await connection.ExecuteAsync(ProdutoScript.DeletarProduto, parameters);

            }
        }
    }
}

using Dapper;
using LOG_RT_DISTRIBUICAO_CORE.Dto;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Script;
using Microsoft.IdentityModel.Logging;
using System.Data.SqlClient;
using System.Runtime.InteropServices;
using System.Text.RegularExpressions;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio
{
    public class ProdutoRepositorio : IProdutoRepositorio
    {
        private readonly SqlConnection _sqlConnection;

        public ProdutoRepositorio(SqlConnection sqlConnection)
        {
            _sqlConnection = sqlConnection ?? throw new ArgumentNullException(nameof(sqlConnection));
        }

        public IEnumerable<ProdutoDto> BuscarProdutoRepositorio(int codigo)
        {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {

                connection.Open();

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("Produto", codigo);

                var buscar = connection.Query<ProdutoDto>(ProdutoScript.BuscarProduto, parameters);
                connection.Close();

                return buscar;
            }
        }
        public IEnumerable<ProdutoDto> BuscarProdutosRepositorio()
        {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {

                connection.Open();

                var buscar = connection.Query<ProdutoDto>(ProdutoScript.BuscarProdutos, null);
                connection.Close();

                return buscar;
            }
        }

        public int BuscarProduto(int produto)
        {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {

                connection.Open();

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("Produto", produto);

                int buscar = connection.QueryFirstOrDefault<int>(ProdutoScript.BuscarProdutoExistente, parameters);

                connection.Close();

                return buscar;

            }
        }
        public int VerificarSeExisteProduto(ProdutoDto produto)
        {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {
                connection.Open();

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("CodigoProduto", produto.Produto);
                parameters.Add("PM_CD_DIGITO", produto.Digito);

                int buscar = connection.QueryFirstOrDefault<int>(ProdutoScript.VerificarProdutoExistente, parameters);

                connection.Close();

                return buscar;

            }
        }
      
        public async Task<int> BuscarMaiorCodigo()
        {
            using (var conexao = new SqlConnection(_sqlConnection.ConnectionString))
            {
                conexao.Open();

                var menorDisponivel = await conexao.ExecuteScalarAsync<int?>(ProdutoScript.BuscarMenorProduto);

                if (menorDisponivel.HasValue)
                    return menorDisponivel.Value;

                var buscar = await conexao.ExecuteScalarAsync<int>(ProdutoScript.BuscarMaiorProduto);
                conexao.Close();

                return buscar;
            }

        
        }


        public int BuscarTipo(string tipo)
        {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {

                connection.Open();

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("Tipo", tipo);

                int buscar = connection.QueryFirstOrDefault<int>(ProdutoScript.BuscarTipo, parameters);

                connection.Close();

                return buscar;

            }
        }
        public int BuscarGrupo(string grupo)
        {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {

                connection.Open();

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("Grupo", grupo);

                int buscar = connection.QueryFirstOrDefault<int>(ProdutoScript.BuscarGrupo, parameters);

                connection.Close();

                return buscar;

            }
        }
        public int BuscarUnidade(string unidade)
        {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {

                connection.Open();

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("Unidade", unidade);

                int buscar = connection.QueryFirstOrDefault<int>(ProdutoScript.BuscarUnidade, parameters);

                connection.Close();

                return buscar;

            }
        }

        public async Task InserirProdutoNovo(ProdutoDto produto, int produtoAleatorio , int digito, int tipo, int grupo, int unidade)
        {

            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {
                connection.Open();
              
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("PM_CD_PRODUTO", produto.codigoBloqueado  == false ? produto.Produto : produtoAleatorio);
                    parameters.Add("PM_CD_DIGITO", digito);
                    parameters.Add("PM_TX_DESCRICAO", produto.Nome);
                    parameters.Add("PM_TX_MARCA", produto.Marca);
                    parameters.Add("PM_ST_SITUACAO", produto.Situacao);
                    parameters.Add("UNIDADE_MEDIDA", produto.UnidadeMedida);
                    parameters.Add("PM_RS_CUSTO", produto.Custo);
                    parameters.Add("PM_RS_PERC_LUCRO", produto.PercLucro);
                    parameters.Add("PM_RS_PRECO_VENDA", produto.PrecoVenda);
                    parameters.Add("PM_RS_COMISSAO", produto.Comissao);
                    parameters.Add("PM_RS_LIQUIDO", produto.Liquido);
                    parameters.Add("ID_TIPO", tipo);
                    parameters.Add("ID_GRUPO", grupo);
                    parameters.Add("ID_UNIDADE_MEDIDA", unidade);
                    parameters.Add("FORNECEDOR", produto.Fornecedor);


                    await connection.ExecuteAsync(ProdutoScript.InserirNovoProduto, parameters);
                
                connection.Close();
            }
        }

        public async Task MudarProdutoNovo(int produto, int digito, string situacao)
        {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {
                connection.Open();

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("Produto", produto);
                parameters.Add("Digito", digito);
                parameters.Add("Situacao", situacao);

                await connection.ExecuteAsync(ProdutoScript.AlterarSituacaoProduto, parameters);


                connection.Close();
            }
        }
        public async Task EditarProduto(int produto, int digito, decimal? liquido, decimal? comissao, decimal? precoVenda, decimal? percLucro, decimal? custo)
        {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {
                connection.Open();

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("Produto", produto);
                parameters.Add("Digito", digito);
                parameters.Add("Liquido", liquido);
                parameters.Add("Comissao", comissao);
                parameters.Add("PrecoVenda", precoVenda);
                parameters.Add("PercLucro", percLucro);
                parameters.Add("Custo", custo);

                await connection.ExecuteAsync(ProdutoScript.EditarProduto, parameters);

                connection.Close();
            }
        }  
        public async Task ExcluirProduto(int produto, int digito)
        {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {
                connection.Open();

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("Produto", produto);
                parameters.Add("Digito", digito);

                await connection.ExecuteAsync(ProdutoScript.Excluir, parameters);

                connection.Close();
            }
        }

    }
}

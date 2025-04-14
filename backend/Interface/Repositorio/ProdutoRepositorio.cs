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
                parameters.Add("Descricao", produto.Nome);
                parameters.Add("IdTipo", produto.Id_Tipo);
                parameters.Add("IdUnidade", produto.Id_Unidade);

                int buscar = connection.QueryFirstOrDefault<int>(ProdutoScript.VerificarProdutoExistente, parameters);

                connection.Close();

                return buscar;

            }
        }
        public int VerificarSeExisteCodigo(int produto)
        {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {
                connection.Open();

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("CodigoProduto", produto);

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

        public async Task InserirProdutoNovo(List<ProdutoDto> produto, int produtoAleatorio , int digito, int tipo, int grupo, int unidade)
        {

            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {
                connection.Open();

                foreach (var item in produto)
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("PM_CD_PRODUTO", item.codigoBloqueado  == false ? item.Produto : produtoAleatorio );
                    parameters.Add("PM_CD_DIGITO", digito);
                    parameters.Add("PM_TX_DESCRICAO", item.Nome);
                    parameters.Add("PM_TX_MARCA", item.Marca);
                    parameters.Add("PM_ST_SITUACAO", item.Situacao);
                    parameters.Add("UNIDADE_MEDIDA", item.UnidadeMedida);
                    parameters.Add("PM_RS_CUSTO", item.Custo);
                    parameters.Add("PM_RS_PERC_LUCRO", item.PercLucro);
                    parameters.Add("PM_RS_PRECO_VENDA", item.PrecoVenda);
                    parameters.Add("PM_RS_COMISSAO", item.Comissao);
                    parameters.Add("PM_RS_LIQUIDO", item.Liquido);
                    parameters.Add("ID_TIPO", tipo);
                    parameters.Add("ID_GRUPO", grupo);
                    parameters.Add("ID_UNIDADE_MEDIDA", unidade);

                    await connection.ExecuteAsync(ProdutoScript.InserirNovoProduto, parameters);
                }
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

    }
}

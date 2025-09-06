using System.Data.SqlClient;
using Dapper;
using LOG_RT_DISTRIBUICAO_CORE.Dto;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Script;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio
{
    public class FornecedorRepositorio : IFornecedorRepositorio
    {
        private readonly SqlConnection _sqlConnection;

        public FornecedorRepositorio(SqlConnection sqlConnection)
        {
            _sqlConnection = sqlConnection ?? throw new ArgumentNullException(nameof(sqlConnection));
        }

        public IEnumerable<FornecedorDto> BuscarFornecedorRepositorio()
        {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {

                connection.Open();

                var buscar = connection.Query<FornecedorDto>(FornecedorScript.BuscarFornecedor, null);
                connection.Close();

                return buscar;
            }
        } 
        public int GetFornecedor()
        {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {
                connection.Open();

                var buscar = connection.QuerySingle<int>(FornecedorScript.Fornecedor, null);
                connection.Close();

                return buscar;
            }
        }

        public async Task ImportarFornecedor(FornecedorDto produtos, int codigo)
        {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {
                connection.Open();
               
                DynamicParameters dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("FORN_CD_CODIGO", codigo);
                dynamicParameters.Add("FORN_CN_CNPJ", Convert.ToInt64(produtos.Cnpj));
                dynamicParameters.Add("FORN_IE_INSESTADUAL", produtos.InscricaoEstadual);
                dynamicParameters.Add("FORN_NM_NOME", produtos.Nome);
                dynamicParameters.Add("FORN_FT_FANTASIA", produtos.Fantasia);
                dynamicParameters.Add("FORN_NJ_JURIDICA", produtos.NaturezaJuridica);
                dynamicParameters.Add("FORN_EN_ENDERECO", produtos.Endereco);
                dynamicParameters.Add("FORN_NM_NUMERO", produtos.Numero);
                dynamicParameters.Add("FORN_CD_CIDADE", produtos.Cidade);
                dynamicParameters.Add("FORN_BR_BAIRRO", produtos.Bairro);
                dynamicParameters.Add("FORN_UF_ESTADO", produtos.Uf);
                dynamicParameters.Add("FORN_CP_CEP", produtos.Cep);
                dynamicParameters.Add("FORN_EM_EMAIL", produtos.Email);
                dynamicParameters.Add("FORN_ST_SITUACAO", produtos.Situacao);
                dynamicParameters.Add("FORN_SC_SITUACAO_CADASTRAL", produtos.SituacaoCadastral);
                dynamicParameters.Add("FORN_CP_COMPLEMENTO", produtos.Complemento);
                dynamicParameters.Add("FORN_OB_OBSERVACAO", produtos.Observacoes);
                dynamicParameters.Add("FORN_TL_TELEFONE",Convert.ToInt64(produtos.Telefone));

                await connection.ExecuteAsync(FornecedorScript.Importar, dynamicParameters);

                connection.Close();
            }
        }
    }
}

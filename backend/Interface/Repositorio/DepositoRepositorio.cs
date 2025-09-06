using System.Data.SqlClient;
using Dapper;
using LOG_RT_DISTRIBUICAO_CORE.Dto;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Script;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio
{
    public class DepositoRepositorio : IDepositoRepositorio
    {
        private readonly SqlConnection _sqlConnection;

        public DepositoRepositorio(SqlConnection sqlConnection)
        {
            _sqlConnection = sqlConnection ?? throw new ArgumentNullException(nameof(sqlConnection));
        }

        public int Deposito()
        {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {

                connection.Open();

                var buscar = connection.QuerySingleOrDefault<int>(DepositoScript.Deposito, null);
                connection.Close();

                return buscar;
            }
        }

        public IEnumerable<DepositoDto> Buscar()
        {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {
                connection.Open();

                var buscar = connection.Query<DepositoDto>(DepositoScript.BuscarDeposito, null);
                connection.Close();
                return buscar;  

            }
        }
        public async Task ImportarDeposito(DepositoDto deposito, int codigo)
        {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {
                connection.Open();
                DynamicParameters dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("CD_DEPOSITO", codigo);
                dynamicParameters.Add("NM_DEPOSITO", deposito.Nome);
                dynamicParameters.Add("END_LOGRADOURO", deposito.Endereco);
                dynamicParameters.Add("END_NUMERO", deposito.Numero);
                dynamicParameters.Add("END_BAIRRO", deposito.Bairro);
                dynamicParameters.Add("END_CIDADE", deposito.Cidade);
                dynamicParameters.Add("END_UF", deposito.Uf);
                dynamicParameters.Add("END_CEP", deposito.Cep);
                dynamicParameters.Add("CONTATO_TELEFONE", deposito.Telefone);
                dynamicParameters.Add("CONTATO_EMAIL", deposito.Email);
                dynamicParameters.Add("CAPACIDADE_M3", deposito.Capacidade);
                dynamicParameters.Add("PRODUTOS_RESTRITOS", deposito.ProdutosRestritos);
                dynamicParameters.Add("CODIGO_FISCAL", deposito.CodigoFiscal);
                dynamicParameters.Add("CNPJ_VINCULADO", deposito.Cnpj);
                dynamicParameters.Add("SITUACAO", deposito.Situacao);
                dynamicParameters.Add("FNT_DEPOSITO", deposito.Fantasia);

                await connection.ExecuteAsync(DepositoScript.Importar, dynamicParameters);
                connection.Close();

            }
        }
    }
}

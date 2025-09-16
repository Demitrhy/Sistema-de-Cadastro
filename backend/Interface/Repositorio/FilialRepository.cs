using Dapper;
using LOG_RT_DISTRIBUICAO_CORE.Dto;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Script;
using System;
using System.Data.SqlClient;
using Twilio.Rest.Messaging.V1;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio
{
    public class FilialRepository : IFilialRepository
    {
        private readonly SqlConnection _sqlConnection;
        private readonly Random _random;
        public FilialRepository(SqlConnection sqlConnection)
        {
            _sqlConnection = sqlConnection ?? throw new ArgumentNullException(nameof(sqlConnection));
            _random = new Random();
        }

        public IEnumerable<FilialDto> BuscarFilialRepository()
        {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {
                connection.Open();

                var buscar = connection.Query<FilialDto>(FilialScript.BuscarFilial);
                connection.Close();

                return buscar;
            }
        }
        public async Task InserirNovaFilial(FilialDto filial)
        {
            using (var connection = new SqlConnection(_sqlConnection.ConnectionString))
            {
                connection.Open();

                int produtoAleatorio = _random.Next(1, 100);

                DynamicParameters dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("FILI_CD_FILIAL", filial.codigoBloqueado == false ? filial.CodigoFilial : produtoAleatorio);
                dynamicParameters.Add("FILI_NM_FANTASIA", filial.NomeFantasia);
                dynamicParameters.Add("FILI_NM_RAZAO_SOC", filial.RazaoSocial);
                dynamicParameters.Add("FILI_NR_CNPJ", Convert.ToInt64(filial.Cnpj));
                dynamicParameters.Add("FILI_NR_IE", filial.InscricaoEstadual);
                dynamicParameters.Add("FILI_NR_IM", filial.InscricaoMunicipal);
                dynamicParameters.Add("FILI_DS_LOGRADOURO", filial.Logradouro);
                dynamicParameters.Add("FILI_NR_NUMERO", filial.Numero);
                dynamicParameters.Add("FILI_DS_COMPLEMENTO", filial.Complemento);
                dynamicParameters.Add("FILI_NM_BAIRRO", filial.Bairro);
                dynamicParameters.Add("FILI_NR_CEP", Convert.ToInt64(filial.Cep));
                dynamicParameters.Add("FILI_NR_TELEFONE", Convert.ToInt64(filial.Telefone));
                dynamicParameters.Add("FILI_DS_EMAIL", filial.Email);
                dynamicParameters.Add("FILI_CD_DEPOSITO", filial.CodigoDeposito);
                dynamicParameters.Add("FILI_DT_ABERTURA", filial.DataAbertura);
                dynamicParameters.Add("FILI_ST_SITUACAO", filial.Situacao);
                dynamicParameters.Add("FILI_CD_CIDADE", filial.Cidade);
                dynamicParameters.Add("FILI_UF_UF", filial.Uf);

                 await connection.ExecuteAsync(FilialScript.InserirNovaFilial, dynamicParameters);
              

                connection.Close();
            }
        }
    }
}

using Dapper;
using LOG_RT_DISTRIBUICAO_CORE.Dto;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Script;
using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio 
{
    public class ProdutoRepositorio : IProdutoRepositorio
    {
        private readonly SqlConnection _sqlConnection;
        private readonly AppDbContext _dbContext;

        public ProdutoRepositorio( SqlConnection sqlConnection, AppDbContext dbContext) {
            _sqlConnection = sqlConnection;
            _dbContext = dbContext;
        }


        public IEnumerable<ProdutoDto> BuscarProdutoReposityrio(int codigo) {
            using (var conn = _sqlConnection) {
              
                DynamicParameters dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("Produto", codigo);

                var buscar = _sqlConnection.Query<ProdutoDto>(ProdutoScript.BuscarProduto, dynamicParameters);
                return buscar;
             
            }
        }
    }
}

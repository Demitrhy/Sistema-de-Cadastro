namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio
{
 // Contexto do seu DbContext
    using Microsoft.EntityFrameworkCore;
    using System.Threading.Tasks;
    using global::LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface;
    using global::LOG_RT_DISTRIBUICAO_CORE.Dto;
    using Dapper;
    using global::LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Script;
    using System.Data.SqlClient;
    using Microsoft.Data.SqlClient;

    namespace LOG_RT_DISTRIBUICAO_CORE.Repositorio
    {
        public class UserRepository : IUserRepository
        {
            private readonly AppDbContext _context;
            private readonly System.Data.SqlClient.SqlConnection _sqlConnection;

            public UserRepository(AppDbContext context, System.Data.SqlClient.SqlConnection sqlConnection)
            {
                _context = context;
                _sqlConnection = sqlConnection;
            }

            public IEnumerable<UserDto> BuscarUsuarioExistente()
            {
                using (var connection = new System.Data.SqlClient.SqlConnection(_sqlConnection.ConnectionString))
                {

                    connection.Open();

                    var buscar = connection.Query<UserDto>(ProdutoScript.BuscarDadosUsuario, null);
                    connection.Close();

                    return buscar;
                }
            }
            public async Task<UserDto> GetByEmailAsync(string email)
            {
                return await _context.Usuario.FirstOrDefaultAsync(u => u.Email == email);
            }

            public async Task AddAsync(UserDto dto)
            {
                var user = new UserDto
                {
                    Nome = dto.Nome,
                    Sobrenome = dto.Sobrenome,
                    Telefone = dto.Telefone,
                    Email = dto.Email,
                    Senha = dto.Senha
                };

                await _context.Usuario.AddAsync(user);
                await _context.SaveChangesAsync();
            }
         
        }
    }

       
        

}

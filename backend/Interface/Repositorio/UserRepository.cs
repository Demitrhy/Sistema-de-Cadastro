namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio
{
 // Contexto do seu DbContext
    using Microsoft.EntityFrameworkCore;
    using System.Threading.Tasks;
    using global::LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface;
    using global::LOG_RT_DISTRIBUICAO_CORE.Dto;

    namespace LOG_RT_DISTRIBUICAO_CORE.Repositorio
    {
        public class UserRepository : IUserRepository
        {
            private readonly AppDbContext _context;

            public UserRepository(AppDbContext context)
            {
                _context = context;
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

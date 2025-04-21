using LOG_RT_DISTRIBUICAO_CORE.Dto;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface
{
    public interface IUserRepository
    {
        Task<UserDto> GetByEmailAsync(string email);
        Task AddAsync(UserDto user);
        Task EditarUsuario(int id, string nome, string sobrenome, long telefone, string email);
        IEnumerable<UserDto> BuscarUsuarioExistente();  

    }
}

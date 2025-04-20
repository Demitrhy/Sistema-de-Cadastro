using LOG_RT_DISTRIBUICAO_CORE.Dto;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Service;
using Microsoft.AspNetCore.Mvc;

namespace LOG_RT_DISTRIBUICAO_CORE.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ILogin _login;
        private readonly AppDbContext _context;
        private readonly IUserRepository _userRepository;

        public AuthController(ILogin login, AppDbContext context, IUserRepository userRepository)
        {
            _login = login;
            _context = context;
            _userRepository = userRepository;
        }

        [HttpGet("BuscarUsuario")]
        public IEnumerable<UserDto> GetAll()
        {
            var dados = _userRepository.BuscarUsuarioExistente();
            return dados;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserLoginDto dto)
        {

            if (string.IsNullOrEmpty(dto.Email) || string.IsNullOrEmpty(dto.Senha))
            {
                return BadRequest("Email e senha são obrigatórios.");
            }


            var userExists = await _userRepository.GetByEmailAsync(dto.Email);
            if (userExists != null)
            {
                return BadRequest("Este e-mail já está em uso.");
            }

            // Hash da senha
            var senhaHash = _login.HashSenha(dto.Senha);

            // Criar usuário
            var user = new UserDto
            {
                Nome = dto.Nome,
                Sobrenome = dto.Sobrenome,
                Telefone = dto.Telefone,
                Email = dto.Email,
                Senha = senhaHash
            };

            await _userRepository.AddAsync(user);

            // Retornar resposta
            return Ok(new { message = "Usuário registrado com sucesso!" });
        }

        // Endpoint para login de usuário
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            // Validar credenciais
            var user = await _userRepository.GetByEmailAsync(dto.Email);
            if (user == null || !_login.VerificarSenha(dto.Senha, user.Senha))
            {
                return Unauthorized("E-mail ou senha inválidos.");
            }

            // Gerar o token JWT
            var token = _login.GerarToken(user.Email);

            return Ok(new { token });
        }
    }

}


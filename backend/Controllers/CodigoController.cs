using System.Threading.Tasks;
using LOG_RT_DISTRIBUICAO_CORE.Dto;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LOG_RT_DISTRIBUICAO_CORE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CodigoController : ControllerBase
    {
        private readonly ICodigoService _codigoService;
        private readonly AppDbContext _context;

        public CodigoController(ICodigoService codigoService, AppDbContext context)
        {
            _codigoService = codigoService;
            _context = context;
        }

        [HttpPost("enviarCodigo")]
        public IActionResult EnviarCodigo([FromBody] CodigoVerificacaoDto request)
        {
            if (string.IsNullOrEmpty(request.Email))
                return BadRequest("E-mail inválido.");

            var codigoGerado = _codigoService.GerarCodigo();
            _codigoService.ArmazenarCodigo(request.Email, codigoGerado);
            _codigoService.EnviarCodigoEmail(request.Email, codigoGerado);

            return Ok("Código enviado com sucesso.");
        }

      
        [HttpPost("validarCodigo")]
        public IActionResult ValidarCodigo([FromBody] CodigoVerificacaoDto request)
        {
            if (_codigoService.ValidarCodigo(request.Email, request.Codigo))
            {
                return Ok("Código válido.");
            }
            else
            {
                return BadRequest("Código inválido.");
            }
        }

        [HttpPost("redefimirSenha")]
        public async Task<IActionResult> RedefinirSenha([FromBody] RedefinirSenhaDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.Senha))
                return BadRequest("Email e nova senha são obrigatórios.");

            var usuario = await _context.Usuario.FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (usuario == null)
                return NotFound("Usuário não encontrado.");

            // Recomendado: criptografar a nova senha
            var novaSenhaHash = BCrypt.Net.BCrypt.HashPassword(dto.Senha);
            usuario.Senha = novaSenhaHash;

            await _context.SaveChangesAsync();
            _codigoService.RedefinirSenhaSucesso(dto.Email);

            return Ok("Senha atualizada com sucesso.");
        }

      
    }
}


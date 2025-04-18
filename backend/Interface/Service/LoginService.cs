using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface;
using Microsoft.IdentityModel.Tokens;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Service
{
    public class LoginService : ILogin
    {
        private readonly string _secretKey;

        public LoginService(IConfiguration configuration)
        {
            _secretKey = configuration["JwtSettings:SecretKey"];
        }


        public string GerarToken(string email)
        {
            var key = Encoding.ASCII.GetBytes(_secretKey);
            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim(ClaimTypes.Email, email)
            }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        // Método para gerar o hash da senha
        public string HashSenha(string senha)
        {
            return BCrypt.Net.BCrypt.HashPassword(senha);
        }

        // Método para verificar se a senha informada confere com o hash
        public bool VerificarSenha(string senha, string senhaHash)
        {
            return BCrypt.Net.BCrypt.Verify(senha, senhaHash);
        }
    }
}


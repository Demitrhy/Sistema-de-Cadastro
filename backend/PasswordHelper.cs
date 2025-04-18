namespace LOG_RT_DISTRIBUICAO_CORE
{
    public static class PasswordHelper
    {
        // Criptografar a senha
        public static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        // Verificar se a senha informada bate com o hash salvo
        public static bool VerifyPassword(string password, string hash)
        {
            return BCrypt.Net.BCrypt.Verify(password, hash);
        }
    }

}

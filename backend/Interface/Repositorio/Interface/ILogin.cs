namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface
{
    public interface ILogin
    {

        string GerarToken(string email);
        string HashSenha(string senha);
        bool VerificarSenha(string senha, string senhaHash);
    }
}

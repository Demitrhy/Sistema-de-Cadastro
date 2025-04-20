using LOG_RT_DISTRIBUICAO_CORE.Dto;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface
{
    public interface ICodigoService
    {
        void EnviarCodigoEmail(string email, string codigo);
        void RedefinirSenhaSucesso(string email);
        string GerarCodigo();
       
        bool ValidarCodigo(string contato, string codigoInserido);
        void ArmazenarCodigo(string contato, string codigo);
    }
}

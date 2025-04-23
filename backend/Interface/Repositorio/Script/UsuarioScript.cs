namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Script
{
    public class UsuarioScript
    {
        public static string BuscarDadosUsuario => @"
           SELECT Id,	Nome,	SobreNome,	Telefone,	Email
             FROM USUARIO 
            
          ";

        public static string EditarUsuario => @"
           UPDATE US 
            SET NOME = @Nome,
            SOBRENOME = @Sobrenome,
            TELEFONE = @Telefone,
            EMAIL = @Email 
            FROM USUARIO US
            WHERE ID = @Id
         ";

    }
}

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Script
{
    public class DepositoScript
    {
        public static string Deposito => @"
           SELECT TOP 1 CD_DEPOSITO  FROM DEPOSITO 
                ORDER BY CD_DEPOSITO DESC   
           ";

        public static string BuscarDeposito => @"
            SELECT CD_DEPOSITO as Codigo, NM_DEPOSITO as Nome FROM DEPOSITO   
           ";

        public static string Importar => @"
          
            INSERT INTO dbo.DEPOSITO
                       (CD_DEPOSITO
                       ,NM_DEPOSITO
                       ,END_LOGRADOURO
                       ,END_NUMERO
                       ,END_BAIRRO
                       ,END_CIDADE
                       ,END_UF
                       ,END_CEP
                       ,END_PAIS
                       ,CONTATO_TELEFONE
                       ,CONTATO_EMAIL
                       ,CAPACIDADE_M3
                       ,PRODUTOS_RESTRITOS
                       ,CODIGO_FISCAL
                       ,CNPJ_VINCULADO
                       ,DATA_CADASTRO
                       ,SITUACAO
                       ,FNT_DEPOSITO)
                 VALUES
                       (@CD_DEPOSITO
                       ,@NM_DEPOSITO
                       ,@END_LOGRADOURO
                       ,@END_NUMERO
                       ,@END_BAIRRO
                       ,@END_CIDADE
                       ,@END_UF
                       ,@END_CEP
                       ,'BRAZIL'
                       ,@CONTATO_TELEFONE
                       ,@CONTATO_EMAIL
                       ,@CAPACIDADE_M3
                       ,@PRODUTOS_RESTRITOS
                       ,@CODIGO_FISCAL
                       ,@CNPJ_VINCULADO
                       ,GETDATE()
                       ,@SITUACAO
                       ,@FNT_DEPOSITO)   
           ";
    }
}

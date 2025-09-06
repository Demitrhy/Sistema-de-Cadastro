namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Script
{
    public class FornecedorScript
    {

        public static string BuscarFornecedor => @"
          SELECT 
            FORN_CD_CODIGO	AS Codigo
            ,FORN_CN_CNPJ  AS Cnpj
            ,FORN_IE_INSESTADUAL AS InscricaoEstadual
            ,FORN_NM_NOME	AS Nome
            ,FORN_FT_FANTASIA	as Fantasia
            ,FORN_NJ_JURIDICA	as NaturezaJuridica
            ,FORN_EN_ENDERECO	as Endereco
            ,FORN_NM_NUMERO	  as Numero
            ,FORN_CD_CIDADE	 as Cidade
            ,FORN_BR_BAIRRO	 as Bairro
            ,FORN_UF_ESTADO	as Uf
            ,FORN_CP_CEP	as Cep
            ,FORN_EM_EMAIL	as Email
            ,FORN_ST_SITUACAO	 as Situacao
            ,FORN_SC_SITUACAO_CADASTRAL as SituacaoCadastral
            ,FORN_CP_COMPLEMENTO	as Complemento
            ,FORN_OB_OBSERVACAO as Observacao
            ,FORN_TL_TELEFONE as Telefone 
             FROM FORNECEDOR
           ";

        public static string Fornecedor => @"
          SELECT top 1 
            FORN_CD_CODIGO	AS Codigo
             FROM FORNECEDOR
                ORDER BY FORN_CD_CODIGO DESC
           ";

        public static string Importar => @"

         INSERT INTO dbo.FORNECEDOR
                   (FORN_CD_CODIGO
                   ,FORN_CN_CNPJ
                   ,FORN_IE_INSESTADUAL
                   ,FORN_NM_NOME
                   ,FORN_FT_FANTASIA
                   ,FORN_NJ_JURIDICA
                   ,FORN_EN_ENDERECO
                   ,FORN_NM_NUMERO
                   ,FORN_CD_CIDADE
                   ,FORN_BR_BAIRRO
                   ,FORN_UF_ESTADO
                   ,FORN_CP_CEP
                   ,FORN_EM_EMAIL
                   ,FORN_ST_SITUACAO
                   ,FORN_SC_SITUACAO_CADASTRAL
                   ,FORN_CP_COMPLEMENTO
                   ,FORN_OB_OBSERVACAO
                   ,FORN_TL_TELEFONE)
             VALUES
                   (@FORN_CD_CODIGO,
                    @FORN_CN_CNPJ,
                    @FORN_IE_INSESTADUAL,
                    @FORN_NM_NOME, 
                    @FORN_FT_FANTASIA, 
                    @FORN_NJ_JURIDICA, 
                    @FORN_EN_ENDERECO, 
                    @FORN_NM_NUMERO,
                    @FORN_CD_CIDADE, 
                    @FORN_BR_BAIRRO, 
                    @FORN_UF_ESTADO, 
                    @FORN_CP_CEP,
                    @FORN_EM_EMAIL, 
                    @FORN_ST_SITUACAO,
                    @FORN_SC_SITUACAO_CADASTRAL, 
                    @FORN_CP_COMPLEMENTO, 
                    @FORN_OB_OBSERVACAO,
                    @FORN_TL_TELEFONE
                     )
         ";

    }
}

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Script
{
    public class FilialScript
    {

        public static string BuscarFilial => @"
         SELECT  
            FILI_CD_FILIAL AS CodigoFilial,
            FILI_NM_FANTASIA AS NomeFantasia
            FROM FILIAL 
  
        ";

        public static string InserirNovaFilial => @"
                   INSERT INTO FILIAL (
                    FILI_CD_FILIAL,
                    FILI_NM_FANTASIA,
                    FILI_NM_RAZAO_SOC,
                    FILI_NR_CNPJ,
                    FILI_NR_IE,
                    FILI_NR_IM,
                    FILI_DS_LOGRADOURO,
                    FILI_NR_NUMERO,
                    FILI_DS_COMPLEMENTO,
                    FILI_NM_BAIRRO,
                    FILI_NR_CEP,
                    FILI_NR_TELEFONE,
                    FILI_DS_EMAIL,
                    FILI_CD_DEPOSITO,
                    FILI_DT_ABERTURA,
                    FILI_DT_FECHAMENTO,
                    FILI_ST_SITUACAO,
                    FILI_DT_CRIACAO,
                    FILI_CD_CIDADE,
                    FILI_UF_UF
                )
                VALUES (
                    @FILI_CD_FILIAL,
                    @FILI_NM_FANTASIA,
                    @FILI_NM_RAZAO_SOC,
                    @FILI_NR_CNPJ,
                    @FILI_NR_IE,
                    @FILI_NR_IM,
                    @FILI_DS_LOGRADOURO,
                    @FILI_NR_NUMERO,
                    @FILI_DS_COMPLEMENTO,
                    @FILI_NM_BAIRRO,
                    @FILI_NR_CEP,
                    @FILI_NR_TELEFONE,
                    @FILI_DS_EMAIL,
                    @FILI_CD_DEPOSITO,
                    @FILI_DT_ABERTURA,
                    NULL,
                    @FILI_ST_SITUACAO,
                    GETDATE(),
                    @FILI_CD_CIDADE,
                    @FILI_UF_UF                           
                );
                



        ";
    }
}

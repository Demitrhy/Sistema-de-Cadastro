namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Script
{
    public class ProdutoScript
    {
        public static string BuscarDadosUsuario => @"
           SELECT Id,	Nome,	SobreNome,	Telefone,	Email
             FROM USUARIO 
            
          ";

        public static string BuscarProduto => @"
         SELECT
            PM_CD_PRODUTO as Produto
            ,PM_CD_DIGITO	as Digito
            ,PM_TX_DESCRICAO as Nome
            ,PM_DT_DATA_HORA_CADASTRO	as Data_Hora_Cadastro
            ,PM_ST_SITUACAO	as Situacao
            ,PM_TX_MARCA	as Marca
            ,PM_RS_CUSTO	as Custo
            ,PM_RS_PERC_LUCRO	as PercLucro
            ,PM_RS_PRECO_VENDA	as PrecoVenda
            ,PM_RS_COMISSAO	as Comissao
            ,PM_RS_LIQUIDO	as Liquido 
            ,ID_TIPO as IdTipo
            ,ID_GRUPO	 as IdGrupo
            ,ID_UNIDADE_MEDIDA as IdUnidade
         FROM PRODUTO_MESTRE WHERE PM_CD_PRODUTO = @Produto
          ";
        public static string BuscarProdutos => @"
           SELECT
               PM_CD_PRODUTO as Produto
               ,PM_CD_DIGITO	as Digito
               ,PM_TX_DESCRICAO as Nome
               ,PM_DT_DATA_HORA_CADASTRO	as Data_Hora_Cadastro
               ,PM_ST_SITUACAO	as Situacao
               ,PM_TX_MARCA	as Marca
               ,PM_RS_CUSTO	as Custo
               ,PM_RS_PERC_LUCRO	as PercLucro
               ,PM_RS_PRECO_VENDA	as PrecoVenda
               ,PM_RS_COMISSAO	as Comissao
               ,PM_RS_LIQUIDO	as Liquido 
               , GP.GP_CD_CODIGO as Grupo
               , TP.TP_CD_CODIGO AS Tipo
               , UM.UM_CD_SIGLA AS UnidadeMedida
            FROM PRODUTO_MESTRE PM 
            JOIN GRUPO GP ON PM.ID_GRUPO = GP.ID
            JOIN TIPO TP ON PM.ID_TIPO = TP.ID
            AND GP.ID = TP.ID_Grupo 
            JOIN UNIDADE_MEDIDA UM ON PM.ID_UNIDADE_MEDIDA = UM.ID 

          ";

        public static string BuscarGrupo => @"

           SELECT ID FROM GRUPO WHERE GP_CD_CODIGO = @Grupo
         ";
        public static string BuscarTipo => @"

           SELECT ID FROM TIPO  WHERE  TP_CD_CODIGO = @Tipo
         ";
        public static string BuscarUnidade => @"

            SELECT ID FROM UNIDADE_MEDIDA WHERE UM_CD_SIGLA = @Unidade
         ";


        public static string BuscarProdutoExistente => @"
          SELECT 
            COUNT(*)
          FROM PRODUTO_MESTRE
          WHERE PM_CD_PRODUTO = @Produto
          ";

        public static string BuscarMaiorProduto => @"
          SELECT ISNULL(MAX(PM_CD_PRODUTO), 0) + 1 FROM PRODUTO_MESTRE
               

          ";
        public static string BuscarMenorProduto => @"
            SELECT TOP 1 n FROM (
            SELECT ROW_NUMBER() OVER (ORDER BY PM_CD_PRODUTO) AS n, PM_CD_PRODUTO
            FROM PRODUTO_MESTRE
            ) AS t
            WHERE n <> PM_CD_PRODUTO
            ORDER BY n
               
          ";

        public static string VerificarProdutoExistente => @"
           SELECT COUNT(*)
           FROM PRODUTO_MESTRE
           WHERE 
               PM_CD_PRODUTO = @CodigoProduto
               

          ";

        public static string InserirNovoProduto => @"
         
           INSERT INTO dbo.PRODUTO_MESTRE
                   (PM_CD_PRODUTO
                   ,PM_CD_DIGITO
                   ,PM_TX_DESCRICAO
                   ,PM_DT_DATA_HORA_CADASTRO
                   ,PM_ST_SITUACAO
                   ,PM_TX_MARCA
                   ,PM_RS_CUSTO
                   ,PM_RS_PERC_LUCRO
                   ,PM_RS_PRECO_VENDA
                   ,PM_RS_COMISSAO
                   ,PM_RS_LIQUIDO
                   ,ID_TIPO
                   ,ID_GRUPO
                   ,ID_UNIDADE_MEDIDA)
           VALUES
                   (@PM_CD_PRODUTO
                   ,@PM_CD_DIGITO
                   ,@PM_TX_DESCRICAO 
                   ,GETDATE() 
                   ,@PM_ST_SITUACAO
                   ,@PM_TX_MARCA 
                   ,@PM_RS_CUSTO      
                   ,@PM_RS_PERC_LUCRO 
                   ,@PM_RS_PRECO_VENDA
                   ,@PM_RS_COMISSAO   
                   ,@PM_RS_LIQUIDO    
                   ,@ID_TIPO 
                   ,@ID_GRUPO
                   ,@ID_UNIDADE_MEDIDA
        		   )     ";

        public static string AlterarSituacaoProduto => @"
          UPDATE PRODUTO_MESTRE 
             SET PM_ST_SITUACAO = @Situacao
             WHERE PM_CD_PRODUTO = @Produto 
             AND PM_CD_DIGITO = @Digito"
        ; 
        public static string EditarProduto => @"
           UPDATE PRODUTO_MESTRE 
             SET PM_RS_CUSTO = @Custo
             ,PM_RS_PERC_LUCRO = @PercLucro
             ,PM_RS_PRECO_VENDA = @PrecoVenda
             ,PM_RS_COMISSAO = @Comissao
             ,PM_RS_LIQUIDO = @Liquido
           WHERE PM_CD_PRODUTO = @Produto 
          AND PM_CD_DIGITO = @Digito"
        ;

        

    }

}

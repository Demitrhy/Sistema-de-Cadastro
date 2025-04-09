namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Script {
    public class ProdutoScript {

        public static string BuscarProduto => @"
         SELECT 
            PRODUTO             as Produto
            ,DIGITO				as Digito
            ,DESCRICAO			as Descricao
            ,DATA_HORA_CADASTRO	as Data_Hora_Cadastro
            ,SITUACAO			as Situacao
            ,TIPO				as Tipo
            ,GRUPO				as Grupo
            ,MARCA				as Marca
            ,UNIDADE_MEDIDA		as UnidadeMedida
            ,CUSTO				as Custo
            ,PERC_LUCRO			as PercLucro
            ,PRECO_VENDA		as PrecoVenda
            ,COMISSAO			as Comissao
            ,LIQUIDO			as Liquido 
              FROM PRODUTO_MESTRE
              WHERE PRODUTO = @Produto
 
 
          ";

        public static string BuscarProdutoExistente => @"
          SELECT 
            COUNT(*)
          FROM PRODUTO_MESTRE
          WHERE PRODUTO = @Produto
          ";

        public static string InserirNovoProduto => @"
         
        INSERT INTO PRODUTO_MESTRE
                   (PRODUTO
                   ,DIGITO
                   ,DESCRICAO
                   ,DATA_HORA_CADASTRO
                   ,SITUACAO
                   ,TIPO
                   ,GRUPO
                   ,MARCA
                   ,UNIDADE_MEDIDA
                   ,CUSTO
                   ,PERC_LUCRO
                   ,PRECO_VENDA
                   ,COMISSAO
                   ,LIQUIDO)
             VALUES
                   (@PRODUTO
                   ,@DIGITO
                   ,@DESCRICAO
                   ,GETDATE()
                   ,'A'
                   ,@TIPO, 
                   ,@GRUPO, 
                   ,@MARCA
                   ,@UNIDADE_MEDIDA, 
                   ,@CUSTO
                   ,@PERC_LUCRO
                   ,@PRECO_VENDA
                   ,@COMISSAO
                   ,@LIQUIDO)      ";

        public static string AlterarSituacaoProduto => @"
          UPDATE PRODUTO_MESTRE 
             SET SITUACAO = @Situacao
             WHERE PRODUTO = @Produto 
             AND DIGITO = @Digito"
        ;
        public static string DeletarProduto => @"
          DELETE PRODUTO_MESTRE 
             WHERE PRODUTO = @Produto 
             AND DIGITO = @Digito"
      ;

    }

}

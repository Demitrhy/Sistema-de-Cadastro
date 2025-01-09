namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Script {
    public class ProdutoScript
    {

        public static string BuscarProduto => @"
          SELECT 
              PRODUTO	AS Produto,
              DIGITO	AS Digito,
              DESCRICAO	AS Descricao,
              CATEGORIA	AS Categoria,
              SITUACAO AS Situacao,
              DATA_HORA_CADASTRO AS Data_Hora_Cadastro
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
           ,CATEGORIA
           ,DATA_HORA_CADASTRO
           ,SITUACAO)
          VALUES
           (@Produto,
		   @Digito,
		   @Descricao,
		   @Categoria,
		   GETDATE(),
           'A')";

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

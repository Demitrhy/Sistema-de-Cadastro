namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Script {
    public class ProdutoScript
    {

        public static string BuscarProduto => @"
          SELECT 
              PRODUTO	AS Produto,
              DIGITO	AS Digito,
              DESCRICAO	AS Descricao,
              CATEGORIA	AS Categoria,
              DATA_HORA_CADASTRO AS Data_Hora_Cadastro 
          FROM PRODUTO_MESTRE
          WHERE PRODUTO = @Produto
          ";
    }
}

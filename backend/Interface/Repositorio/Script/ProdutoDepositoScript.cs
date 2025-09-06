using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.Collections.Generic;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Script
{
    public class ProdutoDepositoScript
    {
        public static string BuscarFornecedor => @"
           SELECT   FORN_CD_FORNECEDOR  FROM PRODUTO_MESTRE 
            WHERE CONCAT(PM_CD_PRODUTO,PM_CD_DIGITO) =  @Produto
           ";
        public static string BuscarProdutoDeposito =>
         @"SELECT COUNT(*) FROM PRODUTO_DEPOSITO 
         WHERE PRODUTO = @Produto AND DEPOSITO = @Deposito";

        public static string AtualizarProdutoDeposito =>
        @"
            UPDATE PD 
            SET ESTOQUE_ATUAL = @ESTOQUE_ATUAL,
            EA = @EA
            FROM PRODUTO_DEPOSITO PD
            WHERE PRODUTO = @Produto AND DEPOSITO = @Deposito";

        public static string Movimentacao => @"
         INSERT INTO MOVIMENTACAO_ESTOQUE 
            (  
            PRODUTO, 
            DEPOSITO, 
            TIPO_MOVIMENTACAO,
            QUANTIDADE,
            OBSERVACAO,
            USUARIO_ID)
          VALUES ( 
            @PRODUTO, 
            @DEPOSITO,
            @TIPOMOVIMENTACAO,
            @QUANTIDADE,
            @OBSERVACAO,
            @USUARIOID)"
        ;

        public static string AtualizarEntrada => @"
        UPDATE PRODUTO_DEPOSITO 
        SET ESTOQUE_ATUAL = ESTOQUE_ATUAL + @Quantidade 
        WHERE PRODUTO = @Produto AND DEPOSITO = @Deposito";

        public static string AtualizarSaida => @"
        UPDATE PRODUTO_DEPOSITO 
        SET ESTOQUE_ATUAL = ESTOQUE_ATUAL - @Quantidade 
        WHERE PRODUTO = @Produto AND DEPOSITO = @Deposito";

        public static string AtualizarReserva => @"
        UPDATE PRODUTO_DEPOSITO 
        SET ESTOQUE_RESERVADO = ESTOQUE_RESERVADO + @Quantidade 
        WHERE PRODUTO = @Produto AND DEPOSITO = @Deposito";

        public static string AtualizarLiberacao => @"
        UPDATE PRODUTO_DEPOSITO 
        SET ESTOQUE_RESERVADO = ESTOQUE_RESERVADO - @Quantidade, 
            ESTOQUE_ATUAL = ESTOQUE_ATUAL + @Quantidade 
        WHERE PRODUTO = @Produto AND DEPOSITO = @Deposito";

        public static string AtualizarPendente => @"
        UPDATE PRODUTO_DEPOSITO 
        SET ESTOQUE_PENDENTE = ESTOQUE_PENDENTE + @Quantidade 
        WHERE PRODUTO = @Produto AND DEPOSITO = @Deposito";

        public static string InserirNovoProdutoDeposito => @"
         INSERT INTO PRODUTO_DEPOSITO 
         (  PRODUTO, 
            DEPOSITO,
            ESTOQUE_ATUAL,
            ESTOQUE_RESERVADO,
            ESTOQUE_PENDENTE, 
            EA,
            LOTE, 
            DATA_ENTRADA,
            VALIDADE,
            SITUACAO,
            FOR_CD_FORNECEDOR)
         VALUES 
            (@Produto,
            @Deposito,
            @EstoqueAtual,
            0,
            0,
            @EA, 
            @Lote,
            GETDATE(), 
            @Validade,
             'A',
            @FOR_CD_FORNECEDOR)";
    }
}

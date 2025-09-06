namespace LOG_RT_DISTRIBUICAO_CORE.Dto
{
    public class ProdutoDepositoDto
    {
        public int Produto {  get; set; }
        public int Deposito { get; set; }
        public int EstoqueAtual { get; set; }
        public int EstoqueReversado { get; set; }
        public int EstoquePendente { get; set; }
        public int EA { get; set; }
        public string Lote { get; set; }
        public string Situacao { get; set; }
        public DateTime DataEntrada { get; set; }
        public DateTime DataValidade { get; set; }

    }
}

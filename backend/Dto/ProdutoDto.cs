namespace LOG_RT_DISTRIBUICAO_CORE.Dto {
    public class ProdutoDto {
        public int Produto { get; set; }
        public int Digito { get; set; }
        public string? Nome { get; set; }
        public string? Tipo { get; set; }
        public DateTime Data_Hora_Cadastro { get; set; }
        public string? Situacao { get; set; }
        public string? Grupo { get; set; }
        public string? Marca { get; set; }
        public string? UnidadeMedida { get; set; }
        public int? Custo { get; set; }
        public int? PercLucro { get; set; }
        public int? PrecoVenda { get; set; }
        public decimal? Comissao { get; set; }
        public decimal? Liquido { get; set; }


    }
}

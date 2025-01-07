namespace LOG_RT_DISTRIBUICAO_CORE.Dto
{
    public class ProdutoDto
    {
        public int Produto { get; set; }
        public int Digito { get; set; }
        public string? Descricao { get; set; }
        public string? Categoria { get; set; }
        public DateTime Data_Hora_Cadastro { get; set; }

    }
}

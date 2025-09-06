namespace LOG_RT_DISTRIBUICAO_CORE.Dto
{
    public class DepositoDto
    {
        public int Codigo {  get; set; }
        public string Nome { get; set; }
        public string Fantasia { get; set; }
        public string Telefone { get; set; }
        public string Cep { get; set; }
        public string Email { get; set; }
        public string Endereco { get; set; }
        public int Numero { get; set; }
        public string Cidade { get; set; }
        public string Bairro { get; set; }
        public string Uf { get; set; }
        public string Situacao { get; set; }
        public int Capacidade { get; set; }
        public int CodigoFiscal { get; set; }
        public string[] ProdutosRestritos { get; set; }
        public string Cnpj { get; set; }
    }
}

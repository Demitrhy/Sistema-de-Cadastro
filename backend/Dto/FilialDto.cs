namespace LOG_RT_DISTRIBUICAO_CORE.Dto
{
    public class FilialDto
    {
        public int CodigoFilial { get; set; }
        public string NomeFantasia { get; set; }
        public string RazaoSocial { get; set; }
        public string Cnpj { get; set; }
        public int InscricaoEstadual { get; set; }
        public int InscricaoMunicipal { get; set; }
        public string Logradouro { get; set; }
        public int Numero { get; set; }
        public string Complemento { get; set; }
        public string Bairro { get; set; }
        public string Uf { get; set; }
        public string Cidade { get; set; }
        public string Cep { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public int CodigoDeposito { get; set; }
        public DateTime DataAbertura { get; set; }
        public DateTime? DataFechamento { get; set; }
        public string Situacao { get; set; }
        public DateTime? DataCriacao { get; set; }
        public bool? codigoBloqueado { get; set; }
    }
}

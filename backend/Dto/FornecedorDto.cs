namespace LOG_RT_DISTRIBUICAO_CORE.Dto
{
    public class FornecedorDto
    {

        public int Codigo { get; set; }
        public string Nome { get; set; }
        public string NaturezaJuridica { get; set; }
        public string Fantasia { get; set; }
        public string Cnpj { get; set; }
        public int InscricaoEstadual { get; set; }
        public string Telefone { get; set; }
        public int Cep { get; set; }
        public string Email { get; set; }
        public string Endereco { get; set; }
        public string? Complemento { get; set; }
        public int Numero { get; set; }
        public string Cidade { get; set; }
        public string Bairro { get; set; }
        public string Uf { get; set; }
        public string Situacao { get; set; }
        public string? Observacoes { get; set; }
        public string SituacaoCadastral { get; set; }
    }
}

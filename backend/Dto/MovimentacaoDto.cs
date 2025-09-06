using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Script;

namespace LOG_RT_DISTRIBUICAO_CORE.Dto
{
    public class MovimentacaoDto
    {
        public int Produto { get; set; }
        public int Deposito { get; set; }
        public string TipoMovimentacao { get; set; }
        public int Quantidade { get; set; }
        public string Observacao { get; set; }
        public int Usuario { get; set; }  
  
    }
}

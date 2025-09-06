using System;
using LOG_RT_DISTRIBUICAO_CORE.Dto;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Service
{
    public class FornecedorService : IFornecedorService
    {
        private readonly IFornecedorRepositorio _fornecedorRepositorio;
 
        public FornecedorService(IFornecedorRepositorio fornecedorRepositorio)
        {
            _fornecedorRepositorio = fornecedorRepositorio;
           
        }

        public IEnumerable<FornecedorDto> BuscarProdutos()
        {
            var buscar = _fornecedorRepositorio.BuscarFornecedorRepositorio();
            return buscar;
        }

        public async Task Importar(List<FornecedorDto> produtos)
        {
            try
            {
            
                foreach (var produto in produtos)
                {
                    var _ultimoCodigoFornecedor = _fornecedorRepositorio.GetFornecedor();

                    await _fornecedorRepositorio.ImportarFornecedor(produto, _ultimoCodigoFornecedor++);
                }

            }
            catch (Exception ex)
            {
                throw new ArgumentException("Erro ao inserir um novo fornecedor", ex.Message);
            }
        }
    }
}

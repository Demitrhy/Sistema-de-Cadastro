using LOG_RT_DISTRIBUICAO_CORE.Dto;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface;
using Microsoft.AspNetCore.DataProtection.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using System.Data.SqlClient;
using System.Reflection.Metadata.Ecma335;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Service {
    public class ProdutoService : IProduto {

        private readonly IProdutoRepositorio _produtoRepositorio;

        // Construtor com injeção de dependência para o repositório
        public ProdutoService(IProdutoRepositorio produtoRepositorio) {
            _produtoRepositorio = produtoRepositorio;
        }

        public IEnumerable<ProdutoDto> BuscarProduto(int codigo) {
            var bucar = _produtoRepositorio.BuscarProdutoReposityrio(codigo);
            return bucar;
        }
    }
}

using LOG_RT_DISTRIBUICAO_CORE.Dto;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface;
using Microsoft.AspNetCore.DataProtection.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using System.Data.SqlClient;
using System.Reflection.Metadata.Ecma335;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Service {
    public class ProdutoService : IProdutoService {

        private readonly IProdutoRepositorio _produtoRepositorio;
        private readonly Random _random;

    
        public ProdutoService(IProdutoRepositorio produtoRepositorio) {
            _produtoRepositorio = produtoRepositorio;
            _random = new Random();
        }

        public IEnumerable<ProdutoDto> BuscarProduto(int codigo) {
            var buscar = _produtoRepositorio.BuscarProdutoRepositorio(codigo);
            return buscar;
        }

        public async Task AdicionarNovoProduto(int produto, string? descricao, string? categoria) {
            try {

                int digitoAleatorio = _random.Next(1, 10);
                var buscar = _produtoRepositorio.BuscarProduto(produto);

                if (buscar == 0) {

                    if (categoria == "M" || categoria == "NM" || categoria == "P") {
                        await _produtoRepositorio.InserirProdutoNovo(produto, digitoAleatorio, descricao, categoria);
                    }
                    else throw new Exception($"Essa categoria '{categoria}' não é permitida. Apenas as categoria  'M' (Medicamento ), 'NM' (NÃO MEDICAMENTO) e 'P' (PERFUMARIA) são válidas.");

                }
                else
                    throw new Exception($"Esse produto {produto} já existe!");


            }
            catch (ArgumentException e) {
                throw new ArgumentException("Algo deu errado ao adicionar novo produto");
            }

        }
        public async Task MudarNovoProduto(List<ProdutoDto> produto, string situacao) {
            try {

                foreach (var produtoDto in produto) {
                    var buscar = _produtoRepositorio.BuscarProduto(produtoDto.Produto);

                    if (buscar == 1) {
                        if (situacao == "S" || situacao == "D" || situacao == "A") {
                            await _produtoRepositorio.MudarProdutoNovo(produtoDto.Produto, produtoDto.Digito, situacao);
                        }
                        else throw new Exception($"Essa situação '{situacao}' não é permitida. Apenas as situações 'S' (Suspenso) e 'D' (Desativado) são válidas.");

                    }
                    else
                        throw new Exception($"Não existe esse produto {produtoDto.Produto}. Por favor, tente novamente! ");

                }
            }
            catch (ArgumentException e) {
                throw new ArgumentException("Algo deu errado ao muda novo produto");
            }

        }

        public async Task DeletarProduto(ProdutoDto produto) {
            try {
                var buscar = _produtoRepositorio.BuscarProduto(produto.Produto);

                if (buscar == 1) {

                    await _produtoRepositorio.DeletarProduto(produto);

                }
                else
                    throw new Exception($"Não existe esse produto {produto.Produto}. Por favor, tente novamente! ");

            }
            catch (ArgumentException e) {
                throw new ArgumentException("Algo deu errado ao deletar novo produto");
            }
        }
    }
}

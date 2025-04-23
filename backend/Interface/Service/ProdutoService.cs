using LOG_RT_DISTRIBUICAO_CORE.Dto;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface;
using Microsoft.AspNetCore.DataProtection.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using System.Data.SqlClient;
using System.Reflection.Metadata.Ecma335;
using System.Text.RegularExpressions;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Service
{
    public class ProdutoService : IProdutoService
    {

        private readonly IProdutoRepositorio _produtoRepositorio;
        private readonly Random _random;


        public ProdutoService(IProdutoRepositorio produtoRepositorio)
        {
            _produtoRepositorio = produtoRepositorio;
            _random = new Random();
        }

        public IEnumerable<ProdutoDto> BuscarProduto(int codigo)
        {
            var buscar = _produtoRepositorio.BuscarProdutoRepositorio(codigo);
            return buscar;
        }
        public IEnumerable<ProdutoDto> BuscarProdutos()
        {
            var buscar = _produtoRepositorio.BuscarProdutosRepositorio();
            return buscar;
        }

        public async Task AdicionarNovoProduto(List<ProdutoDto> produtos)
        {
            try
            {
                int digitoAleatorio = _random.Next(1, 10);
                foreach (var produto in produtos)
                {
                    if (produto.codigoBloqueado == false)
                    {
                        int produtoAleatorio = 0;
                        var tipo = _produtoRepositorio.BuscarTipo(produto.Tipo);
                        var grupo = _produtoRepositorio.BuscarGrupo(produto.Grupo);
                        var unidade = _produtoRepositorio.BuscarUnidade(produto.UnidadeMedida);
                        var buscar = _produtoRepositorio.VerificarSeExisteProduto(produto);

                        if (buscar == 0)
                        {

                            await _produtoRepositorio.InserirProdutoNovo(produtos, produtoAleatorio, digitoAleatorio, tipo, grupo, unidade);

                        }
                        else
                            throw new Exception($"Esse produto {produto.Produto} já existe!");
                    }
                    else
                    {

                        var tipo = _produtoRepositorio.BuscarTipo(produto.Tipo);
                        var grupo = _produtoRepositorio.BuscarGrupo(produto.Grupo);
                        var unidade = _produtoRepositorio.BuscarUnidade(produto.UnidadeMedida);

                        int produtoAleatorio = _random.Next(1, 1000000000);
                        int produtoCodigo = await _produtoRepositorio.BuscarMaiorCodigo();

            
                        await _produtoRepositorio.InserirProdutoNovo(produtos, produtoCodigo, digitoAleatorio, tipo, grupo, unidade);

                    }
                }
            }
            catch (ArgumentException e)
            {
                throw new ArgumentException("Algo deu errado ao adicionar novo produto");
            }

        }
        public async Task MudarNovoProduto(List<ProdutoDto> produto, string situacao)
        {
            try
            {

                foreach (var produtoDto in produto)
                {
                    var buscar = _produtoRepositorio.BuscarProduto(produtoDto.Produto);

                    if (buscar == 1)
                    {
                        if (situacao == "S" || situacao == "D" || situacao == "A")
                        {
                            await _produtoRepositorio.MudarProdutoNovo(produtoDto.Produto, produtoDto.Digito, situacao);
                        }
                        else throw new Exception($"Essa situação '{situacao}' não é permitida. Apenas as situações 'S' (Suspenso) e 'D' (Desativado) são válidas.");

                    }
                    else
                        throw new Exception($"Não existe esse produto {produtoDto.Produto}. Por favor, tente novamente! ");

                }
            }
            catch (ArgumentException e)
            {
                throw new ArgumentException("Algo deu errado ao muda novo produto");
            }

        }
        public async Task MudarProduto(int produto, int digito, decimal? liquido, decimal? comissao, decimal? precoVenda, decimal? percLucro, decimal? custo)
        {
            try
            {
                await _produtoRepositorio.EditarProduto(produto, digito, liquido, comissao, precoVenda, percLucro, custo);
            }
            catch (ArgumentException e)
            {
                throw new ArgumentException("Algo deu errado ao editar o produto");
            }
        }  
        public async Task ExcluirProduto(int produto, int digito)
        {
            try
            {
                await _produtoRepositorio.ExcluirProduto(produto, digito );
            }
            catch (ArgumentException e)
            {
                throw new ArgumentException("Algo deu errado ao excluir o produto");
            }
        }


    }
}


import axios from 'axios';
import { Produto } from '../interface/Produto';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function Importar(produtos: Produto[]): Promise<void> {
  try {
    await api.post('/Produto/Importar', produtos);
  } catch (error) {
    throw error;
  }
}
export async function Editar
  (
    dados: {
      produto:number | undefined;
      digito: number | undefined;
      liquido: number;
      comissao: number;
      precoVenda: number;
      percLucro: number;
      custo: number;
    }): Promise<void> {
  try {
    await api.put('/Produto/Editar', dados
    );
  } catch (error) {
    throw error;
  }
}

export async function BuscarProdutos(): Promise<Produto[]> {
  try {
    const response = await api.get<Produto[]>('/Produto/BuscarProdutosExistente');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
}


import axios from 'axios';
import { CadastroLogin, Produto } from '../interface/Produto';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export async function login(email: string, senha: string): Promise<string> {
  try {
    const response = await api.post('/Auth/login', {
      email,
      senha,
    });

    const token = response.data?.token;

    if (token) {
      localStorage.setItem('token', token);
      return token;
    } else {
      throw new Error('Token não encontrado na resposta');
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
}
export async function CadastroLoginNovo(cadastro: CadastroLogin): Promise<void> {
  try {
    const response = await api.post('/Auth/register', cadastro);
  } catch (error) {
    console.error('Erro ao fazer register:', error);
    throw error;
  }
}

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

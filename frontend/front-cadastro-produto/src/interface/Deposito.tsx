export interface Deposito {
    codigo: number;
    nome: string;
    fantasia: string;
    telefone: string;
    cep: string;
    email: string;
    endereco: string;
    numero: number;
    cidade: string;
    bairro: string;
    uf: string;
    situacao: string;
    capacidade: number;     
    codigoFiscal: string;  
    produtosRestritos: string[]; 
    cnpj: string;
}
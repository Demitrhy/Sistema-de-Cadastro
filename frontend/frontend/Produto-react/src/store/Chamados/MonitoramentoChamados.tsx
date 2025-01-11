export const GET_RECUPERAR_CHAMADOS_ULTIMOS_DIAS = 'GET_RECUPERAR_CHAMADOS_ULTIMOS_DIAS';
export const GET_RECUPERAR_CHAMADOS_ULTIMOS_DIAS_SUCCESS = 'GET_RECUPERAR_CHAMADOS_ULTIMOS_DIAS_SUCCESS';

export interface DadosChamadosUltimosDias {
    labels: Array<string>,
    data: Array<number>,
    backgroundColor: Array<string>,
    borderColor: Array<string>,
    borderWidth: number
}

export interface DadosChamadosPorUsuarios {
    matricula: number,
    nome: string,
    totalChamados: number
}

export interface DadosChamadosTopAtrasado {
    chamado: number,
    titulo: string,
    proprietario: string,
    dataAbertura: string
}

export interface DadosChamadosPorServico {
    servico: string,
    totalChamados: number
}
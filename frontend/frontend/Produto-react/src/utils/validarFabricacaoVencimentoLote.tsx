export const validarFabricacaoVencimentoLote = (dataFabricacao: string, dataVencimento: string) => {
    if (dataFabricacao.trim().length == 4 && dataVencimento.trim().length == 4) {
        let hoje = new Date();
        let sufixoAno = hoje.getFullYear().toString().substr(0, 2);

        let mesFab = parseInt(dataFabricacao.substr(0, 2));
        let anoFab = parseInt(`${sufixoAno}${dataFabricacao.substr(2, 2)}`);
        let mesVenc = parseInt(dataVencimento.substr(0, 2));
        let anoVenc = parseInt(`${sufixoAno}${dataVencimento.substr(2, 2)}`);

        let dtFabricacao = new Date(anoFab, mesFab - 1, 1);
        let dtVencimento = new Date(anoVenc, mesVenc - 1, 1);

        if (dtFabricacao >= dtVencimento) {
            return "Data de fabricação precisa ser menor que a de vencimento.";
        }
        else if (anoVenc < hoje.getFullYear()) {
            return "Ano da data de vencimento é menor que o atual.";
        }
        else if (dtVencimento.getMonth() < hoje.getMonth() && dtVencimento.getFullYear() < hoje.getFullYear()) {
            return "Data de vencimento não pode ser menor que a data atual.";
        }
    }
    else {
        return "Fabricação ou vencimento em formatos não aceitos (o correto é 4 dígitos). Favor, corrigir.";
    }
}
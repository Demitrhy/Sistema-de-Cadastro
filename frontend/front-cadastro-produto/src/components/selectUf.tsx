interface StatusInput {
    value: string;
    onChange: (value: string) => void;
}

const Uf: React.FC<StatusInput> = ({ value, onChange }) => {
    
    const handleUfChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    };


    const estados = [
        { sigla: 'AC', nome: 'Acre' },
        { sigla: 'AL', nome: 'Alagoas' },
        { sigla: 'AP', nome: 'Amapá' },
        { sigla: 'AM', nome: 'Amazonas' },
        { sigla: 'BA', nome: 'Bahia' },
        { sigla: 'CE', nome: 'Ceará' },
        { sigla: 'DF', nome: 'Distrito Federal' },
        { sigla: 'ES', nome: 'Espírito Santo' },
        { sigla: 'GO', nome: 'Goiás' },
        { sigla: 'MA', nome: 'Maranhão' },
        { sigla: 'MT', nome: 'Mato Grosso' },
        { sigla: 'MS', nome: 'Mato Grosso do Sul' },
        { sigla: 'MG', nome: 'Minas Gerais' },
        { sigla: 'PA', nome: 'Pará' },
        { sigla: 'PB', nome: 'Paraíba' },
        { sigla: 'PR', nome: 'Paraná' },
        { sigla: 'PE', nome: 'Pernambuco' },
        { sigla: 'PI', nome: 'Piauí' },
        { sigla: 'RJ', nome: 'Rio de Janeiro' },
        { sigla: 'RN', nome: 'Rio Grande do Norte' },
        { sigla: 'RS', nome: 'Rio Grande do Sul' },
        { sigla: 'RO', nome: 'Rondônia' },
        { sigla: 'RR', nome: 'Roraima' },
        { sigla: 'SC', nome: 'Santa Catarina' },
        { sigla: 'SP', nome: 'São Paulo' },
        { sigla: 'SE', nome: 'Sergipe' },
        { sigla: 'TO', nome: 'Tocantins' },
    ];

    return (<>
        <label style={{ display: 'block', marginBottom: '8px' }}> UF: </label>
        <select
            id="uf"
            value={value}
            onChange={handleUfChange}
            style={{
                padding: '5px',
                fontSize: '16px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                width: '240px',
            }}
        >
            <option value="">Selecione uma UF</option>
            {estados.map((estado) => (
                <option key={estado.sigla} value={estado.sigla}>
                    {estado.nome} ({estado.sigla})
                </option>
            ))}
        </select>
    </>
    );
}

export default Uf;
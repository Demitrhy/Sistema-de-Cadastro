interface UnidadeInput {
    value: string;
    onChange: (value: string) => void;
}

const Unidade: React.FC<UnidadeInput> = ({ value, onChange }) => {

    const handleUfChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    };


    const unidade = [
        { sigla: 'UN', nome: 'Unidade' },
        { sigla: 'CX', nome: 'Caixa' },
        { sigla: 'FR', nome: 'Frasco' },
        { sigla: 'BL', nome: 'Blister' },
        { sigla: 'MG', nome: 'Miligrama' },
        { sigla: 'ML', nome: 'Mililitro' },
        { sigla: 'G', nome: 'Grama' },
        { sigla: 'KG', nome: 'Quilograma' },
        { sigla: 'PAC', nome: 'Pacote' },
        { sigla: 'AMP', nome: 'Ampola' }
    ];

    return (<>
        <label style={{ display: 'block', marginBottom: '8px' }}> Unidade Medida: </label>
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
            {unidade.map((estado) => (
                <option key={estado.sigla} value={estado.sigla}>
                    {estado.nome} ({estado.sigla})
                </option>
            ))}
        </select>
    </>
    );
}

export default Unidade;
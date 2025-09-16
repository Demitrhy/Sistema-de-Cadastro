interface StatusInput {
    value: string;
    onChange: (value: string) => void;
}

const situacaoCadastral: React.FC<StatusInput> = ({ value, onChange }) => {
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    };

    const situacaoCadastro = [
        { sigla: 'H', nome: 'Habilitado' },
        { sigla: 'D', nome: 'Desabilitado' }
    ]

    return (<>
        <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Situação Cadastral Virgente:</label>
        <select
            id="situacaoCadastral"
            value={value}
            onChange={handleStatusChange}
            style={{
                padding: '5px',
                fontSize: '16px',
                borderRadius: '4px',
                appearance: 'textfield', // Firefox
                border: '1px solid #ccc',
                width: '230px',
            }}>
            <option value="">Selecione...</option>
            {situacaoCadastro.map((status) => (
                <option key={status.sigla} value={status.sigla}>
                    {status.nome} ({status.sigla})
                </option>
            ))}
        </select>
    </>
    );
}

export default situacaoCadastral;
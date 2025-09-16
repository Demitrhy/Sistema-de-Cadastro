interface StatusInput {
    value: string;
    onChange: (value: string) => void;
}

const Status: React.FC<StatusInput> = ({ value, onChange }) => {
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    };

    const status = [
        { nome: "Ativo", sigla: "A" },
        { nome: "Desativado", sigla: "D" },
    ];
    
    return (<>
        <label style={{ fontWeight: "bold", marginBottom: "6px" }}>Status:</label>
        <select
            value={value}
            onChange={handleStatusChange}
            style={{
                padding: "5px",
                fontSize: "16px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                width: "170px",
            }}
        >
            <option value="">Selecione...</option>
            {status.map((st) => (
                <option key={st.sigla} value={st.sigla}>
                    {st.nome} ({st.sigla})
                </option>
            ))}
        </select></>
    );
}

export default Status;
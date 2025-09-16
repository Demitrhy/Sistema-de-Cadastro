interface NumeroInput {
    value: number;
    onChange: (value: number) => void;
}

const Numero: React.FC<NumeroInput> = ({ value, onChange }) => {
    return (
        <>
            <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Número:</label>
            <input
                type="text"
                placeholder="Número"
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                style={{
                    padding: '5px',
                    fontSize: '16px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    width: '150px',
                }}
            />
        </>
    )
}
export default Numero;
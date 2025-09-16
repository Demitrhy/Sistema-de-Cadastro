interface NomeInput {
    value: string;
    onChange: (value: string) => void;
}

const Nome: React.FC<NomeInput> = ({ value, onChange }) => {
    return (
        <>
            <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Nome:</label>
            <input
                type="text"
                placeholder="Nome"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    padding: '5px',
                    fontSize: '16px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    width: '400px',
                }}
            />
        </>
    )
}
export default Nome;
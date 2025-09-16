interface EmailInput {
    value: string;
    onChange: (value: string) => void;
}

const Email: React.FC<EmailInput> = ({ value, onChange }) => {
    return (
        <>
            <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Email:</label>
            <input
                type="text"
                placeholder="Email"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    padding: '5px',
                    fontSize: '16px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    width: '450px',
                }}
            />
        </>
    )
}
export default Email;
import { IMaskInput } from "react-imask";

interface PhoneInput {
    value: string;
    onChange: (value: string) => void;
}

const Phone: React.FC<PhoneInput> = ({ value, onChange }) => {
    return (
        <>
            <label style={{ fontWeight: "bold", marginBottom: "6px" }}>Telefone:</label>
            <IMaskInput
                mask="(00)00000-0000"
                value={value}
                onAccept={(val) => onChange(val as string)}
                placeholder="(00)00000-0000"
                style={{
                    padding: "5px",
                    fontSize: "16px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    width: "150px",
                }}
            />
        </>
    );
}

export default Phone;
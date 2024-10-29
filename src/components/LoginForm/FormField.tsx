// i did not do that in normal case, i rather use useId hook or mechanism that is commonly used in project//
const generateId = (name: string): string => {
    return `${name}-${Math.random().toString(36).substring(2, 15)}`;
}

interface FormFieldProps extends React.ComponentProps<"input"> {
    label: string;
    options?: string[];
    value: string;
    name: string;
}

export const FormField = ({ label, options, name, ...inputAttributes }: FormFieldProps): JSX.Element => {
    const id = generateId(label);
    return (
        <div className="form-group">
            <label htmlFor={id}>
                {label}
            </label>

            {inputAttributes.type === 'select' ? (
                <select id={id} name={name}>
                    {options?.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    id={id}
                    name={name}
                    type={inputAttributes.type}
                    className="form-control form-control-lg"
                    value={inputAttributes.value}
                    onChange={inputAttributes.onChange}
                />
            )}
        </div>
    );
};

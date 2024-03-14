import "./input-cmp.scss"

interface InputProps {
    label?: string,
    value?: string,
    error?: boolean

    onChange?(value: string): void
}

const InputCmp = (props: InputProps) => {

    const {
        value,
        onChange,
        label,
        error
    } = props;

    return (
        <div className={"input-cmp"}>
            <input
                className={`input-cmp__value ${error && "input-cmp__value_error"}`}
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
            />
            <label className={`input-cmp__label ${value && "input-cmp__label_fill"}`}>{label}</label>
        </div>
    )
}

export default InputCmp;
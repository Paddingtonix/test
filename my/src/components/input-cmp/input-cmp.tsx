import "./input-cmp.scss"
import {useState} from "react";

interface InputProps {
    value: string,
    label?: string,
    error?: string,
    type?: "text" | "password" | "number" | "email",
    name?: string,
    rules?: {
        required?: boolean,
        pattern?: string
    },
    checkRules?: boolean

    onChange(value: string): void
}

const InputCmp = (props: InputProps) => {

    const {
        value,
        label,
        type,
        name,
        rules,
        checkRules,
        onChange,
    } = props;

    const [hidePassword, setHidePassword] = useState(true);

    const isError = () => {
        if (!checkRules) return false;
        if (rules?.required && !value)
            return "Обязательное поле";
        else if (rules?.pattern && !(new RegExp(rules.pattern).test(value)))
            return "Некорректный формат";
        return false;
    }

    return (
        <div className={"input-field"}>
            <div className={"input-cmp"}>
                <input
                    type={type === "password" && !hidePassword ? "text" : type}
                    className={`input-cmp__value ${isError() && "input-cmp__value_error"}`}
                    value={value}
                    name={name}
                    onChange={(e) => onChange(e.target.value)}
                />
                <label className={`input-cmp__label ${value && "input-cmp__label_fill"}`}>{label}</label>
                {
                    type === "password" &&
                    <EyeIcon
                        className={`input-cmp__password-eye ${!hidePassword && "input-cmp__password-eye_show"}`}
                        onClick={() => setHidePassword(!hidePassword)}
                    />
                }
            </div>
            <div className={`error-text ${isError() && "error-text_show"}`}>{isError()}</div>
        </div>

    )
}

const EyeIcon = ({className, onClick}: {className?: string, onClick(): void}) => {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
             onClick={onClick}
             className={className}
        >
            <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default InputCmp;
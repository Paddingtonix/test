import "./style.scss"
import {ButtonCmp} from "../../components/button-cmp/button-cmp";
import {useState} from "react";
import ModalCmp from "../../components/modal-cmp/modal-cmp";
import InputCmp from "../../components/input-cmp/input-cmp";
import {CheckboxCmp} from "../../components/checkbox-cmp/checkbox-cmp";
import axios from "axios";
import {service} from "../../api/api";

const LoadDataPage = () => {

    const [displayOption, setDisplayOption] = useState<"login" | "loaded_data">("login");

    return (
        <div className={"login-page"}>
            {
                displayOption === "login" &&
                <LoginModal
                    onLogin={() => setDisplayOption("loaded_data")}
                />
            }
        </div>
    )
}


interface LoginModalProps {
    onLogin?(): void
}

const LoginModal = (props: LoginModalProps) => {

    const {onLogin} = props;

    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [checkForm, setCheckForm] = useState(false);
    const [error, setError] = useState("");

    const onSubmit = () => {
        setCheckForm(true);
        if (data.email && data.password)
            service.login(data)
                .then(res => {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
                    onLogin && onLogin();
                })
                .catch(() => setError("Неверный логин или пароль"))
    }

    return (
        <ModalCmp isOpen={true} closable={false} withCloseButton={false}>
            <div className={"login-modal"}>
                <h5>ВХОД В СИСТЕМУ QA/QC</h5>
                <InputCmp
                    label={"Логин"}
                    value={data.email}
                    onChange={(value) => setData({...data, email: value})}
                    rules={{
                        required: true
                    }}
                    checkRules={checkForm}
                />
                <InputCmp
                    label={"Пароль"}
                    type={"password"}
                    value={data.password}
                    onChange={(value) => setData({...data, password: value})}
                    rules={{
                        required: true
                    }}
                    checkRules={checkForm}
                />
                {
                    error && <span className={"login-modal__error"}>{error}</span>
                }
                <span className={"login-modal__remember-me"}>
                    <CheckboxCmp OnClick={() => {}} name={""}/>
                    Запомнить меня
                </span>
                <ButtonCmp OnClick={onSubmit} name={"Войти"}/>
                <div className={"login-modal__forgot-password"}>
                    <span onClick={() => alert("Печально. В следующий раз будь внимательнее!")}>
                    Забыли пароль?
                </span>
                </div>
            </div>
        </ModalCmp>
    )
}

export default LoadDataPage;
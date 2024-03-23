import "./style.scss"
import {ButtonCmp} from "../../components/button-cmp/button-cmp";
import React, {useEffect, useState} from "react";
import ModalCmp from "../../components/modal-cmp/modal-cmp";
import InputCmp from "../../components/input-cmp/input-cmp";
import {CheckboxCmp} from "../../components/checkbox-cmp/checkbox-cmp";
import {useMutation} from "@tanstack/react-query";
import {useAuth} from "../../utils/AuthProvider";
import {Link} from "react-router-dom";
import {Links} from "../../App";
import {LoginCredentials, service} from "../../utils/service";

const LoadDataPage = () => {

    const {isAuth, signOut} = useAuth();
    const [displayOption, setDisplayOption]
        = useState<"login" | "loaded_data">(isAuth ? "loaded_data" : "login");

    useEffect(() => {
        setDisplayOption(isAuth ? "loaded_data" : "login");
    }, [isAuth]);

    return (
        <div className={"login-page"}>
            {
                displayOption === "login"
                    ? <LoginModal/>
                    :
                    <div>
                        <h1>Добро пожаловать!</h1>
                        <div>
                            <Link to={Links.Main}>
                                <ButtonCmp OnClick={() => {}} name={"Перейти на страницу графа"}/>
                            </Link>
                        </div>
                        <ButtonCmp OnClick={signOut} name={"Выйти из системы"}/>
                    </div>
            }
        </div>
    )
}



const LoginModal = () => {

    const {signIn} = useAuth();

    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [checkForm, setCheckForm] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const {mutate: login, isPending, error} = useMutation( {
        mutationFn: (data: LoginCredentials) => service.login(data),
        onSuccess: ({data}) => {
            signIn(data.access_token, data.refresh_token, rememberMe);
        }
    });

    const onSubmit = () => {
        setCheckForm(true);
        if (data.email && data.password) login(data);
    }

    return (
        <ModalCmp isOpen={true} closable={false} withCloseButton={false}>
            <form className={"login-modal"}>
                <h5>ВХОД В СИСТЕМУ QA/QC</h5>
                <InputCmp
                    label={"Логин"}
                    value={data.email}
                    name={"email"}
                    onChange={(value) => setData({...data, email: value})}
                    rules={{
                        required: true
                    }}
                    checkRules={checkForm}
                />
                <InputCmp
                    label={"Пароль"}
                    type={"password"}
                    name={"password"}
                    value={data.password}
                    onChange={(value) => setData({...data, password: value})}
                    rules={{
                        required: true
                    }}
                    checkRules={checkForm}
                />
                {
                    error && <span className={"login-modal__error"}>Неверный логин или пароль</span>
                }
                <span className={"login-modal__remember-me"}>
                    <CheckboxCmp OnClick={() => setRememberMe(!rememberMe)} name={""}/>
                    Запомнить меня
                </span>
                <ButtonCmp OnClick={onSubmit} name={"Войти"} disabled={isPending}/>
                <div className={"login-modal__forgot-password"}>
                    <span onClick={() => alert("Печально. В следующий раз будь внимательнее!")}>
                    Забыли пароль?
                </span>
                </div>
            </form>
        </ModalCmp>
    )
}

export default LoadDataPage;
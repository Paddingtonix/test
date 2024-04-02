import {useAuth} from "../../../../utils/AuthProvider";
import React, {useState} from "react";
import {LoginCredentials, service} from "../../../../utils/service";
import InputCmp from "../../../input-cmp/input-cmp";
import {CheckboxCmp} from "../../../checkbox-cmp/checkbox-cmp";
import {ButtonCmp} from "../../../button-cmp/button-cmp";
import {useMutation} from "@tanstack/react-query";
import "./style.scss";
import {FormField, useForm} from "../../../../utils/use-form";
import {ModalContentProps} from "../modal-cmp";
import {useNotification} from "../../notification/notification-provider";


const LoginModalCmp = (props: ModalContentProps) => {
    const {changeModalContent} = props;
    const {signIn} = useAuth();
    const {toastSuccess} = useNotification();

    const {fields, checkForm, setFieldValue, handleSubmit} = useForm(FormLogin);
    const [rememberMe, setRememberMe] = useState(false);

    const {mutate: login, isPending, error} = useMutation({
        mutationFn: (data: LoginCredentials) => service.login(data),
        onSuccess: ({data}) => {
            signIn(data.access_token, data.refresh_token, rememberMe);
            toastSuccess("Вы успешно вошли в систему!")
        }
    });

    const onSubmit = (data: LoginCredentials) => {
        login(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={"login-modal"}>
            <h5>ВХОД В СИСТЕМУ QA/QC</h5>
            {
                fields.map(it =>
                    <InputCmp
                        value={it.value}
                        onChange={(value) => setFieldValue(value, it.name)}
                        label={it.label}
                        name={it.name}
                        rules={it.rules}
                        type={it.type}
                        checkRules={checkForm}
                        key={it.name}
                    />
                )
            }
            {
                error && <span className={"login-modal__error"}>Неверный логин или пароль</span>
            }
            <span className={"login-modal__remember-me"}>
                <CheckboxCmp OnClick={() => setRememberMe(!rememberMe)} name={""}/>
                Запомнить меня
            </span>
            <ButtonCmp OnClick={() => {
            }} name={"Войти"} disabled={isPending}/>
            <div className={"login-modal__forgot-password"}>
                <span onClick={() => changeModalContent("rememberPassword")}>
                    Забыли пароль?
                </span>
            </div>
        </form>
    )
}

const FormLogin: FormField[] = [
    {
        type: "text",
        name: "email",
        label: "Логин",
        value: "",
        rules: {required: true}
    },
    {
        type: "password",
        name: "password",
        label: "Пароль",
        value: "",
        rules: {required: true}
    },
]

export default LoginModalCmp;
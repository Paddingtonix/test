import "./login-page.scss"
import {ButtonCmp} from "../../components/button-cmp/button-cmp";

const LoginPage = () => {

    return (
        <div className={"login-page"}>
            <div className={"login-modal"}>
                <h5>ВХОД В QA/QC</h5>
                <ButtonCmp OnClick={() => {}} name={"Войти"}/>
            </div>
        </div>
    )
}

export default LoginPage;
import "./style.scss"
import {ButtonCmp} from "../../components/button-cmp/button-cmp";
import React, {useEffect, useState} from "react";
import ModalCmp from "../../components/base/modals/modal-cmp";
import {useAuth} from "../../utils/AuthProvider";
import {Link} from "react-router-dom";
import {Links} from "../../App";

type DisplayOption = "login" | "loaded_data";

const StartDataPage = () => {

    const {isAuth, signOut} = useAuth();
    const [displayOption, setDisplayOption]
        = useState<DisplayOption>(isAuth ? "loaded_data" : "login");

    useEffect(() => {
        setDisplayOption(isAuth ? "loaded_data" : "login");
    }, [isAuth]);

    return (
        <div className={"start-page"}>
            {
                displayOption === "login"
                    ? <ModalCmp isOpen={true} closable={false} withCloseButton={false} modalContent={"loginForm"}/>
                    :
                    <div className={"start-page__content"}>
                        <h1>Добро пожаловать <br/> в систему QA/QC!</h1>
                        <Link to={Links.LoadData}>
                            <ButtonCmp OnClick={() => {}} name={"Загрузить данные"}/>
                        </Link>
                        <ButtonCmp OnClick={signOut} name={"Выйти из системы"}/>
                    </div>
            }
        </div>
    )
}

export default StartDataPage;
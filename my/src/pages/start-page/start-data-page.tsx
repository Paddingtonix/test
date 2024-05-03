import "./style.scss"
import {ButtonCmp} from "../../components/button-cmp/button-cmp";
import React, {useEffect, useState} from "react";
import ModalCmp from "../../components/base/modals/modal-cmp";
import {useAuth} from "../../utils/AuthProvider";
import {Link} from "react-router-dom";
import {Links} from "../../App";
import LayoutCmp from "../../components/layout-cmp/layout-cmp";

type DisplayOption = "login" | "loaded_data";

const StartDataPage = () => {

    const {isAuth, signOut} = useAuth();
    const [displayOption, setDisplayOption]
        = useState<DisplayOption>(isAuth ? "loaded_data" : "login");

    useEffect(() => {
        setDisplayOption(isAuth ? "loaded_data" : "login");
    }, [isAuth]);

    return (
        displayOption === "login"
            ? <ModalCmp isOpen={true} closable={false} withCloseButton={false} modalContent={"loginForm"}/>
            :
            <LayoutCmp>
                <div className={"start-page"}>
                    <div className={"start-page__content"}>
                        <h1>Добро пожаловать <br/> в систему QA/QC!</h1>
                        <Link to={Links.LoadData}>
                            <ButtonCmp OnClick={() => {
                            }} name={"Загрузить данные"}/>
                        </Link>
                        <ButtonCmp OnClick={signOut} name={"Выйти из системы"}/>
                    </div>
                </div>
            </LayoutCmp>
    )
}

export default StartDataPage;
import "./style.scss"
import {ButtonCmp} from "../../components/button-cmp/button-cmp";
import React, {useEffect, useState} from "react";
import ModalCmp from "../../components/base/modals/modal-cmp";
import {useAuth} from "../../utils/AuthProvider";
import {Link} from "react-router-dom";
import {Links} from "../../App";
import { DataLoadingPage } from "../data-loading-page/data-loading-page"

type DisplayOption = "login" | "loaded_data";

const LoadDataPage = () => {

    const {isAuth, signOut} = useAuth();
    const [displayOption, setDisplayOption]
        = useState<DisplayOption>(isAuth ? "loaded_data" : "login");

    useEffect(() => {
        setDisplayOption(isAuth ? "loaded_data" : "login");
    }, [isAuth]);

    return (
        <div className={"login-page"}>
            {
                displayOption === "login"
                    ? <ModalCmp isOpen={true} closable={false} withCloseButton={false} modalContent={"loginForm"}/>
                    : <DataLoadingPage />
                    // <div className={"login-page__content"}>
                    //     <h1>Добро пожаловать <br/> в систему QA/QC!</h1>
                    //     <div>
                    //         <Link to={Links.Main}>
                    //             <ButtonCmp OnClick={() => {}} name={"Перейти на страницу графа"}/>
                    //         </Link>
                    //     </div>
                    //     <ButtonCmp OnClick={signOut} name={"Выйти из системы"}/>
                    // </div>
            }
        </div>
    )
}

export default LoadDataPage;
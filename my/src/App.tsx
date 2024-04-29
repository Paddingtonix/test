import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import StartDataPage from "./pages/start-page/start-data-page";
import {useInstanceInterceptors} from "./utils/api";
import {DataLoadingPage} from "./pages/data-loading-page/data-loading-page";
import {useAuth} from "./utils/AuthProvider";
import React from "react";


function App() {

    useInstanceInterceptors();

    return (
        <Routes>
            <Route path={Links.Start} element={<StartDataPage/>}/>
            <Route path={Links.LoadData} element={<PrivateRoute><DataLoadingPage/></PrivateRoute>}/>
            {/* <Route path={Links.Main} element={<PrivateRoute><Main/></PrivateRoute>}/> */}
            <Route path={Links.NotFound} element={<Navigate to={Links.Start}/>}/>
        </Routes>
    );
}

export const Links = {
    Start: "/",
    LoadData: "/data",
    Main: "/test",
    NotFound: "/*"
}

//Хок, делающий путь недоступным для неавторизованного пользователя
const PrivateRoute = ({children}: {children: React.ReactElement}) => {
    const {isAuth} = useAuth();

    return (
        isAuth ? children : <Navigate to={Links.Start}/>
    )
}

export default App;

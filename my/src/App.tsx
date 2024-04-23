import './App.css';
// import Main from './pages/main-page-refactor';
import {Navigate, Route, Routes} from "react-router-dom";
import LoadDataPage from "./pages/load-data-page/load-data-page";
import {useInstanceInterceptors} from "./utils/api";
// import {useAuth} from "./utils/AuthProvider";
// import React from "react";


function App() {

    useInstanceInterceptors();

    return (
        <Routes>
            <Route path={Links.LoadData} element={<LoadDataPage/>}/>
            {/* <Route path={Links.Main} element={<PrivateRoute><Main/></PrivateRoute>}/> */}
            <Route path={Links.NotFound} element={<Navigate to={Links.LoadData}/>}/>
        </Routes>
    );
}

export const Links = {
    LoadData: "/",
    Main: "/test",
    NotFound: "/*"
}

//Хок, делающий путь недоступным для неавторизованного пользователя
// const PrivateRoute = ({children}: {children: React.ReactElement}) => {
//     const {isAuth} = useAuth();

//     return (
//         isAuth ? children : <Navigate to={Links.LoadData}/>
//     )
// }

export default App;

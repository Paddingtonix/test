import './App.css';
import Main from './pages/main-page-refactor';
import {Navigate, Route, Routes} from "react-router-dom";
import LoadDataPage from "./pages/load-data-page/load-data-page";
import {useInstanceInterceptors} from "./utils/api";
import {
    NotificationProvider,
    useNotification
} from "./components/base/notification/notification-provider";


function App() {

    useInstanceInterceptors();

    return (
        <NotificationProvider>
            <Example/>
            <Routes>
                <Route path={Links.LoadData} element={<LoadDataPage/>}/>
                <Route path={Links.Main} element={<Main/>}/>
                <Route path={Links.NotFound} element={<Navigate to={Links.LoadData}/>}/>
            </Routes>
        </NotificationProvider>
    );
}

export const Links = {
    LoadData: "/",
    Main: "/test",
    NotFound: "/*"
}

const Example = () => {

	const {toastWarning, toastSuccess, toastError} = useNotification()

	return (
		<div>
			<button onClick={() => toastWarning("Не забудьте сохранить изменения")}>Info</button>
			<button onClick={() => toastSuccess("Вы успешно вошли в систему!")}>Success</button>
			<button onClick={() => toastError("Упс, что-то пошло не так, попробуйте позже")}>Error</button>
		</div>
	)
}

export default App;

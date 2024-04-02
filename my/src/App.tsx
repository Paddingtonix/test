import './App.css';
// import { BrowserRouter as Router, Routes, Route} from "react-router-dom";


//pages
import Main from './pages/main-page-refactor';
import {
	NotificationProvider,
	useNotification
} from "./components/base/notification/notification-provider";


function App() {

  	return (
    	<NotificationProvider>
			<Example/>
		<Main></Main>
		{/* <Router>
			<Routes>
				<Route path="/" element = {<Main></Main>}></Route>
			</Routes>
		</Router> */}
		</NotificationProvider>
  	);
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

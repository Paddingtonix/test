import './App.css';
// import { BrowserRouter as Router, Routes, Route} from "react-router-dom";


//pages
import Main from './pages/main-page-refactor';
import {useState} from "react";
import {
	Notification,
	NotificationProvider,
	NotificationType, useNotification
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

	const {toastInfo, toastWarning, toastSuccess, toastError} = useNotification()

	return (
		<div>
			<button onClick={() => toastInfo("info")}>Info</button>
			<button onClick={() => toastSuccess("success")}>Success</button>
			<button onClick={() => toastWarning("warning")}>Warning</button>
			<button onClick={() => toastError("error")}>Error</button>
		</div>
	)
}

export default App;

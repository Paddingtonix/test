import './App.css';
import Main from './pages/main-page-refactor';
import {Navigate, Route, Routes} from "react-router-dom";
import {Links} from "./shared/constants/Links";
import LoginPage from "./pages/login-page/login-page";


function App() {
  	return (
		<Routes>
			<Route path={Links.Main} element={<Main/>}/>
			<Route path={Links.Login} element={<LoginPage/>}/>
			<Route path={Links.NotFound} element={<Navigate to={Links.Main}/>}/>
		</Routes>
  	);
}

export default App;

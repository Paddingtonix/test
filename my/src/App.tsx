import './App.css';
import Main from './pages/main-page-refactor';
import {Navigate, Route, Routes} from "react-router-dom";
import LoadDataPage from "./pages/load-data-page/load-data-page";
import {useInstanceInterceptors} from "./utils/api";


function App() {

	useInstanceInterceptors();

  	return (
		<Routes>
			<Route path={Links.LoadData} element={<LoadDataPage/>}/>
			<Route path={Links.Main} element={<Main/>}/>
			<Route path={Links.NotFound} element={<Navigate to={Links.LoadData}/>}/>
		</Routes>
  	);
}

export const Links = {
	LoadData: "/",
	Main: "/test",
	NotFound: "/*"
}

export default App;

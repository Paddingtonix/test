import './App.css';
import Main from './pages/main-page-refactor';
import {Navigate, Route, Routes} from "react-router-dom";
import LoadDataPage from "./pages/load-data-page/load-data-page";


function App() {
  	return (
		<Routes>
			<Route path={Links.Main} element={<Main/>}/>
			<Route path={Links.LoadData} element={<LoadDataPage/>}/>
			<Route path={Links.NotFound} element={<Navigate to={Links.Main}/>}/>
		</Routes>
  	);
}

export const Links = {
	Main: "/",
	LoadData: "/load-data",
	NotFound: "/*"
}

export default App;

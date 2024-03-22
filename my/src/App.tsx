import './App.css';
// import { BrowserRouter as Router, Routes, Route} from "react-router-dom";


//pages
import Main from './pages/main-page-refactor';
import {useState} from "react";


function App() {

	const [v, setV] = useState("")

  	return (
    	<>
		<Main></Main>
		{/* <Router>
			<Routes>
				<Route path="/" element = {<Main></Main>}></Route>
			</Routes>
		</Router> */}
		</>
  	);
}

export default App;

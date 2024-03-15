import './App.css';
// import { BrowserRouter as Router, Routes, Route} from "react-router-dom";


//pages
import Main from './pages/main-page-refactor';
import InputCmp from "./components/input-cmp/input-cmp";
import {useState} from "react";


function App() {

	const [v, setV] = useState("")

  	return (
    	<>
			<div style={{padding: 20, width: 300, display: "flex", flexDirection: "column", gap: "12px"}}>
				<InputCmp
					value={v}
					onChange={(v) => setV(v)}
					label={"Email"}
					type={"email"}
					rules={{
						required: true,
						pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
					}}
				/>
				<InputCmp
					value={v}
					onChange={(v) => setV(v)}
					label={"Пароль"}
					type={"password"}
					rules={{
						required: true,
					}}
				/>
			</div>

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

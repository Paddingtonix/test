import './App.css';
// import { BrowserRouter as Router, Routes, Route} from "react-router-dom";


//pages
import Main from './pages/main-page-refactor';
import ModalCmp from "./components/modal-cmp/modal-cmp";
import {ButtonCmp} from "./components/button-cmp/button-cmp";
import {useState} from "react";


function App() {

	const [open, setOpen] = useState(false)

  	return (
    	<>
			<ButtonCmp OnClick={() => setOpen(true)} name={"открыть модалку"}/>
			<ModalCmp isOpen={open} onClose={() => setOpen(false)} >
				<span>Какой-то текст, чтобы посмотреть</span>
			</ModalCmp>
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

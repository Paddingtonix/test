import "../../index.scss"
import { ButtonCmp } from "../button-cmp/button-cmp"
import { SelectorCmp } from "../selector-cmp/selector-cmp";
import { useState } from 'react'

interface NavbarProps {
	graph_state: (state: boolean | ((prevState: boolean) => boolean)) => void;
	filter_graph: (state: string) => void;
}

export const NavbarCmp: React.FC<NavbarProps> = ({ graph_state, filter_graph }) => {
	const [visState, setVisState] = useState(true);


	const [selectorType] = useState([
	  {
		placeholder: 'Типы вершин',
		list: [
		  { text: 'PVT' },
		  { text: 'Керн' },
		  { text: 'Петрофизика' },
		  { text: 'Сейсмика' },
		  { text: 'скв.иссл' },
		],
	  },
	  {
		placeholder: 'Типы связи',
		list: [
		  { text: 'Односторонняя' },
		  { text: 'Двусторонняя' },
		],
	  },
	  {
		placeholder: 'Типы аттрибутам',
		list: [
		  { text: 'Односторонняя' },
		  { text: 'Двусторонняя' },
		],
	  },
	]);
  
	const change_option = () => {
	  setVisState((prevState) => {
		const newState = !prevState;
		graph_state(newState);
		return newState;
	  });
	};
  
	return (
	  <div className="navbar">
		<div className="navbar__left-side">
		  <span className="navbar__left-side__logo">QA/QC</span>
		  <div className="navbar__left-side__visible-option">
			<span className="navbar__left-side__visible-option__text">
			  Вариант отображения
			</span>
			<ButtonCmp
			  OnClick={change_option}
			  name={visState ? 'Таблица' : 'Граф'}
			></ButtonCmp>
		  </div>
		</div>
		<div className="navbar__center-side">
		  {selectorType.map((selector_type) => (
			<SelectorCmp
				key={selector_type.placeholder}
				selector_placeholder={selector_type.placeholder}
				selector_list={selector_type.list}
				selector_value={filter_graph}
			></SelectorCmp>
		  ))}
		</div>
		<div className="elements">Выход</div>
	  </div>
	);
  };
  





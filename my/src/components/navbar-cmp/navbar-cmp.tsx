import "../../index.scss"
import { ButtonCmp } from "../button-cmp/button-cmp"
import { selectorCmp } from "../selector-cmp/selector-cmp";
import { useState } from 'react'

interface NavbarProps {
	graph_state: (state: boolean | ((prevState: boolean) => boolean)) => void;
}

export const NavbarCmp: React.FC<NavbarProps>  = ({ graph_state }) => {
	const [visState, setVisState] = useState(true)
	const [selectorType] = useState([
		{
			placeholder: 'Типы вершин',
			list: [
				{
					text: 'PVT',
				},
				{
					text: 'Керн',
				},
				{
					text: 'Петрофизика',
				},
				{
					text: 'Сейсмика',
				},
				{
					text: 'скв.иссл',
				},
			]
		}
	])

	const change_option = () => {
		setVisState(!visState)

		graph_state(visState)
	}

  	return (
		<div className='navbar'>
			<div className='navbar__left-side'>
				<span className='navbar__left-side__logo'>QA/QC</span> 
				<div className="navbar__left-side__visible-option">
					<span className='navbar__left-side__visible-option__text'>Вариант отображения</span>
					<ButtonCmp OnClick={change_option} name={visState ? "Таблица" : "Граф"}></ButtonCmp>
				</div>
			</div>
			<div className="navbar__center-side">
				{selectorType.map(selector_type => {
					<selectorCmp selector_placeholder={selector_type.placeholder} selector_list={selector_type.list}></selectorCmp>
				})}
				
			</div>
                    {/* <MultiSelect value={selectedClassFilters} onChange={(e) => Filter(e.value)} options={classFilters} optionLabel="name" placeholder="Типы вершин" maxSelectedLabels={6}  style={{backgroundColor: "#3FBAC2", color: "#FFFFFF"}} className="mb-4"/>
                    <MultiSelect value={selectedEdgesFilters} onChange={(e) => EdgesFilter(e.value)} options={edgesFilters} optionLabel="name" placeholder="Типы связей" maxSelectedLabels={6}  style={{backgroundColor: "#3FBAC2", color: "#FFFFFF"}}/> */}
			<div className='elements'>
				Выход
			</div>
		</div>
  	);
}
  





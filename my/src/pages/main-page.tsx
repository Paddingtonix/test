import { useState } from 'react';

import "../index.scss"

import { SidebarCmp } from '../components/sidebar-cmp/sidebar-cmp';
import { NavbarCmp } from '../components/navbar-cmp/navbar-cmp';

import grafp from "../grapf.json"
import { GraphPage } from "./graph-page/graph-page"

import { TablePage } from './table-page/table-page';

// import { MultiSelect } from 'primereact/multiselect';
import { ButtonCmp } from "../components/button-cmp/button-cmp"
// import { type } from '@testing-library/user-event/dist/type';

const basicData: graphData = grafp

//types
type Node = {
    id: number,
    label: string,
    type: string,
    class: string,
    group: string
}
type Edge = {
    from: number,
    to: number,
    id: null,
    arrows: string,
    tests: string[]
}
type filterType = {name: string, code: string}[]
type graphData = { nodes: Node[], edges: Edge[] }


export default function Main() {

    //states
   const [modalActive, setModalActive] = useState(false)
   const [node, setNode] = useState<any | null>(null)
   const [testsStarted, setTestsStarted] = useState(false)
   const [visible, setVisible] = useState(true)
   const [visState, setVisState] = useState(true)
   const [loadedData, setLoadedData] = useState(false)
   const [filteredData, setFilteredData] = useState<graphData>(basicData)
   const [selectedData, setSelectedData] = useState(null)
   const [selectedClassFilters, setSelectedClassFilters] = useState<filterType>([])
   const [selectedEdgesFilters, setSelectedEdgesFilters] = useState<filterType>([])

//    const classFilters: filterType = [
//     {name: "PVT", code: "PVT"},
//     {name: "Керн", code: "Керн"},
//     {name: "ПЕТРОФИЗИКА", code: "ПЕТРОФИЗИКА"},
//     {name: "Сейсмика", code: "Сейсмика"},
//     {name: "скв.иссл", code: "скв.иссл"},
//     ]

    // const edgesFilters: filterType = [
    //     {name: "Связь комплексирования ", code: "Однонаправленные"},
    //     {name: "Связь функциональная", code: "Двунаправленные"}
    // ]

   function ModalHelp(){
    setNode(null)
    setModalActive(false)
    setLoadedData(false)
    setTestsStarted(false)
   }

//    function Filter(par: filterType){
//         setSelectedClassFilters(par)
//         // подумай, как можно оптимизировать код // нинаю(
//         if (filteredData !== basicData){
//             if (par.length !==0 ){
//                 let new_data: graphData = {nodes: [], edges: filteredData.edges}
//                 for (let i = 0; i < par?.length; i++){
//                     for (let j = 0; j < grafp.nodes?.length; j++){
//                         if (grafp.nodes[j].class == par[i].name){
//                             new_data.nodes.push(grafp.nodes[j])
//                         }
//                     }
//                 }
//                 setFilteredData(new_data)
//             }
//         }
//         else{
//             if (par.length !== 0){
//                 let new_data: graphData = { nodes: [], edges : grafp.edges}
//                 for (let i = 0; i < par?.length; i++){
//                     for (let j = 0; j< grafp.nodes?.length; j++){
//                         if (grafp.nodes[j].class == par[i].name){
//                             new_data.nodes.push(grafp.nodes[j])
//                         }
//                     }
//                 }
//                 setFilteredData(new_data)
//             }
//         }
//     }

    // function EdgesFilter(par: filterType){
    //     setSelectedEdgesFilters(par)

    //     if (par.length !==0){
    //         let new_data: graphData = {nodes: filteredData.nodes, edges: []}
    //         for (let i = 0; i < par?.length; i++){
    //             for (let j = 0; j < grafp.edges?.length; j++){
    //                 if ((grafp.edges[j].arrows == "to" && par[i].name == "Связь комлесирования") || (grafp.edges[j].arrows == "to, from" && par[i].name == "Связь функциональная")){
    //                     new_data.edges.push(grafp.edges[j])
    //                 }
    //             }
    //         }
    //         setFilteredData(new_data)
    //     }
    // }
    

  return (
    <>
        <NavbarCmp></NavbarCmp>
        <div className='container'>
            <div className='sidebar'>
                <div className='sidebar-content'>
                    <div className='b-cont'>
                        <ButtonCmp OnClick={() => setVisState(!visState)} name={visState ? "Граф" : "Таблица"}></ButtonCmp>
                    </div>
                    {/* <MultiSelect value={selectedClassFilters} onChange={(e) => Filter(e.value)} options={classFilters} optionLabel="name" placeholder="Типы вершин" maxSelectedLabels={6}  style={{backgroundColor: "#3FBAC2", color: "#FFFFFF"}} className="mb-4"/>
                    <MultiSelect value={selectedEdgesFilters} onChange={(e) => EdgesFilter(e.value)} options={edgesFilters} optionLabel="name" placeholder="Типы связей" maxSelectedLabels={6}  style={{backgroundColor: "#3FBAC2", color: "#FFFFFF"}}/> */}
                </div>
            </div>
            {visState ?  
                <div className='graph-grid'>
                    <div id="mynetwork" className="networkvis">
                        <GraphPage filteredData={filteredData} selectedData= {setSelectedData}></GraphPage>
                    </div>
                </div>
                :
                <div className='table-grid' >
                    <TablePage></TablePage>
                </div>
            }
        </div>
        <SidebarCmp active={(node!= null) ? true : false} setActive={setModalActive}>
            {(loadedData == false) ? 
            <>
                <div className='modal-container'>
                    <div className='header-container'>
                        <p className='header'>{node}<i className={visible ? "pi pi-eye pl-4 ic" : "pi pi-eye-slash pl-4 ic"} style={{ fontSize: '1.2rem', color: "#3FBAC2" }} onClick={() => setVisible(!visible)}></i></p>
                    </div>
                    <div className='close-container'>
                        <i className="pi pi-times pr-4 ic" style={{ fontSize: '1.1rem' , color: "#FFFFFF"}} onClick={() => ModalHelp()}></i>
                    </div>
                </div>
                <div className='button-container'>
                    <ButtonCmp name='Загрузить данные' OnClick={() => setLoadedData(true)}></ButtonCmp>
                </div>
                </>
                :
                <>
                    {(testsStarted == true) ? 
                        <>
                           <div className='modal-container'>
                                <div className='header-container'>
                                    <p className='header'>{node}<i className={visible ? "pi pi-eye pl-4 ic" : "pi pi-eye-slash pl-4 ic"} style={{ fontSize: '1.2rem', color: "#3FBAC2" }} onClick={() => setVisible(!visible)}></i></p>
                                </div>
                                <div className='close-container'>
                                    <i className="pi pi-arrow-left pr-4 ic" style={{ fontSize: '1.1rem' , color: "#FFFFFF"}} onClick={() => setTestsStarted(false)}></i>
                                    <i className="pi pi-times pr-4 ic" style={{ fontSize: '1.1rem' , color: "#FFFFFF"}} onClick={() => ModalHelp()}></i>
                                </div>
                            </div>
                            <div className='data-container'>
                                <p className='data-header'>Данные</p>
                                <p className='data'>LoadedData.txt<i className={"pi pi-trash pl-4 ic"} style={{ fontSize: '1.1rem', color: "#3FBAC2" }}></i></p>
                                <p className='data-header'>Результаты тестирования вершин</p>
                                <p className='data'>Тест номер один самый крутой  <span className="badge-passed">passed</span></p>
                                <p className='data'>Тест номер два <span className="badge-error">error</span></p>
                                <p className='data-header'>Результаты тестирования ребер</p>
                                <p className='data'>Тест номер два <span className="badge-passed">passed</span></p>
                                <p className='data'>Тест номер двтри <span className="badge-not-passed">not passed</span></p>
                                <div className='button-container'>
                                    <ButtonCmp name="Скачать полный отчет" OnClick={() => setTestsStarted(true)}></ButtonCmp>
                                </div>
                            </div>
                        </>
                        :
                        <>
                        <div className='modal-container'>
                            <div className='header-container'>
                                <p className='header'>{node}<i className={visible ? "pi pi-eye pl-4 ic" : "pi pi-eye-slash pl-4 ic"} style={{ fontSize: '1.2rem', color: "#3FBAC2" }} onClick={() => setVisible(!visible)}></i></p>
                            </div>
                            <div className='close-container'>
                                <i className="pi pi-times pr-4 ic" style={{ fontSize: '1.1rem' , color: "#FFFFFF"}} onClick={() => ModalHelp()}></i>
                            </div>
                        </div>
                        <div className='data-container'>
                            <p className='data-header'>Данные</p>
                            <p className='data'>LoadedData.txt<i className={"pi pi-trash pl-4 ic"} style={{ fontSize: '1.1rem', color: "#3FBAC2" }}></i></p>
                            <p className='data-header'>Тесты для вершин</p>
                            <p className='data'>Тест номер один самый крутой<i className={"pi pi-check pl-4 ic"} style={{ fontSize: '1.1rem', color: "#3FBAC2" }}></i></p>
                            <p className='data'>Тест номер два</p>
                            <p className='data'>Тест номер двтри</p>
                            <p className='data-header'>Тесты для рёбер</p>
                            <p className='data'>Тест номер один самый крутой<i className={"pi pi-check pl-4 ic"} style={{ fontSize: '1.1rem', color: "#3FBAC2" }}></i></p>
                            <p className='data'>Тест номер два</p>
                            <p className='data'>Тест номер двтри</p>
                            <div className='button-container'>
                                <ButtonCmp name='Начать тестирование' OnClick={() => setTestsStarted(true)}></ButtonCmp>
                            </div>
                            
                        </div>
                        </>
                    }
                </>
            }
        </SidebarCmp>
    </>
  );
}


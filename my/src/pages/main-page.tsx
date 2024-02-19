import { useState, useEffect } from 'react';
import axios from 'axios';

import "../index.scss"

import { SidebarCmp } from '../components/sidebar-cmp/sidebar-cmp';
import { NavbarCmp } from '../components/navbar-cmp/navbar-cmp';

import grafp from "../grapf.json"
import { GraphPage } from "./graph-page/graph-page"

import { TablePage } from './table-page/table-page';

import { ModalCmp } from '../components/modal-cmp/modal-cmp'

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
   const [loadedData, setLoadedData] = useState(false)
   const [filteredData, setFilteredData] = useState<graphData>(basicData)
   const [selectedData, setSelectedData] = useState(null)
   const [selectedClassFilters, setSelectedClassFilters] = useState<filterType>([])
   const [selectedEdgesFilters, setSelectedEdgesFilters] = useState<filterType>([])

   const [edgesValues, setEdgesValues] = useState('')
   const [nodesValues, setNodesValues] = useState('')
   const [attribuiteValues, setAttribuiteValues] = useState('')


    const [dataTable, setDataTable] = useState({})
   const [displayOption, setDisplayOption] = useState(true)

    const [name, setName] = useState('')


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

function ModalHelp() {
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

    useEffect(() => {
        console.log('qwerytu');
        
    }, [attribuiteValues])

    const changeState = (state: boolean | ((prevState: boolean) => boolean)) => {
        // Обновляем состояние в родительском компоненте
        setDisplayOption(state);
    };

    function Filter(par: filterType){
        setSelectedClassFilters(par)
        // подумай, как можно оптимизировать код // нинаю(
        if (filteredData !== basicData){
            if (par.length !==0 ){
                let new_data: graphData = {nodes: [], edges: filteredData.edges}
                for (let i = 0; i < par?.length; i++){
                    for (let j = 0; j < grafp.nodes?.length; j++){
                        if (grafp.nodes[j].class == par[i].name){
                            new_data.nodes.push(grafp.nodes[j])
                        }
                    }
                }
                setFilteredData(new_data)
            }
        } else {
            if (par.length !== 0){
                let new_data: graphData = { nodes: [], edges : grafp.edges}
                for (let i = 0; i < par?.length; i++){
                    for (let j = 0; j< grafp.nodes?.length; j++){
                        if (grafp.nodes[j].class == par[i].name){
                            new_data.nodes.push(grafp.nodes[j])
                        }
                    }
                }
                setFilteredData(new_data)
            }
        }
    }

    function filterAttributeTest(par: string) {
        let filter_type: any = {nodes: [], edges: []}

        if(par.length > 0 && par === 'По формату') {
            // let filter_type: any = { nodes: grafp.nodes, edges: grafp.edges} 


            filter_type.edges = grafp.edges
            
            for (let i = 0; i < grafp.nodes.length; i++) {
                let obj = grafp.nodes[i]

                obj.group = grafp.nodes[i].type


                filter_type.nodes.push(obj)

            }
            
            setFilteredData({nodes: [], edges: []})
            setTimeout(() => {          
                setFilteredData(filter_type)
            }, 100);
        } else {
            filter_type.edges = grafp.edges

            for (let i = 0; i < grafp.nodes.length; i++) {
                let obj = grafp.nodes[i]

                obj.group = grafp.nodes[i].class


                filter_type.nodes.push(obj)

            }            

            setFilteredData({nodes: [], edges: []})
            setTimeout(() => {                
                setFilteredData(filter_type)
                
            }, 300);
        }
    }

    useEffect(() => {
        axios
            .get('/api/output.json')
            .then((table_response: { data: any; }) => {
                console.log(table_response.data);
                
                setDataTable(table_response.data)                
            })
    }, [])

    ///////////////////nodes
    function filteredDataTest(str: string) {        
        if(str.length > 0) {
            let filter_nodes: any = { nodes: [], edges: grafp.edges} 

            for(let i = 0; i < grafp.nodes.length; i++) {
                if(grafp.nodes[i].class === str) {
                    filter_nodes.nodes.push(grafp.nodes[i])
                }
            }
            setNodesValues(str)
            setFilteredData(filter_nodes)
        } else {
            setFilteredData(basicData)
        }
    }

    function filteredEdgesTest(str: string) {        
        if(str.length > 0) {
            let filter_edges: any = {nodes: grafp.nodes, edges: []}

            for (let i = 0; i < grafp.edges.length; i++) {
                if ((grafp.edges[i].arrows === "to" && str === "Односторонняя") || (grafp.edges[i].arrows == "to, from" && str == "Двусторонняя")) {
                    filter_edges.edges.push(grafp.edges[i])
                }
            }            
            setEdgesValues(str)
            setFilteredData(filter_edges)
        } else {
            setFilteredData(basicData)
        }
    }

    function setNameNodes(name: string) {
        setName(name)
    }
        

  return (
    <>
        <NavbarCmp graph_state={changeState} filter_graph={filteredDataTest} filter_edge={filteredEdgesTest} filter_attribute={filterAttributeTest}></NavbarCmp>
        <div className='container'>
            {displayOption ?  
                <div className='graph-grid'>
                    <div id="mynetwork" className="networkvis">
                        <GraphPage setName={setNameNodes} callBack={setNode} filteredData={filteredData} selectedData= {setSelectedData}></GraphPage>
                    </div>
                </div>
                :
                <div className='table-grid' >
                    <TablePage table={dataTable}></TablePage>
                </div>
            }
        </div>
        <ModalCmp nameNodes={name} />

        {/* <SidebarCmp active={(node!= null) ? true : false} setActive={setModalActive}>
            {(loadedData == false) ? 
            <>
                <div className='modal-container'>
                    <div className='header-container'>
                        <p className='header'>{node}<i className={visible ? "pi pi-eye pl-4 ic" : "pi pi-eye-slash pl-4 ic"} style={{ fontSize: '1.2rem', color: "#3FBAC2" }} onClick={() => setVisible(!visible)}></i></p>
                    </div>
                    <div className='close-container' onClick={() => ModalHelp()}>
                        <div className='close-container__line'></div>
                        <div className='close-container__line'></div>
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
                                <div className='close-container' onClick={() => ModalHelp()}>
                                    <div className='close-container__line'></div>
                                    <div className='close-container__line'></div>
                                
                                </div>
                                <div className='header-container'>
                                    <p className='header'>{node}<i className={visible ? "pi pi-eye pl-4 ic" : "pi pi-eye-slash pl-4 ic"} style={{ fontSize: '1.2rem', color: "#3FBAC2" }} onClick={() => setVisible(!visible)}></i></p>
                                </div>
                                <div className='close-container'>
                                    <div className='close-container__line'></div>
                                    <div className='close-container__line'></div>
                                
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
                            <div className='close-container'>
                                <div className='close-container__back-arrow'></div>
                                <div className='close-container__back-arrow'></div>
                                <div className='close-container__back-arrow'></div>
                            </div>
                            <div className='close-container' onClick={() => ModalHelp()}>
                                <div className='close-container__line'></div>
                                <div className='close-container__line'></div>
                            </div>
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
        </SidebarCmp> */}
    </>
  );
}
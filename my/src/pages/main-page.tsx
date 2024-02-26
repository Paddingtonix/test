import { useState, useEffect } from 'react';
import axios from 'axios';

import "../index.scss"

import { NavbarCmp } from '../components/navbar-cmp/navbar-cmp';
import { GraphPage } from "./graph-page/graph-page";
import { TablePage } from './table-page/table-page';
import { ModalCmp } from '../components/modal-cmp/modal-cmp';

const basicData = require("../grapf.json");

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

type FilterType = { name: string, code: string }[];

type GraphData = { nodes: Node[], edges: Edge[] };

export default function Main() {
    const [node, setNode] = useState<any | null>(null);
    const [filteredData, setFilteredData] = useState<GraphData>({ ...basicData });
    const [selectedData, setSelectedData] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [dataTable, setDataTable] = useState({});
    const [displayOption, setDisplayOption] = useState(true);
    const [name, setName] = useState('');

    useEffect(() => {
        axios.get('/api/output.json')
            .then((table_response: { data: any; }) => {
                setDataTable(table_response.data);
            });
    }, []);

    function openModalState(state: boolean) {
        setOpenModal(state);
    }

    const changeState = (state: boolean | ((prevState: boolean) => boolean)) => {
        setDisplayOption(state);
    };

    function filter(par: FilterType, type: string) {
        const filterData = { ...basicData };
        let newData: Node[] = [];
        if (type === 'class') {
            for (let i = 0; i < par.length; i++) {
                for (let j = 0; j < basicData.nodes.length; j++) {
                    if (basicData.nodes[j].class === par[i].name) {
                        newData.push(basicData.nodes[j]);
                    }
                }
            }
            filterData.nodes = newData;
        } else if (type === 'attribute') {
            const filterType = par.length > 0 && par[0].name === 'По формату' ? 'type' : 'class';
            for (let i = 0; i < basicData.nodes.length; i++) {
                basicData.nodes[i].group = basicData.nodes[i][filterType];
            }
        }
        setFilteredData(filterData);
    }

    function selectNode(id: number | string) {
        let selectNodeData: GraphData = { nodes: basicData.nodes, edges: basicData.edges };
        if (typeof (id) === 'number') {
            if (id !== selectNodeData.nodes[selectNodeData.nodes.length - 1].id) {
                selectNodeData = { nodes: basicData.nodes, edges: basicData.edges };
                selectNodeData.nodes = selectNodeData.edges.reduce((filteredNodes: any[], edge: any) => {
                    if (edge.from === id) {
                        const matchingNode = selectNodeData.nodes.find((node: any) => node.id === edge.to);
                        filteredNodes.push(matchingNode);
                        filteredNodes.push(selectNodeData.nodes.find((node: any) => node.id === edge.from));
                    }
                    return filteredNodes;
                }, []);
                setTimeout(() => {
                    setFilteredData(selectNodeData);
                }, 100);
            } else {
                selectNodeData.nodes = selectNodeData.edges.reduce((filteredNodes: any[], edge: any) => {
                    if (edge.from === id) {
                        const matchingNode = selectNodeData.nodes.find((node: any) => node.id === edge.to);
                        filteredNodes.push(matchingNode);
                        filteredNodes.push(selectNodeData.nodes.find((node: any) => node.id === edge.from));
                    }
                    return filteredNodes;
                }, []);
                setFilteredData(selectNodeData);
            }
        } else if (id === 'original') {
            setTimeout(() => {
                setFilteredData(basicData);
            }, 100);
        }
    }

    function setNameNodes(name: string) {
        setName(name);
    }

    return (
        <>
            <NavbarCmp graph_state={changeState} filter={filter}></NavbarCmp>
            <div className='container'>
                {displayOption ?
                    <div className='graph-grid'>
                        <div id="mynetwork" className="networkvis">
                            <GraphPage
                                modalState={openModalState}
                                setName={setNameNodes}
                                callBack={setNode}
                                filteredData={filteredData}
                                selectedData={setSelectedData}
                                selectNode={selectNode}
                            ></GraphPage>
                        </div>
                    </div>
                    :
                    <div className='table-grid' >
                        <TablePage table={dataTable}></TablePage>
                    </div>
                }
            </div>
            {
                openModal ?
                    <ModalCmp modalState={openModalState} nameNodes={name} />
                    :
                    ''
            }
        </>
    );
}

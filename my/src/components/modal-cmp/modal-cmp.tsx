import { useState, useEffect, useRef } from 'react';
import { ButtonCmp } from '../button-cmp/button-cmp';
import { CheckboxCmp } from '../checkbox-cmp/checkbox-cmp';
import axios from "axios";

interface Props {
    nameNodes: string
}

export const ModalCmp = ({ nameNodes }: Props) => {
    const [splitNameNodes, setSplitNameNodes] = useState<{ text: string; type: string}[]>([
        {
            text: '',
            type: ''
        }
    ]);

    const [selectedFile, setSelectedFile] = useState(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [stepModal, setStepModal] = useState(3) as any

    const [testsModal, setTestsModal] = useState({
        document: 'text',
        vertex_test: [
            {   
                name: "Тест первого порядка",
                success: true
            },
            {   
                name: "Тест второго порядка",
                success: true
            },
            {   
                name: "Тест третьего порядка",
                success: false
            }
        ],
        edges_test: [
            {   
                name: "Тест первого порядка",
                success: false
            },
            {   
                name: "Тест второго порядка",
                success: false
            },
            {   
                name: "Тест третьего порядка",
                success: false
            }
        ]
    }) as any
    
    

    useEffect(() => {
        SplitName(nameNodes);
    }, [nameNodes]);

    function SplitName(nameNodes: string) {
        let splitStr = nameNodes.split('|');
        let array = splitStr.slice(0, -1).map((value, index) => ({
            text: value,
            type: index === 0 ? 'Наименование' : index === 1 ? 'Формат' : 'Домен'
        }));
        setSplitNameNodes(array);
    }

    const handleFileChange = (event: any) => {
		
		const file = event.target.files[0];
		setSelectedFile(file);
	};

    useEffect(() => {
        axios
            .get('/api/tests.json')
            .then(response_test => {
                setTestsModal(response_test.data);
            })
    }, [])


    function uploadData() {
        if (selectedFile) {
			const fd = new FormData();
			fd.append('file', selectedFile);
			
			axios
				.get('/api/success.json')
				.then((response) => {
                    console.log(response);
                    
					if(response.data) {
                        setStepModal(2)
                    }
				})
		} else {
			if (fileInputRef && fileInputRef.current) {
				fileInputRef.current.click();
			}
		}
    }

    
    

    return (
        <div className="modal">
            <div className="modal__close">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41L17.59 5Z" fill="#ffffff" />
                </svg>
            </div>
            <div className='modal__title'>
                {splitNameNodes.map((name) => (
                    <div className='modal__title__container' key={name.text}>
                        <span className='modal__title__text'>{name.type}:</span>
                        <span className='modal__title__text'>{name.text}</span>
                    </div>
                ))}
            </div>
            {stepModal === 1 ?
                <div className='modal__btn'>
                    <ButtonCmp OnClick={uploadData} name={!selectedFile ? 'Загрузить данные' : 'Отправить файл'}></ButtonCmp>
                    <input id='fileUpload' type="file" onChange={handleFileChange} ref={fileInputRef} style={{ display: 'none' }} />
                </div>
                :
                ''
            }
            {stepModal === 2 && 
                <>
                    <div className='modal__tests'>
                        <h2 className='modal__tests__title'>Данные</h2>
                        <div className='modal__tests__container'>
                            <span className='modal__tests__text'>Файл: {testsModal.document}</span>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 22H7C5.89543 22 5 21.1046 5 20V7H3V5H7V4C7 2.89543 7.89543 2 9 2H15C16.1046 2 17 2.89543 17 4V5H21V7H19V20C19 21.1046 18.1046 22 17 22ZM7 7V20H17V7H7ZM9 4V5H15V4H9ZM15 18H13V9H15V18ZM11 18H9V9H11V18Z" fill="#ffffff"/>
                            </svg>
                        </div>
                        <h2 className='modal__tests__title'>Тесты для рёбер</h2>
                        <div className='modal__tests__container__test'>
                            {testsModal.edges_test.map((test: any) => {
                                return (
                                    <>
                                        <div className='modal__tests__container'>
                                            <CheckboxCmp
                                                OnClick={undefined} name={test.name}
                                            ></CheckboxCmp>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                        <h2 className='modal__tests__title'>Тесты для вершин</h2>
                        <div className='modal__tests__container__test'>
                            {testsModal.vertex_test.map((test: any) => {
                                return (
                                    <>
                                        <div className='modal__tests__container'>
                                            <CheckboxCmp
                                                OnClick={undefined} name={test.name}
                                            ></CheckboxCmp>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                    {stepModal === 1 ? 
                        (
                            <div className='modal__btn'>
                                <ButtonCmp OnClick={uploadData} name={!selectedFile ? 'Загрузить данные' : 'Отправить файл'}></ButtonCmp>
                                <input id='fileUpload' type="file" onChange={handleFileChange} ref={fileInputRef} style={{ display: 'none' }} />
                            </div>
                        )
                            :
                        (
                            <div className='modal__btn'>
                                <ButtonCmp OnClick={uploadData} name={'Начать тестирование'}></ButtonCmp>
                                <input id='fileUpload' type="file" onChange={handleFileChange} ref={fileInputRef} style={{ display: 'none' }} />
                            </div>
                        )
                    }
                </>
            }
            {
                stepModal === 3 && 
                <>
                    {testsModal.vertex_test.map((name: any) => (
                        <div className='modal__title__container' key={name.text}>
                            <span className='modal__title__text'>{name.type}</span>
                            <span className='modal__title__text'>{name.text}</span>
                        </div>
                    ))}
                </>
            }
        </div>
    );
};

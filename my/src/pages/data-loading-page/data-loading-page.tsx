import React, { useEffect, useState, useMemo, useRef } from 'react';
import {FileWithPath, useDropzone} from 'react-dropzone'
import '../../style/default.scss'
import axios from 'axios';
import { response } from 'express';


interface Props {
    prop?: boolean;
}

//Получение типа файла
function getExtension(file_name: string | undefined){
    return file_name?.split('.').reverse()[0];
}

export const DataLoadingPage = (props: Props) => {

    const [loadedFiles, setLoadedFiles] = useState<FileWithPath[]>([])

    const [style, setStyle] = useState('dropdown-content-closed')

    //т.к. запрос не отправляется 
    const [categories, setCategories] = useState([{ 
        "category_name" : 'Керн'
    },      
    { 
        "category_name" : 'ПЕТРОФИЗИКА'
    },  
    {
        "category_name" : 'PVT'
    },
    {
        "category_name" : 'Сейсмика'
    },
    {
        "category_name" : 'скв.иссл'
    }])

    const [selectedCategory, setSelectedCategory] = useState<string>('Категория')

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        accept: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : ['.xlsx']
        },
        onDrop: (acceptedFiles: File[]) => {
            const files_: FileWithPath[] = acceptedFiles.map((file: FileWithPath) => ({
                ...file
            }));
            setLoadedFiles(files_)
        }
    });
    
    const files = loadedFiles.map((file : FileWithPath) => (
      <div className = 'file-card' key={file.path}>
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 22H6C4.89543 22 4 21.1046 4 20V4C4 2.89543 4.89543 2 6 2H13C13.0109 2.00047 13.0217 2.00249 13.032 2.006C13.0418 2.00902 13.0518 2.01103 13.062 2.012C13.1502 2.01765 13.2373 2.0348 13.321 2.063L13.349 2.072C13.3717 2.07968 13.3937 2.08904 13.415 2.1C13.5239 2.14842 13.6232 2.21618 13.708 2.3L19.708 8.3C19.7918 8.38479 19.8596 8.48406 19.908 8.593C19.918 8.615 19.925 8.638 19.933 8.661L19.942 8.687C19.9699 8.77039 19.9864 8.85718 19.991 8.945C19.9926 8.95418 19.9949 8.96322 19.998 8.972C19.9998 8.98122 20.0004 8.99062 20.0001 9V20C20.0001 21.1046 19.1046 22 18 22ZM6 4V20H18V10H13C12.4477 10 12 9.55228 12 9V4H6ZM14 5.414V8H16.586L14 5.414Z" fill="#22848b"/>
        </svg>

        <div className='card-info'>
            <div className='file-name'>{file.path}</div>
            <div className='file-info'>
                <div>{getExtension(file.path)}</div>
                <div className='file-info-item'>{file.size} Байт</div>
            </div>
        </div>
        <div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41L17.59 5Z" fill="#22848b"/>
        </svg>
        </div>
      </div>
    ));

    function selectCategory(categoryName : string) {
        setSelectedCategory(categoryName)
    }

    const categoriesList = categories.map((category) => (<a onClick={() => selectCategory(category.category_name)}>{category.category_name}</a>))
    
    const changeDropdownState = () => {
        if (style == 'dropdown-content-closed'){
            setStyle('dropdown-content-opened')
        }
        else{
            setStyle('dropdown-content-closed')
        }
    }

    //Локальный запрос на список категорий возвращает 404 

    /*const categoriesList = () => {
        axios.defaults.baseURL = "http://localhost:3002/"
        axios
            .get('my/public/api/categories.json', {
                headers: {
                  Accept: 'application/json',
                }})
            .then((response) => {
                console.log(response.data)
                setCategories(response.data)
            })
            .catch((err) => console.log(err))
    }*/

    return(
        <>
            <section className="loading-container">
                <div className='dropdown-container'>
                    <div className='dropdown'>
                        <div className='category'>
                            {selectedCategory}
                        </div>
                        <div className='chevron' onClick={changeDropdownState}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.51501 8.465L12 16.95L20.485 8.465L19.071 7.05L12 14.122L4.92901 7.05L3.51501 8.465Z" fill="#ffffff"/>
                            </svg>
                        </div>
                    </div>
                    <div className={style}>
                        {categoriesList}
                    </div>
                </div>
            <div {...getRootProps({className: 'dropzone'})} className='custom-dropzone'>
                <input {...getInputProps()} />
                <p>Перетащите файлы сюда, или кликните, чтобы выбрать файл</p>
            </div>
            <aside>
                <h4>Загруженные файлы</h4>
                <div className='files-container'>
                {files}
                </div>
            </aside>
            </section>
        </>
    )
}
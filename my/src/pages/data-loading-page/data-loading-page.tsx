import {useState} from 'react';
import {FileWithPath, useDropzone} from 'react-dropzone'
import "./style.scss"
import {ButtonCmp} from "../../components/button-cmp/button-cmp"
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {ProjectFileDto, queryKeys, service, UploadTestFileDto} from "../../utils/service";
import {useNotification} from "../../components/base/notification/notification-provider";
import {Link} from "react-router-dom";
import LayoutCmp from "../../components/layout-cmp/layout-cmp";

type Category = {
    name: string
}

const CATEGORIES: Category[] = [
    {name: "КЕРН"},
    {name: "ПЕТРОФИЗИКА"},
    {name: "PVT"},
    {name: "СЕЙСМИКА"},
    {name: "СКВ.ИССЛЕДОВАНИЕ"}
]

export const DataLoadingPage = () => {

    const queryClient = useQueryClient();
    const [selectedProject, setSelectedProject] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>('КЕРН')
    const [loadedFiles, setLoadedFiles] = useState<FileWithPath[]>([])
    const [openDropdown, setOpenDropdown] = useState(false)

    const {toastSuccess, toastWarning} = useNotification();

    const {data: projects} = useQuery({
        queryKey: queryKeys.projects(),
        queryFn: () => service.getProjects(),
        select: ({data}) => data.projects
    })

    const {data: projectFiles} = useQuery({
        queryKey: queryKeys.projectFiles(selectedProject),
        queryFn: () => service.getProjectFiles(selectedProject),
        select: ({data}) => data.files,
        enabled: !!selectedProject
    })

    const {mutate: uploadFile} = useMutation({
        mutationFn: (data: UploadTestFileDto) => service.uploadTestFile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: queryKeys.projectFiles(selectedProject)})
            toastSuccess("Файл загружен")
        }
    });

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        accept: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
        },
        onDrop: (acceptedFiles: File[]) => {
            const files_: FileWithPath[] = acceptedFiles.map((file: FileWithPath) => ({
                ...file
            }));
            setLoadedFiles(files_)
        }
    });

    const selectCategory = (name: string) => {
        setSelectedCategory(name)
        setOpenDropdown(false)
    }

    const onUpload = () => {
        if (!selectedProject) {
            toastWarning("Выберите проект, в который будут загружены данные");
            return;
        }
        uploadFile({
            projectID: selectedProject,
            file: acceptedFiles[0]
        })
        setLoadedFiles([]);
    }

    return (
        <LayoutCmp>
            <div className="data-loading-page">
                <div className={"data-loading-page__header"}>
                    <div className={"projects"}>
                        {
                            projects?.map(project =>
                                <div key={project.id}
                                     className={`projects__item ${project.id === selectedProject ? "projects__item_selected" : null}`}
                                     onClick={() => project.id !== selectedProject ? setSelectedProject(project.id) : setSelectedProject("")}
                                >
                                    {project.name}
                                </div>)
                        }
                        <button className={`projects__item`} onClick={() => toastWarning("Создание проектов в разработке")}>
                            Создать +
                        </button>
                    </div>
                </div>
                <div className={"project-content"}>
                    <div className={"categories-files-container"}>
                        {
                            selectedProject ?
                                <>
                                    <CategoryFiles name={"КЕРН"} files={projectFiles}/>
                                    <CategoryFiles name={"ПЕТРОФИЗИКА"} files={[]}/>
                                    <CategoryFiles name={"PVT"} files={[]}/>
                                    <CategoryFiles name={"СЕЙСМИКА"} files={[]}/>
                                    <CategoryFiles name={"СКВ.ИССЛЕДОВАНИЕ"} files={[]}/>
                                </>
                                : <div className={"categories-files-container__empty"}>Выберите проект</div>
                        }

                    </div>
                    <div className={"upload-files-container"}>
                        <h4>Загрузить новые данные</h4>
                        <div className='dropdown-container'>
                            <div className='dropdown' onClick={() => setOpenDropdown(!openDropdown)}>
                                <div className='category'>
                                    {selectedCategory}
                                </div>
                                <div className='chevron'>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg" className={!openDropdown ? 'arrow up' : 'arrow'}>
                                        <path
                                            d="M3.51501 8.465L12 16.95L20.485 8.465L19.071 7.05L12 14.122L4.92901 7.05L3.51501 8.465Z"
                                            fill="#ffffff"/>
                                    </svg>
                                </div>
                            </div>
                            <div className={!openDropdown ? "dropdown-content-closed" : "dropdown-content-opened"}>
                                {CATEGORIES.map((item) =>
                                        <span key={item.name} onClick={() => selectCategory(item.name)}>
                                    {item.name}
                                </span>
                                )}
                            </div>
                        </div>
                        <div {...getRootProps({className: 'dropzone'})} className='custom-dropzone'>
                            <input {...getInputProps()} />
                            <span>Перетащите файлы сюда или <br/> кликните, чтобы выбрать файл</span>
                        </div>
                        <div className='files-container'>
                            {
                                loadedFiles.map((file: FileWithPath, index) => (
                                    <FileCard name={file.path} size={file.size} key={index}/>
                                ))
                            }
                        </div>
                        {
                            loadedFiles.length ?
                                <>
                                    <ButtonCmp OnClick={onUpload} name={'Загрузить данные'}/>
                                    <ButtonCmp OnClick={() => setLoadedFiles([])} name={'Отмена'}/>
                                </>
                                : null
                        }
                    </div>
                </div>
            </div>
        </LayoutCmp>
    )
}

interface CategoryFilesProps {
    name?: string,
    files?: ProjectFileDto[],
}

const CategoryFiles = ({name, files}: CategoryFilesProps) => {

    const [isOpen, setOpen] = useState(false);

    return (
        <div className={`category-files ${isOpen ? "category-files_open" : ""}`}>
            <span onClick={() => setOpen(!isOpen)}>
                {name}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M3.51501 8.465L12 16.95L20.485 8.465L19.071 7.05L12 14.122L4.92901 7.05L3.51501 8.465Z"
                        fill="#ffffff"/>
                </svg>
            </span>
            <div className={`category-files__list ${isOpen ? "category-files__list_open" : ""}`}>
                {
                    files?.length ?
                        files?.map((file, index) =>
                            <FileCard name={file.name} path={file.path} key={index}/>)
                        : <span>Файлов нет</span>
                }
            </div>
        </div>
    )
}

interface FileCardProps {
    name?: string,
    path?: string
    size?: number
}

const FileCard = ({name, path, size}: FileCardProps) => {
    return (
        <div className='file-card'>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M18 22H6C4.89543 22 4 21.1046 4 20V4C4 2.89543 4.89543 2 6 2H13C13.0109 2.00047 13.0217 2.00249 13.032 2.006C13.0418 2.00902 13.0518 2.01103 13.062 2.012C13.1502 2.01765 13.2373 2.0348 13.321 2.063L13.349 2.072C13.3717 2.07968 13.3937 2.08904 13.415 2.1C13.5239 2.14842 13.6232 2.21618 13.708 2.3L19.708 8.3C19.7918 8.38479 19.8596 8.48406 19.908 8.593C19.918 8.615 19.925 8.638 19.933 8.661L19.942 8.687C19.9699 8.77039 19.9864 8.85718 19.991 8.945C19.9926 8.95418 19.9949 8.96322 19.998 8.972C19.9998 8.98122 20.0004 8.99062 20.0001 9V20C20.0001 21.1046 19.1046 22 18 22ZM6 4V20H18V10H13C12.4477 10 12 9.55228 12 9V4H6ZM14 5.414V8H16.586L14 5.414Z"
                    fill="#8d8d8d"/>
            </svg>
            <div className='file-card__info'>
                {
                    path ? <Link to={path} target={"_blank"}>{name}</Link> : <h5>{name}</h5>
                }
                <div>
                    <span>{`${getExtension(name)} | `}</span>
                    <span>{size || "-"} Байт</span>
                </div>
            </div>
            {/*<div>*/}
            {/*    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"*/}
            {/*         xmlns="http://www.w3.org/2000/svg">*/}
            {/*        <path*/}
            {/*            d="M17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41L17.59 5Z"*/}
            {/*            fill="#8d8d8d"/>*/}
            {/*    </svg>*/}
            {/*</div>*/}
        </div>
    )
}

//Получение типа файла
function getExtension(file_name: string | undefined) {
    return file_name?.split('.').reverse()[0].toUpperCase();
}
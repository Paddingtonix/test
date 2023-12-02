import React from 'react';
import "../../index.scss"


interface Props {
    active: boolean,
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
    children: JSX.Element[] | JSX.Element
}

export const SidebarCmp = ({active, setActive, children}: Props) => {
    return (
        <div className={active ? 'modal active' : "modal closed"}>
            <div className={active? "content act" : "cls content"}>
                {children}
            </div>
        </div>
    )
}

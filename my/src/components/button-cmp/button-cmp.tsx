import "../../index.scss"

interface Props{
    OnClick:  any,
    name: string
}

export const ButtonCmp =({OnClick, name}: Props) => {
    return (
        <button className='button' onClick={OnClick}>{name}</button>
    )
}



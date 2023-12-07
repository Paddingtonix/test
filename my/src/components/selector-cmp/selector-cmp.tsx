import './style.sass'
import { useState } from 'react'

export const selectorCmp = ({ selector_value, selector_placeholder, selector_list }) => {
    const [selectorValue, setSelectorState] = useState('')
    const [selectorList, setSelectorList] = useState(false)

    const openSelectorList = () => {
        setSelectorList(!selectorList)
    }

    const setSelectorValue = (text: string) => {
        setSelectorState(text)
    }

    return (
        <>
            <div className='selector'>
                <input 
                    placeholder={selector_placeholder}
                    value={selectorValue}
                    onClick={openSelectorList}  
                />
                {selectorList && 
                    <div className="selector-list">
                        {selector_list.map(list => {
                            return <span onClick={() => setSelectorValue(list.text)}>{list.text}</span>
                        })}
                    </div>
                }
            </div>
        </>
    )
}
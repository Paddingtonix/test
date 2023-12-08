import './style.scss'
import { useState } from 'react'

interface SelectorCmpProps {
    selector_value: any;
    selector_placeholder: any;
    selector_list: any;
}

export const SelectorCmp = ({ selector_value, selector_placeholder, selector_list }: SelectorCmpProps) => {
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
                        {selector_list.map((list: { text: string }) => {
                            return <span onClick={() => setSelectorValue(list.text)}>{list.text}</span>
                        })}
                    </div>
                }
            </div>
        </>
    )
}
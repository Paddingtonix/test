import './style.scss'
import { useState } from 'react'

interface SelectorCmpProps {
    selector_placeholder: any;
    selector_list: any;
    selector_value: any;
}

export const SelectorCmp = ({ selector_value, selector_placeholder, selector_list }: SelectorCmpProps) => {
    const [selectorValue, setSelectorState] = useState('')
    const [selectorList, setSelectorList] = useState(false)

    const openSelectorList = () => {
        setSelectorList(!selectorList)
    }

    const setSelectorValue = (text: string) => {
        setSelectorState(text)
        selector_value(text)
        setSelectorList(false)
    }

    const clearField = () => {
        setSelectorState('')
        selector_value('')
        setSelectorList(false)
    }

    return (
        <>
            <div className='selector'>
                <input 
                    placeholder={selector_placeholder}
                    value={selectorValue}
                    readOnly={true}
                    onClick={openSelectorList}  
                />
                {selectorList && 
                    <div className="selector-list">
                        {selector_list.map((list: { text: string }) => {
                            return <span onClick={() => setSelectorValue(list.text)} key={list.text}>{list.text}</span>
                        })}
                    </div>
                }
                <div className='selector__clear' onClick={clearField}>
                    <div className='selector__clear__line'></div>
                    <div className='selector__clear__line'></div>
                </div>
            </div>
        </>
    )
}
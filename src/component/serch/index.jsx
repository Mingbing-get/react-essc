import React, { useState, useRef, useEffect } from 'react';
import './index.css';

export default function Serch({...porps}){
    const [value, setValue] = useState(porps.value||'');
    const input = useRef(null);

    useEffect(()=>{
        if (porps.focus){
            input.current.focus();
        }
    },[]);

    function onchange(e) {
        setValue(e.target.value);
        if (porps.setValue !== undefined && porps.setValue !== null)
            porps.setValue(e.target.value);
        if (porps.onchange !== undefined && porps.onchange !== null)
            porps.onchange(e);
    }
    return(
        <div
            style={ porps.style||null }
            className={ porps.className?porps.className+' serch':'serch' }
        >
            <span className='fa fa-search serch_span'></span>
            <input
                ref={input}
                type={ porps.type||'text' }
                placeholder={ porps.placeholder||'' }
                onKeyDown={ porps.onkeydown||null }
                onKeyUp={ porps.onkeyup||null }
                onChange={ onchange }
                value={ value }
                style={ porps.inputStyle||null }
                className={ porps.inputClassName?porps.inputClassName+' serch_input':'serch_input' }
            />
        </div>
    );
}
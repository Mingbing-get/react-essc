import React, {useState, useEffect, useRef} from 'react';
import './index.css';

export default function Input({...props}) {
    const [value, setValue] = useState(props.value || '');
    const input = useRef(null);
    const inputPointBox = useRef(null);

    useEffect(()=>{
        if (props.focus){
            input.current.focus();
        }
    },[]);

    useEffect(()=>{
        if (!props.shake)
            return;
        if (props.status !== 'error')
            return;
        inputPointBox.current.className += ' shake';
        setTimeout(()=>{
            removeClass(inputPointBox.current, 'shake')
        },500);
    },[props.status]);

    function inputChange(e) {
        if (props.onChange)
            props.onChange(e);
        if (props.setValue)
            props.setValue(e.target.value);
        setValue(e.target.value);
    };

    function removeClass(element, classname) {
        let allclass = element.className.split(' ');
        allclass = allclass.filter((value)=>{
            return value !== classname && value !== ' ';
        });
        element.className = allclass.join(' ');
    };

    return (
        <div className='input-point-box' ref={inputPointBox}>
            <div
                className={props.status?props.status+' input-box':'input-box'}
            >
                <input
                    ref={input}
                    id={props.id||''}
                    className={props.className?props.className:''}
                    style={props.style?props.style:null}
                    value={value}
                    onChange={(e)=>{inputChange(e)}}
                    onKeyUp={props.onKeyUp?(e)=>{props.onKeyUp(e)}:null}
                    onKeyDown={props.onKeyDown?(e)=>{props.onKeyDown(e)}:null}
                    onKeyPress={props.onKeyPress?(e)=>{props.onKeyPress(e)}:null}
                    onBlur={props.onBlur?(e)=>{props.onBlur(e)}:null}
                    placeholder={props.placeholder?props.placeholder:''}
                    type={props.type||'text'}
                />
            </div>
            {
                props.point?
                    <div
                        className={props.status?props.status+' input-point':'input-point'}
                    >
                        {props.pointContent}
                    </div>
                    :
                    ''
            }
        </div>
    );
}
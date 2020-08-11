import React from 'react';
import './index.css';

export default function TopBar({...porps}) {

    function backClick(e) {
        e.stopPropagation();
        if (porps.onBack !== undefined && porps.onBack !== null)
            porps.onBack();
        else{
            window.history.back();
        }
    }
    return (
        <div
            style={ porps.style||null }
            className={ porps.className?porps.className+' topBar':'topBar' }
        >
            {
                porps.left?
                    <div className='topBar_left_self'>
                        {porps.left}
                    </div>
                    :
                    <span className='fa fa-angle-left topBar_left' onClick={backClick}></span>
            }
            <div className='topBar_center'>{porps.children}</div>
            {
                porps.right?
                    <div className='topBar_right'>{porps.right}</div>
                    :
                    ''
            }
        </div>
    );
}
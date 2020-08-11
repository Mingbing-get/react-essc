import React from 'react';
import './index.css';

export default function Message({...props}) {
    return (
        <div
            className={props.status?props.status+' message-box':'message-box'}
        >
            <span className='message-icon'></span>
            {props.content}
        </div>
    );
}
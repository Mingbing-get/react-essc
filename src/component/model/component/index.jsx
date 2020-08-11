import React from 'react';
import './index.css';

export default function Model({...props}) {

    function cancel(e) {
        if (props.config.cancelClick)
            props.config.cancelClick(e);
        removeThisById();
    }

    function confirm(e) {
        if (props.config.confirmClick){
            if (props.config.confirmClick(e))
                return;
        }
        removeThisById();
    }

    function removeThisById() {
        let thisdiv = document.getElementById(props.config.id);
        thisdiv.parentNode.removeChild(thisdiv);
    }

    return (
        <div className='model-shadow'>
            <div
                className={props.className?props.className+' model-box':'model-box'}
                style={props.style?props.style:null}
            >
                <div
                    className={props.config.status?props.config.status+' model-header':'model-header'}
                >
                    <span className='model-icon'></span>
                    {props.config.title?props.config.title:'标题'}
                    <span className='model-close fa fa-close' onClick={()=>{removeThisById()}}></span>
                </div>
                <div
                    className={props.config.status?props.config.status+' model-body':'model-body'}
                >
                    {props.config.content?props.config.content:'内容'}
                </div>
                <div className='model-footer'>
                    <button onClick={(e)=>{cancel(e)}}>
                        {props.config.cancelContent?props.config.cancelContent:'取消'}
                    </button>
                    <button onClick={(e)=>{confirm(e)}}>
                        {props.config.confirmContent?props.config.confirmContent:'确定'}
                    </button>
                </div>
            </div>
        </div>
    );
}
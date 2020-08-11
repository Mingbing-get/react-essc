import React from 'react';
import ReactDOM from 'react-dom';
import Message from "./component/index";

const name = 'messageAutoDisappearOnTime';
const message = {};

message.info = (content, time)=>{
    creatDom(null, content, time);
};

message.success = (content, time)=>{
    creatDom('message-success', content, time);
};

message.waring = (content, time)=>{
    creatDom('message-waring', content, time);
};

message.error = (content, time)=>{
    creatDom('message-error', content, time);
};

//销毁所有的提示message的函数
message.destroy = ()=>{
    let messages = document.getElementsByClassName('message-box');
    for (let i = 0; i < messages.length; i++){
        document.body.removeChild(messages[i].parentNode);
    }
};

function creatDom(status, content, time) {
    time = time || 2000;
    let divBox = document.createElement('div');
    divBox.name = name;
    ReactDOM.render(
        <Message
            content={content}
            status={status}
        />
        , divBox);
    document.body.appendChild(divBox);
    setTimeout(()=>{
        let messages = document.getElementsByClassName('message-box');
        for (let i = 0; i < messages.length; i++){
            if (messages[i].parentNode === divBox){
                document.body.removeChild(divBox);
            }
        }
    },time);
}

export default message;
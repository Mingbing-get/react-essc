import React from 'react';
import ReactDOM from 'react-dom';
import Model from './component/index';

const model = {};
model.confirm = (config)=>{
    creatDom(null, config);
};

model.success = (config)=>{
    creatDom('model-success', config);
};

model.waring = (config)=>{
    creatDom('model-waring', config);
};

model.error = (config)=>{
    creatDom('model-error', config);
};

function creatDom(status, config) {
    let divBox = document.createElement('div');
    divBox.id = Math.random().toString().substring(2);
    config.id = divBox.id;
    config.status = status;
    ReactDOM.render(
        <Model
            config={config}
        />
        , divBox);
    document.body.appendChild(divBox);
}

export default model;

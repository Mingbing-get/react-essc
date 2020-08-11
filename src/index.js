import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import IsLogin from './page/islogin';

import './base/useRem.js';
import './base/base.css';
import './base/font-awsome/css/font-awesome.min.css';

import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import rootApp from './redux/reducer/rootApp.js';

const store = new createStore(rootApp, compose());

ReactDOM.render(
    <Provider store={store}>
        <IsLogin>
            <App />
        </IsLogin>
    </Provider>,
  document.getElementById('root')
);

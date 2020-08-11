import React from 'react';
import './index.css';

export default class SelectRadio extends React.Component {
    render(){
        return(
            <span
                className={this.props.selected?'select-radio selected':'select-radio'}
                onClick={this.props.selectClick?(e)=>{this.props.selectClick(e)}:null}
            ></span>
        );
    };
}
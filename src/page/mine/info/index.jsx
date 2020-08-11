import React from 'react';
import './index.css';

export default class Info extends React.Component {
    render(){
        return(
            <div
                className='info-box'
                onClick={this.props.infoClick?(e)=>{this.props.infoClick(e)}:null}
            >
                <img src={this.props.user.touxiang}/>
                <div className='info-right'>
                    {this.props.user.name}
                </div>
            </div>
        );
    };
}
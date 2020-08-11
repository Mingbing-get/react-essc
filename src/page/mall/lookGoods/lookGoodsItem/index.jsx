import React from 'react';
import './index.css';

export default class SelectCard extends React.Component {

    boxClick = (e)=>{
        if (this.props.boxClick)
            this.props.boxClick(e, this.props.data.id);
    };

    render(){
        return (
            <div
                className='look-item-box'
                onClick={(e)=>{this.boxClick(e)}}
            >
                <img src={this.props.data.images[0]}/>
                <div className='look-item-info'>
                    <p>{this.props.data.discription}</p>
                    <h3>{this.props.data.title}</h3>
                    <span>剩余{this.props.data.number}件</span>
                    <p>￥{this.props.data.nowprice}</p>
                </div>
            </div>
        );
    };
}
import React from 'react';
import './index.css';

export default class OrderItem extends React.Component {
    render(){
        return(
            <div className='order-item'>
                <img src={this.props.data.images[0]}/>
                <div className='order-item-info'>
                    <h3>{this.props.data.title}</h3>
                    <span>×{this.props.data.count}</span>
                    <i>￥{(this.props.data.count*this.props.data.nowprice).toFixed(2)}</i>
                </div>
            </div>
        );
    };
}
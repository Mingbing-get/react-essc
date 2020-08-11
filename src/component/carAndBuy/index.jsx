import React from 'react';
import './index.css';

export default class CarAndBuy extends React.Component {

    carClick = (e)=>{
        e.stopPropagation();
        if (this.props.carClick)
            this.props.carClick(e);
    };

    buyClick = (e)=>{
        e.stopPropagation();
        if (this.props.buyClick)
            this.props.buyClick(e);
    };

    render(){
        return(
            <div className='carAndBuy-box'>
                <div className='carAndBuy-btn-box'>
                    <button className='carAndBuy-car-btn'
                            onClick={(e)=>{this.carClick(e)}}
                            disabled={this.props.disabled}
                    >加入购物车</button>
                    <button className='carAndBuy-buy-btn'
                            onClick={(e)=>{this.buyClick(e)}}
                            disabled={this.props.disabled}
                    >立即购买</button>
                </div>
            </div>
        );
    };
}
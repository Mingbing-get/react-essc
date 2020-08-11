import React from 'react';
import './index.css';
import SelectRadio from '../selectRadio';

export default class SelectCard extends React.Component {

    selectClick = (e)=>{
        if (this.props.selectClick)
            this.props.selectClick(e, this.props.data.id);
    };

    boxClick = (e)=>{
        if (this.props.boxClick)
            this.props.boxClick(e, this.props.data.goodsid);
    };

    render(){
        return (
            <div
                className='selectcard-box'
                onClick={(e)=>{this.boxClick(e)}}
            >
                <SelectRadio
                    selected={this.props.data.cselect==='是'}
                    selectClick={(e)=>{this.selectClick(e)}}
                />
                <img src={this.props.data.images[0]}/>
                <div className='selectcard-info'>
                    <p>{this.props.data.title}</p>
                    <span>×{this.props.data.count}</span>
                    <p>￥{this.props.data.nowprice}
                        {/*<span>￥{this.props.data.price}</span>*/}
                    </p>
                </div>
            </div>
        );
    };
}
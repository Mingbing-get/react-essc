import React from 'react';
import './index.css';
import TopBar from '../../component/topBar';

import OrderBox from './orderBox';

import { connect } from 'react-redux';

class Order extends React.Component {
    constructor(){
        super();
        this.state = {
            ydata:null,
            wdata:null
        };
    };

    componentDidMount(){
        fetch('/api/selectdingdan?userzhanghu='+this.props.match.params.zhanghu)
            .then((res)=>res.json())
            .then((data)=>{
                if (data.status === 1){
                    let ydata = [];
                    let wdata = [];
                    data.data.forEach(value=>{
                        if (value.status === '已付款')
                            ydata.push(value);
                        else
                            wdata.push(value);
                    });
                    this.setState({
                        ydata,
                        wdata
                    });
                }
            })
            .catch((error)=>{});
    };

    moveToYdata = (id)=>{
        let index = this.state.wdata.findIndex(value => {
            return value.id == id
        });
        this.setState({
            ydata:[this.state.wdata[index], ...this.state.ydata],
            wdata:[...this.state.wdata.slice(0,index), ...this.state.wdata.slice(index+1)]
        });
    };

    render(){
        return (
            <div>
                <TopBar>我的订单</TopBar>
                {
                    this.state.wdata&&
                        this.state.wdata.map(value => {
                            return (
                                <OrderBox status='未付款' price={value.price} item={value} key={value.id} id={value.id}
                                          moveToYdata={(id)=>{this.moveToYdata(id)}}>

                                </OrderBox>
                            );
                        })
                }
                {
                    this.state.ydata&&
                    this.state.ydata.map(value => {
                        return (
                            <OrderBox status='已付款' price={value.price} item={value} key={value.id} id={value.id}>

                            </OrderBox>
                        );
                    })
                }
            </div>
        );
    };
}

const mapStoreToProps = (store)=>{
    return {
        user:store.loginReducer
    };
};

Order = connect(mapStoreToProps)(Order);

export default Order;